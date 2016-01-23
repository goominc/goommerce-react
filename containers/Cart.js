import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadCart } from '../redux/actions';

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    loadCart: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadCart();
  },
  renderVariant(variant) {
    return (
      <li key={variant.sku}>
        {variant.sku}, {variant.count}
      </li>
    );
  },
  render() {
    const { cart } = this.props;
    const variants = cart.productVariants || [];
    return (
      <div className="row">
        <ul>
          {variants.map(this.renderVariant)}
        </ul>
      </div>
    );
  },
});

export default connect(
  (state) => ({ cart: state.cart }),
  { loadCart }
)(Cart);
