// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import { paymentMethod, getParent } from 'commons/utils/inipay';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    const payment = _.find(order.payments, { type: 0 });
    if (paymentMethod(payment) === 'CARD') {
      return (
        <form action="https://iniweb.inicis.com/app/publication/apReceipt.jsp" acceptCharset="euc-kr" target="_blank">
          <input type="hidden" name="noTid" value={payment.tid} />
          <input type="hidden" name="noMethod" value="1" />
          <input type="hidden" name="clpaymethod" value="0" />
          <input type="hidden" name="rt" value="1" />
          <input type="hidden" name="valFlg" value="1" />
          <input type="hidden" name="nmBuyer" value={payment.data.P_UNAME || payment.data.buyerName} />
          <input type="hidden" name="prGoods" value={payment.data.P_AMT || payment.data.TotPrice} />
          <button><i className="icon-print"></i> {i18n.get('pcMypage.printOrder')}</button>
        </form>
      );
    }
    if (paymentMethod(payment) === 'VBANK') {
      const parent = getParent(payment);
      return (
        <form action="https://iniweb.inicis.com/app/publication/apCashReceipt.jsp" acceptCharset="euc-kr" target="_blank">
          <input type="hidden" name="noTid" value={_.get(parent, 'tid', payment.tid)} />
          <input type="hidden" name="noMethod" value="1" />
          <input type="hidden" name="clpaymethod" value="22" />
          <input type="hidden" name="rt" value="1" />
          <input type="hidden" name="valFlg" value="1" />
          <input type="hidden" name="nmBuyer" value={_.get(parent, 'data.buyerName', payment.data.P_UNAME)} />
          <input type="hidden" name="prGoods" value={_.get(parent, 'data.TotPrice', payment.data.P_AMT)} />
          <button><i className="icon-print"></i> {i18n.get('pcMypage.printOrder')}</button>
        </form>
      );
    }
    return null;
  },
});
