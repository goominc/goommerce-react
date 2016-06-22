import React, { PropTypes } from 'react';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    return (
      <div className="myorder-box">
        <div className="box-header">
          주문정보
        </div>
        <div className="box-detail">
          <p className="order-info-black">{i18n.get('pcMypage.orderDate')} : {order.createdAt.substr(0, 10).replace(/-/g, '.')}</p>
          <p className="order-info-black">{i18n.get('pcMypage.orderNumber')} : {order.id}</p>
          <p className="order-info-red">{i18n.get(`enum.order.status.${order.status}`)}</p>
        </div>
      </div>
    );
  },
});