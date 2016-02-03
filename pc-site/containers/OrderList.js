import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import loadEntities from '../../commons/redux/util/loadEntities';

import { ApiAction } from '../redux/actions';
const { loadMyOrders } = ApiAction;

const OrderList = React.createClass({
  propTypes: {
    orders: PropTypes.array,
    loadMyOrders: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadMyOrders();
  },
  render() {
    function formatDate(date) {
      return new Date(date).toString();
    }
    const { orders = [] } = this.props;
    return (
      <div>
        <ul>
          {orders.map(order => <Link to={`/orders/${order.id}`} key={order.id}><li>{order.id}, KWR{order.total.KRW}, {formatDate(order.createdAt)}</li></Link>)}
        </ul>
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'myOrders', 'orders'),
  { loadMyOrders }
)(OrderList);
