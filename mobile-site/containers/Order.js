import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
    this.props.setHeader(false, false, false, 'Place Order');
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
  (state, ownProps) => ({
    order: state.entities.orders[ownProps.params.orderId],
    addresses: state.entities.addresses,
    activeAddressId: state.auth.addressId,
  }),
  { loadOrder, loadAddresses, inipay, setHeader }
)(Order);
