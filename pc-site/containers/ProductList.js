import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { get, isEqual, pick, range } from 'lodash';

import Breadcrumb from '../components/Breadcrumb';
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
    genLink: PropTypes.func.isRequired,
    category: PropTypes.object,
    categories: PropTypes.object.isRequired,
    searchProducts: PropTypes.func.isRequired,
  },
  getDefaultProps() {
    return { pageNum: '0' };
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
    const { query, categoryId, brandId, pageNum } = props;
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
  pagination() {
    const { pagination } = this.state;
    const { genLink } = this.props;
    if (genLink && pagination) {
      const beforeCnt = 2;
      const totalCnt = 7;
      const { pageNum } = this.props;
      const pageCnt = Math.ceil(pagination.total / pagination.size);
      const start = Math.max(0, Math.min(pageNum - beforeCnt, pageCnt - totalCnt));
      const end = Math.min(pageCnt, start + totalCnt);
      const renderButton = (i) => {
        if (i === Number(pageNum)) {
          return (
            <div key={i} className="page-button active">{i + 1}</div>
          );
        }
        return (
          <Link to={genLink({ ...this.props, pageNum: i })} key={i}>
            <div className="page-button">{i + 1}</div>
          </Link>
        );
      };
      return (
        <div className="page-button-line">
          {range(start, end).map(renderButton)}
        </div>
      );
    }
  },
  render() {
    const { products = [], aggs = {} } = this.state;
    const path = this.breadCrumbPath();

    return (
      <div className="container-table">
        <ProductListLeft {...this.props} aggs={aggs}/>
        <div className="product-list-right-box">
          <Breadcrumb path={path} />
          <div className="product-list-search-box"></div>
          <ProductListItems products={products} />
          {this.pagination()}
        </div>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    categories: state.categories,
    category: state.categories[ownProps.categoryId || 'tree'],
  }),
  { searchProducts }
)(ProductList);
