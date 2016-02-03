import React, { PropTypes } from 'react';

import { getProductThumbnail } from '../util';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object.isRequired,
    canChangeQuantity: PropTypes.boolean,
    updateCount: PropTypes.func,
    removeProduct: PropTypes.func,
    buy: PropTypes.func,
  },
  renderVariant(variant) {
    const { updateCount, removeProduct, buy, canChangeQuantity } = this.props;
    console.log(canChangeQuantity);
    function handleQuantity(event) {
      return updateCount(variant, event.target.value);
    }
    function handleRemove() {
      removeProduct(variant);
    }
    function handleBuy() {
      buy(variant);
    }
    function renderBuyButton() {
      const buttonCells = [];
      if (removeProduct) {
        buttonCells.push(<td><button onClick={handleRemove}>Remove</button></td>);
      }
      if (buy) {
        buttonCells.push(<td><button onClick={handleBuy}>Buy</button></td>);
      }
      return buttonCells;
    }
    const renderQuantity = () => {
      if (canChangeQuantity) {
        return (<input type="number" name="quantity" min="1" max="100" onChange={handleQuantity} defaultValue={variant.count}/>);
      } else {
        return (<span>{variant.count}</span>);
      }
    };
    return (
      <tr key={variant.id}>
        <td><img src={getProductThumbnail(variant)} />
          <span className="product-description">{variant.sku}</span></td>
        <td>{renderQuantity(variant)}</td>
        <td>KRW {variant.price.KRW}</td>
        {renderBuyButton()}
      </tr>
    );
  },
  render() {
    const { cart, removeProduct, buy, children } = this.props;
    if (!cart) {
      return (
        <div>Error! No Cart</div>
      );
    }
    const variants = cart.productVariants || [];
    function renderHead() {
      const renderBuyCell = () => {
        const buttonCells = [];
        if (removeProduct) {
          buttonCells.push(<td width="10%"></td>);
        }
        if (buy) {
          buttonCells.push(<td width="10%"></td>);
        }
        return buttonCells;
      };
      return (
        <tr>
          <td width="50%">Product Detail</td>
          <td width="15%">Quantity</td>
          <td width="15%">Price</td>
          {renderBuyCell()}
        </tr>
      );
    }
    return (
      <div className="cart-seller-box">
        <div className="cart-seller-title">Seller: Test</div>
        <table>
          <thead>
          {renderHead()}
          </thead>
          <tbody>
          {variants.map(this.renderVariant)}
          </tbody>
        </table>
        {children}
      </div>
    );
  },
});
