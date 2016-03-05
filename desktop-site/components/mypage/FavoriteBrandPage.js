// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

const _ = require('lodash');

export default React.createClass({
  propTypes: {
    brands: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  render() {
    const { brands } = this.props;
    const { activeLocale } = this.context;
    if (!brands) {
      return (<div></div>);
    }
    const renderBrand = (brand) => (
      <div key={brand.id} className="favorite-brand-box">
        <div className="brand-info">
          <span className="title">{_.get(brand, `data.name.${activeLocale}`)}</span>
          <span className="main-products">
            Main products: <br />
            Apparel & Accessories
          </span>
          <a href="/" target="_blank"><button>Visit Store</button></a>
        </div>
        <div className="brand-products">
          <div className="product-item">
            <div className="img-wrap">
              <img
                src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a2769-copy_1.jpg"
              />
            </div>
          </div>
          <div className="product-item">
            <div className="img-wrap">
              <img
                src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a2769-copy_1.jpg"
              />
            </div>
            <span className="price-number">US $17.99</span>
            <span className="price-unit"> / piece</span>
          </div>
        </div>
      </div>
    );
    return (
      <div className="mypage-right-box">
        <h2>All My Favorite Brands</h2>
        <div className="favorite-brand-search-box">
          <input type="text" placeholder="search brands" />
        </div>
        {brands.map((brand) => renderBrand(brand))}
      </div>
    );
  },
});
