import React from 'react';

import ProductListItem from '../components/ProductListItem';

const ProductList = React.createClass({
  // TODO : manage states(view-type, sort, filter, etc)

  render() {
    const viewType = 'custom-list-view';
    return (

      <section className="list-main">
        <header className="user-operation">
          <div className="clearfix">
            <span className="sort-by expand-arrow">Sort by</span>
            <span className="refine-filter">Filter</span>
            <span className="line_between"></span>
            <span className="view-switching gallery-view" data-type="gallery"></span>
          </div>
        </header>
        <ProductListItem viewType={viewType}/>
        
      </section>

      );
  },
});

export default ProductList;
