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
    function handleRemove() {
      removeProduct(variant);
    }
    function handleBuy() {
      buy(variant);
    }
    return (
      <tr key={variant.id}>
        <td><img class="product-pic-image" src="http://www.linkshops.com/media/catalog/product/cache/1/thumbnail/120x180/9df78eab33525d08d6e5fb8d27136e95/3/f/3f8a6201-copy.jpg" />
          <span className="product-description">{variant.sku}</span></td>
        <td><input type="number" name="quantity" min="1" max="100" onChange={handleQuantity} defaultValue={variant.count}/></td>
        <td>KRW {variant.price.KRW}</td>
        <td><button onClick={handleRemove}>Remove</button></td>
        <td><button onClick={handleBuy}>Buy</button></td>
      </tr>
    );
  },
  render() {
    const { cart, buy } = this.props;
    if (!cart) {
      return (
        <div>Error! No Cart</div>
      );
    }
    const variants = cart.productVariants || [];
    function renderBuyAllButton() {
      if (variants.length >  0) {
        return (
          <button onClick={buyAll}>Buy All</button>
        );
      }
    }
    function buyAll() {
      buy(variants);
    }
    return (
      <div className="container">
        <div className="cart-title-box">
          Your Cart
        </div>
        <div className="cart-top-box">
          <a><span className="cart-continue-shopping-arrow"></span><span className="cart-continue-shopping-text">Continue Shopping</span></a>
        </div>
        <div className="cart-seller-box">
          <div className="cart-seller-title">Seller: Test</div>
          <table>
            <thead>
            <tr>
              <td width="50%">Product Detail</td>
              <td width="15%">Quantity</td>
              <td width="15%">Price</td>
              <td width="10%"></td>
              <td width="10%"></td>
            </tr>
            </thead>
            <tbody>
            {variants.map(this.renderVariant)}
            </tbody>
          </table>
        </div>
        {renderBuyAllButton()}
      </div>
    );
  },
});
