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
    return (
      <tr key="{variant.id}">
        <td>c</td>
        <td><img class="product-pic-image" width="80" height="80" src="http://g02.a.alicdn.com/kf/HTB1VaA0IVXXXXXaXFXXq6xXFXXX5/2015-New-Autumn-Fashion-Brand-Men-Clothes-Slim-Fit-Men-Long-Sleeve-Shirt-Men-Plaid-Cotton.jpg_80x80.jpg" />여기 디테디테디테디테</td>
        <td><input type="number" name="quantity" min="1" max="100" onChange={handleQuantity} defaultValue={variant.count}/></td>
        <td>KRW {variant.price.KRW}</td>
        <td><button onClick={handleRemove}>Remove</button></td>
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
              <td width="10%"></td>
              <td width="50%">Product Detail</td>
              <td width="15%">Quantity</td>
              <td width="15%">Price</td>
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
