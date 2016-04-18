import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadMyOrders } = ApiAction;

import MyOrderPage from 'components/MyOrderPage';

const MyOrder = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadMyOrders: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const { auth } = this.props;
    if (auth.bearer) {
      this.props.loadMyOrders()
      .then((res) => this.setState(res));
    } else {
      this.context.router.push('/');
    }
    this.props.setHeader(false, true, true, 'My Orders');
  },
  render() {
    const { orders } = this.state;
    if (!orders || !orders.length) {
      return (
        <div />
        );
    }
    return (
      <MyOrderPage orders={orders} />
      );
  },
});

export default connect(
  (state) => ({ auth: state.auth }),
  { setHeader, loadMyOrders }
)(MyOrder);
