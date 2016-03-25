import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductMainImage, getProductMainPrice } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { products } = this.props;
    const { activeCurrency } = this.context;

    const prodDiv = products.map((product) => {
      const img = getProductMainImage(product);
      if (img) {
        return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="product-image">
                  <img src={getProductMainImage(product).url} />
                </div>
                <div className="product-cost">
                  <strong>{getProductMainPrice(product, activeCurrency)} {activeCurrency}</strong>
                  &nbsp;/ piece
                </div>
                { /* <div className="product-cost">1000 Orders</div> */ }
              </Link>
            </li>
          );
      }
      return (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="product-image">
                <img />
              </div>
              <div className="product-cost">
                <strong>{getProductMainPrice(product, activeCurrency)} {activeCurrency}</strong>
                &nbsp;/ piece
              </div>
              { /* <div className="product-cost">1000 Orders</div> */ }
            </Link>
          </li>
        );
    });

    return (
      <section id="today-deals" className="promotion-block today-deals">
        <header>
          <Link to="/categories/all">Quality Picks</Link>
        </header>
        <article>
          <ul className="clearfix product-container">
            {prodDiv}
          </ul>
        </article>
        <Link to="/categories/all" className="ui-button ui-button-third">View more&nbsp;</Link>
      </section>
    );
  },
});
