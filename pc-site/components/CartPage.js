import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object,
    updateCount: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    buy: PropTypes.func.isRequired,
  },
  renderVariant(variant) {
    const { updateCount, removeProduct, buy } = this.props;
    function handleQuantity(event) {
      return updateCount(variant, event.target.value);
    }
    return (
      <li key={variant.sku}>
        {variant.sku},
        KRW {variant.price.KRW}
        <input type="number" name="quantity" min="1" max="100" onChange={handleQuantity} defaultValue={variant.count}/>
        <button onClick={removeProduct}>Remove</button>
        <button onClick={buy}>Buy this item</button>
      </li>
    );
  },
  render() {
    const { cart, checkout } = this.props;
    if (!cart) {
      return (
        <div>Error! No Cart</div>
      );
    }
    const variants = cart.productVariants || [];
    return (
      <div className="container">
        <div className="cart-title-box">
          Your Cart
        </div>
        <div className="cart-top-box">
          <a><span className="cart-continue-shopping-arrow"></span><span className="cart-continue-shopping-text">Continue Shopping</span></a>
        </div>
        <div className="cart-seller-box">
          Seller:
        </div>
        <ul>
          {variants.map(this.renderVariant)}
        </ul>
        <button onClick={checkout}>Buy All</button>
      </div>
    );
  },
});
