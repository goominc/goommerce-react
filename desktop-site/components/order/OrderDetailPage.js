// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import OrderProduct from 'components/order/OrderProduct';
import orderUtil from 'commons/utils/orderUtil';
import numberUtil from 'commons/utils/numberUtil';
import i18n from 'commons/utils/i18n';
import { paymentMethod, getParent } from 'commons/utils/inipay';

import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';
import VBankInfo from './VBankInfo';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    // const { activeCurrency, currencySign } = this.context;
    if (!order) {
      return null;
    }
    const brands = orderUtil.collectByBrands(order.orderProducts);
    const renderField = (field) => (
      <div key={field.label} className="row">
        <div className="label">{field.label}</div>
        <div className={`control ${field.className || ''}`}>{field.value || '&'}</div>
      </div>
    );
    const orderFields = [
      { label: i18n.get('pcMypage.orderDetail'), value: numberUtil.formatDateKor(order.createdAt) },
      { label: i18n.get('pcMypage.orderNumber'), value: order.id },
    ];
    const renderReceipt = () => {
      const payment = _.find(order.payments, { type: 0 });
      if (paymentMethod(payment) === 'CARD') {
        return (
          <form action="https://iniweb.inicis.com/app/publication/apReceipt.jsp" accept-charset="euc-kr" target="_blank">
            <input type="hidden" name="noTid" value={payment.tid} />
            <input type="hidden" name="noMethod" value="1" />
            <input type="hidden" name="clpaymethod" value="0" />
            <input type="hidden" name="rt" value="1" />
            <input type="hidden" name="valFlg" value="1" />
            <input type="hidden" name="nmBuyer" value={payment.data.P_UNAME || payment.data.buyerName} />
            <input type="hidden" name="prGoods" value={payment.data.P_AMT || payment.data.TotPrice} />
            <button>영수증</button>
          </form>
        );
      }
      if (paymentMethod(payment) === 'VBANK') {
        const parent = getParent(payment);
        return (
          <form action="https://iniweb.inicis.com/app/publication/apCashReceipt.jsp" accept-charset="euc-kr" target="_blank">
            <input type="hidden" name="noTid" value={_.get(parent, 'tid', payment.tid)} />
            <input type="hidden" name="noMethod" value="1" />
            <input type="hidden" name="clpaymethod" value="22" />
            <input type="hidden" name="rt" value="1" />
            <input type="hidden" name="valFlg" value="1" />
            <input type="hidden" name="nmBuyer" value={_.get(parent, 'data.buyerName', payment.data.P_UNAME)} />
            <input type="hidden" name="prGoods" value={_.get(parent, 'data.TotPrice', payment.data.P_AMT)} />
            <button>영수증</button>
          </form>
        );
      }
    };
    return (
      <div className="order-done-container">
        <div className="title">{i18n.get('pcMypage.orderDetails')}</div>
        <div className="simple-key-value-container">
          {orderFields.map(renderField)}
        </div>
        {order.paymentStatus === 200 && <div className="title">입금 정보</div>}
        <VBankInfo order={order} />
        <div className="title">{i18n.get('pcMypage.myOrders')}</div>
        <OrderProduct brands={brands} {...this.props} />
        <div style={({ height: '30px' })}></div>
        <div className="title">{i18n.get('pcMypage.payment')}</div>
        <PaymentInfo order={order} />
        <div className="title">{i18n.get('pcMypage.shipTo')}</div>
        <AddressInfo order={order} />
        <Link to="/mypage/my_orders"><div className="go-order-list-button">{i18n.get('pcMypage.orderList')}</div></Link>
        {/* renderReceipt() */}
      </div>
    );
  },
});
