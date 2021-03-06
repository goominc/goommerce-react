import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadCategories } = ApiAction;
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

import { incrementalFetch } from 'utils/scrollUtil';

import CategoryList from 'components/CategoryList';

const fetchSize = 10;

const Category = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    categories: PropTypes.object,
    loadCategories: PropTypes.func.isRequired,
    searchProducts: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    params: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  getInitialState() {
    return { currentCount: 0, maxCount: 0 };
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: true,
      showSearch: true,
      showCart: true,
    });
    this.props.loadCategories();
    this.doSearch(this.props);

    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillReceiveProps(nextProps) {
    const { params } = nextProps;

    // FIXME cause unexpected behavior
    /* if ((params && params.categoryId && categories[params.categoryId])
    || (this.props.activeLocale !== activeLocale)) {
      this.props.setHeader(false, true, true, categories[params.categoryId].name[activeLocale]);
    } else {
      this.props.setHeader(true, true, true, '');
    }*/
    if (this.props.params.categoryId !== params.categoryId) {
      this.doSearch(nextProps);
    }
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll() {
    incrementalFetch(this.doFetch);
  },
  doSearch(props) {
    const { params } = props;
    this.props.searchProducts({
      // q: params.query ? params.query : undefined,
      categoryId: params.categoryId,
      offset: 0,
      limit: fetchSize,
      sorts: '-id',
    }).then((res) => {
      this.setState({ products: res.products, currentCount: res.products.length, maxCount: res.pagination.total });
    });
  },
  doFetch() {
    const { params } = this.props;
    const { currentCount, maxCount } = this.state;
    if (currentCount === maxCount) {
      return;
    }
    const loadingDisplay = $('.recommend-wrap .loading').css('display');
    if (loadingDisplay === 'block') {
      // 2016. 06. 20. [heekyu] do not fetch when already loading
      return;
    }
    $('.recommend-wrap .loading').show();
    this.props.searchProducts({
      // q: params.query ? params.query : undefined,
      categoryId: params.categoryId,
      offset: currentCount,
      limit: fetchSize,
      sorts: '-id',
    }).then((res) => {
      const mergeProducts = this.state.products.concat(res.products);
      this.setState({ products: mergeProducts, currentCount: mergeProducts.length });
      $('.recommend-wrap .loading').hide();
    });
  },
  render() {
    const { auth, params, categories } = this.props;
    let currentCategory;
    if (params && params.categoryId && categories[params.categoryId]) {
      currentCategory = categories[params.categoryId];
    } else {
      currentCategory = categories.tree;
    }
    currentCategory = currentCategory || {};
    return (
      <CategoryList auth={auth} categories={categories} currentCategory={currentCategory} products={this.state.products} />
    );
  },
});

export default connect(
  (state) => ({ categories: state.categories,
    activeLocale: state.i18n.activeLocale,
    auth: state.auth,
    searchProducts: (query) => ajaxReturnPromise(state.auth, 'get', `/api/v1/products/search?${$.param(query)}`) }),
  { loadCategories, setHeader }
)(Category);
