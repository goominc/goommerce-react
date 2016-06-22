import React, { PropTypes } from 'react';

import OrderProductList from './order/OrderProductList';
import OrderPaymentInfo from './order/OrderPaymentInfo';
import OrderStateInfo from './order/OrderStateInfo';
import OrderShippingInfo from './order/OrderShippingInfo';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.string,
  },
  render() {
    const { order } = this.props;
    const { activeCurrency, activeLocale, currencySign } = this.context;
    return (
      <section id="myorder-detail-container">
        <OrderStateInfo
          order = {order}
        />
        <OrderPaymentInfo
          order = {order}
          activeCurrency = {activeCurrency}
          currencySign = {currencySign}
        />
        <OrderProductList
          activeCurrency = {activeCurrency}
          activeLocale = {activeLocale}
          order = {order}
          currencySign = {currencySign}
        />
        <OrderShippingInfo
          order = {order}
        />
      </section>
    );
  },
});
