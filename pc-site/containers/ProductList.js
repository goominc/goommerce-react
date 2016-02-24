import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { get, isEqual, pick } from 'lodash';

import BreadCrumb from '../components/BreadCrumb';
import ProductListLeft from '../components/ProductListLeft';
import ProductListItems from '../components/ProductListItems';

import { ApiAction } from '../redux/actions';
const { searchProducts } = ApiAction;

const ProductList = React.createClass({
  propTypes: {
    query: PropTypes.string,
    categoryId: PropTypes.string,
    brandId: PropTypes.string,
    pageNum: PropTypes.string,
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
    const props = ['query', 'categoryId', 'barndId', 'pageNum'];
    if (!isEqual(pick(this.props, props), pick(nextProps, props))) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    const { query, categoryId, brandId, pageNum = 0 } = props;
    const size = 30;
    props.searchProducts({
      q: query,
      categoryId,
      brandId,
      from: pageNum * size,
      size,
    }).then(res => this.setState(res));
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
    const categoryId = get(ownProps.query, 'categoryId', 'tree');
    return {
      categories: state.categories,
      category: state.categories[categoryId],
    };
  },
  { searchProducts }
)(ProductList);
