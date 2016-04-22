import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import loadEntities from 'commons/redux/util/loadEntities';
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';
import Breadcrumb from 'components/Breadcrumb';
import ProductListLeft from 'components/product/ProductListLeft';
import ProductListItems from 'components/product/ProductListItems';
import ProductListSearchBar from 'components/product/ProductListSearchBar';
import PageButton from 'components/PageButton';

import { getProductMainImage } from 'commons/utils/productUtil';
import i18n from 'commons/utils/i18n';

const _ = require('lodash');

const ProductList = React.createClass({
  propTypes: {
    query: PropTypes.string,
    categoryId: PropTypes.string,
    brandId: PropTypes.string,
    pageNum: PropTypes.string,
    genLink: PropTypes.func.isRequired,
    category: PropTypes.object,
    categories: PropTypes.object.isRequired,
    KRW: PropTypes.string,
    searchProducts: PropTypes.func,
    sorts: PropTypes.string,
    wishes: PropTypes.array,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  getDefaultProps() {
    return { pageNum: '1' };
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.doSearch(this.props);
    this.context.ApiAction.loadWishlist();
  },
  componentWillReceiveProps(nextProps) {
    const props = ['query', 'categoryId', 'brandId', 'pageNum', 'sorts', 'KRW'];
    if (!_.isEqual(_.pick(this.props, props), _.pick(nextProps, props))) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    const { query, categoryId, brandId, pageNum, sorts, KRW } = props;
    const limit = 4 * 7;
    const queryOptions = {
      q: query,
      categoryId: categoryId === 'all' ? undefined : categoryId,
      brandId,
      offset: Math.max((pageNum - 1) * limit, 0),
      limit,
      KRW,
      aggs: 'categories:50',
    };
    if (sorts) {
      queryOptions.sorts = sorts;
    }
    this.props.searchProducts(queryOptions).then((res) => this.setState(res));
  },
  breadCrumbPath() {
    const { categories } = this.props;
    const path = [{ link: '/', name: { en: 'Home', ko: '홈' } }];
    function pushPath(category) {
      if (!category) {
        return;
      }
      if (category.parentId) {
        pushPath(categories[category.parentId]);
      }
      path.push({ link: `/categories/${category.id}`, name: category.name });
    }
    pushPath(this.props.category);
    return path;
  },
  render() {
    const { wishes = [], genLink } = this.props;
    const { products = [], aggs = {} } = this.state;
    const { ApiAction } = this.context;
    const path = this.breadCrumbPath();

    products.forEach((product) => {
      if (!product.mainImage) {
        product.mainImage = getProductMainImage(product.topHit || product);
      }
      product.wish = 0;
      for (let i = 0; i < wishes.length; i++) {
        if (wishes[i].product.id === product.id) {
          product.wish = wishes[i].id;
          break;
        }
      }
    });

    const changeMainImage = (productId, image) => {
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.id === productId) {
          if (product.mainImage && product.mainImage.url === image.url) {
            // same image
            return;
          }
          product.mainImage = image;
          this.setState({ products });
          return;
        }
      }
    };

    const toggleWish = (product) => {
      if (product.wish) {
        ApiAction.deleteWish(product.wish);
      } else {
        ApiAction.addWish(product.id);
      }
    };

    return (
      <div className="product-list-wide-container">
        <div className="product-list-titlebar">
          <div className="right"></div>
          <div className="inner">
          </div>
        </div>
        <div className="container-table no-padding">
          <ProductListLeft {...this.props} aggs={aggs} />
          <div className="product-list-right-box">
            <Breadcrumb path={path} />
            <ProductListSearchBar {...this.props} aggs={aggs} brandIds={this.props.brandId && this.props.brandId.split(',')} />
            <ProductListItems
              products={products}
              changeMainImage={changeMainImage}
              toggleWish={toggleWish}
            />
            <PageButton
              pagination={this.state.pagination}
              genLink={(pageNum) => genLink({ ...this.props, pageNum })}
              pageNum={this.props.pageNum}
            />
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => {
    const { categoryId = 'tree' } = ownProps;
    return {
      searchProducts: (query) => ajaxReturnPromise(state.auth, 'get', `/api/v1/products/search?${$.param(query)}`),
      categories: state.categories,
      category: state.categories[categoryId === 'all' ? 'tree' : categoryId],
      ...loadEntities(state, 'wishes', 'wishes'),
    };
  }
)(ProductList);
