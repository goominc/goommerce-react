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
      <div className="container-table">
        <ProductListLeft />
        <div className="product-list-right-box">
          <BreadCrumb path={path} />
          <div className="product-list-search-box"></div>
          <ProductListItems />
        </div>
      </div>
    );
  },
});
