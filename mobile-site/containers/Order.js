import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';

import OrderPage from 'components/OrderPage';

import { ApiAction, setHeader } from 'redux/actions';
const { loadOrder, loadAddresses, inipay } = ApiAction;

const Order = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    setHeader: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    inipay: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: false,
      showSearch: false,
      showCart: false,
      titleI18NKey: 'pcPayment.placeOrder',
    });
    const { orderId } = this.props.params;
    this.props.loadOrder(orderId);
    this.props.loadAddresses();
  },
  render() {
    return (
      <OrderPage {...this.props} />
    );
  },
});

export default connect(
  (state, ownProps) => {
    const order = state.entities.orders[ownProps.params.orderId];
    return {
      order,
      addresses: state.entities.addresses,
      activeAddressId: order ? _.get(order, 'address.id') || 0 : 0,
      auth: state.auth,
    };
  },
  { loadOrder, loadAddresses, inipay, setHeader }
)(Order);
