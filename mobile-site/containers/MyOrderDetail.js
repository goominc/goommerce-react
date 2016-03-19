import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadOrder } = ApiAction;

import MyOrderDetailPage from 'components/MyOrderDetailPage';

const MyOrderDetail = React.createClass({
  propTypes: {
    params: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const { params } = this.props;
    if (params.orderId) {
      this.props.loadOrder(params.orderId)
      .then((res) => this.setState(res));
    } else {
      this.context.router.push('/');
    }
    this.props.setHeader(false, true, true, 'Order Detail');
  },
  render() {
    return (
      <MyOrderDetailPage order={this.state.order} />
      );
  },
});

export default connect(
  (state) => ({ auth: state.auth }),
  { setHeader, loadOrder }
)(MyOrderDetail);
