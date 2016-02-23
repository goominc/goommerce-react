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
    category: PropTypes.object,
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
    props.searchProducts(props.query).then(res => this.setState(res));
  },
  breadCrumbPath() {
    const { categories } = this.props;
    const path = [{ link: '/', name: { en: 'Home', ko: '홈' } }];
    function pushPath(category) {
      if (!category) return;
      if (category.parentId) {
        pushPath(categories[category.parentId]);
      }
      path.push({ link: `/categories/${category.id}`, name: category.name });
    }
    pushPath(this.props.category);
    return path;
  },
  aggregateChildren() {
    const { categories: aggs = {} } = this.state;
    const { children = [] } = this.props.category || {};
    return children.map((child) => ({
      name: child.name,
      count: (aggs[child.id] || {}).doc_count,
    }));
  },
  render() {
    const { products = [] } = this.state;
    const path = this.breadCrumbPath();
    const children = this.aggregateChildren();

    return (
      <div className="container-table">
        <ProductListLeft path={path.slice(1)} children={children} />
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
  (state, ownProps) => {
    const { categoryId = 'tree' } = ownProps.query;
    return {
      categories: state.categories,
      category: state.categories[categoryId],
    };
  },
  { searchProducts }
)(ProductList);
