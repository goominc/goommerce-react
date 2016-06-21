// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AppFooter from 'components/AppFooter';
import BrandDefaultHeader from 'components/brand/BrandDefaultHeader';
import BrandDefaultPage from 'components/brand/BrandDefaultPage';

import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';
import loadEntities from 'commons/redux/util/loadEntities';
import storeUtil from 'commons/utils/storeUtil';

const BrandCustomContainer = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    brandId: PropTypes.number,
    location: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const { auth, brandId, location } = this.props;
    if (!brandId) {
      return;
    }
    const { ApiAction } = this.context;
    ApiAction.loadBrand(brandId);
    const { categoryId, pageNum } = location.query;
    this.loadProducts(categoryId, pageNum);
    // TODO load categories only when not exists
    ApiAction.loadCategories();
    const query = {
      offset: 0,
      limit: 1,
      aggs: 'categories:80',
      brandId,
    };
    const url = `/api/v1/products/search?${$.param(query)}`;
    ajaxReturnPromise(auth, 'get', url).then((res) => {
      this.setState({ aggs: res.aggs });
    });
    if (auth.id) {
      ApiAction.loadWishlist();
    }
  },
  loadProducts(categoryId, pageNum) {
    const { brandId } = this.props;
    const { ApiAction } = this.context;
    const limit = 30;
    const offset = (pageNum - 1) * limit || 0;
    const query = {
      brandId,
      sorts: '-id',
    };
    if (categoryId) {
      query.categoryId = categoryId;
    }
    ApiAction.searchProducts(query, offset, limit);
  },
  render() {
    const { brandId, location } = this.props;
    const { categoryId = 0, pageNum = 1 } = location.query;
    return (
      <div>
        <BrandDefaultHeader {...this.props} />
        <BrandDefaultPage
          {...this.props}
          loadProducts={this.loadProducts}
          isLikeBrand={storeUtil.isLikeBrand(brandId)}
          activeCategoryId={+categoryId}
          pageCurrent={+pageNum}
          aggs={this.state.aggs}
        />
        <AppFooter />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    auth: state.auth,
    categoryRoot: state.categories.tree,
    brand: _.get(state, `entities.brands.${ownProps.brandId}`),
    searchResult: state.search.product,
    ...loadEntities(state, 'wishes', 'wishes'),
  })
)(BrandCustomContainer);


