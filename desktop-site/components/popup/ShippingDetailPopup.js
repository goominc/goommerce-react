// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';
import { formatDate } from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func,
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    if (!order || !order.shipments || !order.shipments.length) {
      return null;
    }
    const { closePopup } = this.props;
    const shipments = order.shipments;
    let isShowKg = false;
    for (let i = 0; i < shipments.length; i++) {
      const shipment = shipments[i];
      if (shipment.weight) {
        isShowKg = true;
        break;
      }
    }
    const columnCount = isShowKg ? 4 : 3;
    const style = { width: `${(100 / columnCount).toString()}%` };
    const shipmentProviderText = (provider) => {
      if (provider === 0) return 'CJ';
      if (provider === 104) return '영통';
      if (provider === 105) return '판다';
      return provider;
    };
    return (
      <div>
        <div className="popup-overlay" onClick={closePopup}></div>
        <div className="shipping-detail-popup">
          <div className="popup-title">
            {i18n.get('pcOrder.shippingTitle')}
            <div className="popup-close-button" onClick={closePopup}></div>
          </div>
          <div className="popup-content">
            <table>
              <thead>
              <tr>
                <th sylte={style}>{i18n.get('word.date')}</th>
                <th sylte={style}>{i18n.get('pcOrder.shippingCompanyColumn')}</th>
                <th sylte={style}>{i18n.get('pcOrder.shippingInvoiceNumber')}</th>
                {isShowKg &&
                  <th sylte={style}>{i18n.get('pcOrder.shippingWeightColumn')}</th>
                }
              </tr>
              </thead>
              <tbody>
              {shipments.map((shipment) =>
              <tr key={shipment.id}>
                <td sylte={style}>{formatDate(new Date(shipment.startDate), true)}</td>
                <td sylte={style}>{shipmentProviderText(shipment.provider)}</td>
                <td sylte={style}>{shipment.trackingNumber}</td>
                {isShowKg &&
                  <td style={style}>{shipment.weight}</td>
                }
              </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
});
