import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import BreadCrumb from '../components/BreadCrumb';
import ProductListLeft from '../components/ProductListLeft';
import ProductListItems from '../components/ProductListItems';

import { ApiAction } from '../redux/actions';
const { searchProducts } = ApiAction;

const ProductList = React.createClass({
  propTypes: {
    query: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    searchProducts: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.doSearch(this.props);
  },
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.query, nextProps.query)) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    props.searchProducts(props.query).then(res => this.setState({
      products: res.products,
    }));
  },
  breadCrumbPath() {
    const { query, categories } = this.props;
    const path = [{ link: '/', name: { en: 'Home', ko: '홈' } }];
    function pushPath(categoryId) {
      const category = categories[categoryId || 1];
      if (!category) return;
      if (category.parentId) pushPath(category.parentId);
      path.push({ link: `/categories/${category.id}`, name: category.name });
    }
    pushPath(query.categoryId);
    return path;
  },
  render() {
    const { products = [] } = this.state;
    const path = this.breadCrumbPath();
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
  (state) => ({ categories: state.categories }),
  { searchProducts }
)(ProductList);
