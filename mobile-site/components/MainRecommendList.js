import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductMainImage, getProductMainPrice } from '../../desktop-site/util';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
  },

  render() {
    const { products } = this.props;

    const prodDiv = products.map((product) => {
      return (
          <li key={product.id}>
            <Link to={'/products/' + product.id}>
              <div className="product-image">
                <img src={getProductMainImage(product).url} />
              </div>
              <div className="product-cost"><strong>{product.USD} USD</strong> / piece</div>
              <div className="product-cost">1000 Orders</div>
            </Link>
          </li>
        );
    });

    return (
      <section id="today-deals" className="promotion-block today-deals">
        <header>
          <Link to="/categories/1">Quality Picks</Link>
        </header>
        <article>
          <ul className="clearfix product-container">
            {prodDiv}
          </ul>
        </article>
        <Link to="/categories/1" id="today-deals-view-more-lnk" className="ui-button ui-button-third">View more&nbsp;</Link>
      </section>
    );
  },
});
