import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../redux/actions';
import loadEntities from '../redux/util/loadEntities';

import ProductListItems from '../components/ProductListItems';
import ProductThumbnail from '../components/ProductThumbnail';

const Home = React.createClass({
  propTypes: {
    products: PropTypes.array,
    loadProducts: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProducts();
  },
  render() {
    const { products = [] } = this.props;
    return (
      <div className="container">
        <div className="main-banner-wrap">
          <div className="category-dropdown-box">
            <div className="category-title">
              Categories
            </div>
            <div className="category-dropdown-item">
              Shirts
            </div>
            <div className="category-dropdown-item">
              Shoes
            </div>
            <div className="category-dropdown-item">
              Women's
            </div>
            <div className="category-dropdown-item">
              Men's
            </div>
          </div>
          <div className="main-banner">
            <img src="http://img.alicdn.com/tps/i3/TB1Gh.zLpXXXXXMXVXXVpvE2pXX-750-400.jpg"/>
          </div>
          <div className="right-banner">
            <img src="http://img.alicdn.com/tps/i1/TB1o1laLFXXXXb7aXXXJTjSZVXX-320-400.jpg"/>
          </div>
        </div>
        <ProductListItems products={products} />
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'products', 'products'),
  { loadProducts }
)(Home);
