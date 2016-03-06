import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductThumbnail } from 'util';

export default React.createClass({
  propTypes: {
    buy: PropTypes.func,
    canChangeQuantity: PropTypes.bool,
    children: PropTypes.object,
    productVariants: PropTypes.array.isRequired,
    removeProduct: PropTypes.func,
    updateCount: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  renderVariant(variant) {
    const { buy, canChangeQuantity, updateCount, removeProduct } = this.props;
    const { activeCurrency } = this.context;
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
        buttonCells.push(<td key="removeProduct"><button onClick={handleRemove}>Remove</button></td>);
      }
      if (buy) {
        buttonCells.push(<td key="buyProduct"><button onClick={handleBuy}>Buy</button></td>);
      }
      return buttonCells;
    }
    const renderQuantity = () => {
      if (canChangeQuantity) {
        return (
          <input type="number" name="quantity" min="1" max="100" onChange={handleQuantity}
            defaultValue={variant.count}
          />
        );
      }
      return (<span>{variant.count}</span>);
    };
    return (
      <tr key={`cart-variant-${variant.id}`}>
        <td><Link to={`/products/${variant.productId}`}>
          <img src={getProductThumbnail(variant)} />
          <span className="product-description">{variant.sku}</span>
        </Link></td>
        <td>{renderQuantity(variant)}</td>
        <td>{activeCurrency} {variant[activeCurrency]}</td>
        {renderBuyButton()}
      </tr>
    );
  },
  render() {
    const { productVariants, removeProduct, buy, children } = this.props;
    if (!productVariants) {
      return (
        <div>Error! No Products!</div>
      );
    }
    const variants = productVariants || [];
    function renderHead() {
      const renderBuyCell = () => {
        const buttonCells = [];
        if (removeProduct) {
          buttonCells.push(<td key="removeProduct" width="10%"></td>);
        }
        if (buy) {
          buttonCells.push(<td key="buyProduct" width="10%"></td>);
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
