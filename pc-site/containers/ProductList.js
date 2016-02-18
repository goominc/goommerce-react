import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loadEntities from '../../commons/redux/util/loadEntities';

import BreadCrumb from '../components/BreadCrumb';
import ProductListLeft from '../components/ProductListLeft';
import ProductListItems from '../components/ProductListItems';

import { ApiAction } from '../redux/actions';
const { loadProducts } = ApiAction;

const ProductList = React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
  },
  componentDidMount() {
    this.props.loadProducts();
  },
  render() {
    const { products } = this.props;
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
          <ProductListItems products={products} />
        </div>
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'products', 'products'),
  { loadProducts }
)(ProductList);
