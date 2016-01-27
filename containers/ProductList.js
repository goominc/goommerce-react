import React from 'react';

import BreadCrumb from '../components/BreadCrumb';
import ProductListLeft from '../components/ProductListLeft';
import ProductListItems from '../components/ProductListItems';

export default React.createClass({
  render() {
    const path = [
      {link:'/', name: 'home'},
      {link:'/cart', name: 'cart'},
    ];
    return (
      <div>
        <ProductListLeft />
        <div className="product-list-right-box">
          <BreadCrumb parents={path} />
          <div className="product-list-search-box"></div>
          <ProductListItems />
        </div>
      </div>
    );
  },
});
