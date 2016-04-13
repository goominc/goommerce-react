import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';
import Breadcrumb from 'components/Breadcrumb';
import ProductListLeft from 'components/ProductListLeft';
import ProductListItems from 'components/ProductListItems';
import PageButton from 'components/PageButton';

import { getProductMainImage } from 'commons/utils/productUtil';

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
    searchProducts: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  getDefaultProps() {
    return { pageNum: '1' };
  },
  getInitialState() {
    return { latest: false };
  },
  componentDidMount() {
    this.doSearch(this.props);
  },
  componentWillReceiveProps(nextProps) {
    const props = ['query', 'categoryId', 'brandId', 'pageNum'];
    if (!_.isEqual(_.pick(this.props, props), _.pick(nextProps, props))) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    const { query, categoryId, brandId, pageNum } = props;
    const limit = 30;
    const queryOptions = {
      q: query,
      categoryId: categoryId === 'all' ? undefined : categoryId,
      brandId,
      offset: Math.max((pageNum - 1) * limit, 0),
      limit,
    };
    if (props.latest) {
      queryOptions.sorts = '-id';
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
    const { products = [], aggs = {}, brand } = this.state;
    const path = this.breadCrumbPath();

    products.forEach((product) => {
      if (!product.mainImage) {
        product.mainImage = getProductMainImage(product.topHit || product);
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

    return (
      <div className="product-list-wide-container">
        <div className="product-list-titlebar">
          <div className="right"></div>
          <div className="inner">
          </div>
        </div>
        <div className="container-table no-padding">
          <ProductListLeft {...this.props} aggs={aggs} brand={brand || null} />
          <div className="product-list-right-box">
            <Breadcrumb path={path} />
            <div className="product-list-search-box">
              <div className="search-row">
                <div className="search-label">가격</div>
                <div className="search-control">
                  <div className="button-item">0 ~ 10,000</div>
                  <div className="button-item">10,001 ~ 20,000</div>
                  <div className="button-item">20,001 ~ 30,000</div>
                  <div className="button-item">30,001 ~ </div>
                </div>
              </div>
              <div className="search-row">
                <div className="search-label">단골 브랜드</div>
                <div className="search-control">
                  <div className="button-item">abc</div>
                </div>
              </div>
              <div className="search-row">
                하이루
                <div className="sort-item-box">
                  <a className="sort-item">낮은가격 순</a>
                  <strong className="sort-item active">높은 가격 순</strong>
                  <a className="sort-item">최신등록 순</a>
                </div>
              </div>
            </div>
            <ProductListItems products={products} changeMainImage={changeMainImage} />
            <PageButton
              pagination={this.state.pagination}
              genLink={(pageNum) => this.props.genLink({ ...this.props, pageNum })}
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
    };
  }
)(ProductList);
