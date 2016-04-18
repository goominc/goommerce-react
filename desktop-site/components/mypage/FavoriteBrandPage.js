// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
import brandUtil from 'commons/utils/brandUtil';
import i18n from 'commons/utils/i18n';

const _ = require('lodash');

export default React.createClass({
  propTypes: {
    brands: PropTypes.array,
    brandProducts: PropTypes.array,
    deleteFavoriteBrand: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { brands, brandProducts, deleteFavoriteBrand } = this.props;
    const { activeCurrency } = this.context;
    if (!brands) {
      return (<div></div>);
    }
    const renderBrand = (brand, index) => {
      let products = [];
      if (brandProducts.length > index) {
        products = brandProducts[index];
      }
      const renderProduct = (product) => (
        <Link key={product.id} to={`/products/${product.id}`} className="product-item">
          <ResponsiveImage image={_.get(product, 'appImages.default[0]')} />
          <span>{product.id}</span> <br />
          <span className="price-number">{`${activeCurrency} ${product[activeCurrency]}`}</span>
          <span className="price-unit"> / piece</span>
        </Link>
      );
      return (
        <div key={brand.id} className="favorite-brand-box">
          <div className="brand-info">
            <span className="title">{brandUtil.getName(brand)}</span>
          <span className="main-products">
            Main products: <br />
            Apparel & Accessories
          </span>
            <a href="/" target="_blank"><button>Visit Store</button></a>
          </div>
          <div className="brand-products">
            {products.map((product) => renderProduct(product))}
          </div>
          <a onClick={() => deleteFavoriteBrand(brand.id) } className="brand-delete-icon"></a>
        </div>
      );
    };
    return (
      <div className="mypage-right-box">
        <h2>{i18n.get('word.favoriteBrand')}</h2>
        {brands.map((brand, index) => renderBrand(brand, index))}
      </div>
    );
  },
});
