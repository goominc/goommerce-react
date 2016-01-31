import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    // TODO
  },
  render() {
    return (
      <div className="product-list-left-box">
        <div className="product-list-category-title">
          Related Categories
        </div>
        <div className="product-list-category-depth1">
          <a href="/"> <span className="category-arrow">&lt;</span>Sports &amp; Entertainment</a>
        </div>
        <div className="product-list-category-depth2">
          <div className="product-list-category-depth1">
            <a href="/"> <span className="category-arrow">&lt;</span>Sneakers</a>
          </div>
          <div className="product-list-category-depth2">
            <dt className="product-list-category-bottom">
              <span className="product-list-category-bottom-text">Running Shoes</span>
            </dt>
          </div>
        </div>
      </div>
    );
  },
});
