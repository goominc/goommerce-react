import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Breadcrumb from 'components/Breadcrumb';
import ProductListLeft from 'components/ProductListLeft';
import ProductListItems from 'components/ProductListItems';
import PageButton from 'components/PageButton';

import { getProductMainImage } from 'util';

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
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  getDefaultProps() {
    return { pageNum: '1' };
  },
  getInitialState() {
    return {};
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
    this.context.ApiAction.searchProducts({
      q: query,
      categoryId: categoryId === 'all' ? undefined : categoryId,
      brandId,
      offset: Math.max((pageNum - 1) * limit, 0),
      limit,
    }).then((res) => this.setState(res));
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
      <div className="container-table">
        <ProductListLeft {...this.props} aggs={aggs} brand={brand || null} />
        <div className="product-list-right-box">
          <Breadcrumb path={path} />
          <div className="product-list-search-box"></div>
          <ProductListItems products={products} changeMainImage={changeMainImage} />
          <PageButton
            pagination={this.state.pagination}
            genLink={(pageNum) => this.props.genLink({ ...this.props, pageNum })}
            pageNum={this.props.pageNum}
          />
        </div>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => {
    const { categoryId = 'tree' } = ownProps;
    return {
      categories: state.categories,
      category: state.categories[categoryId === 'all' ? 'tree' : categoryId],
    };
  }
)(ProductList);
