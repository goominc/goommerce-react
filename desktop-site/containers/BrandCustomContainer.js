// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import BrandDefaultHeader from 'components/brand/BrandDefaultHeader';
import BrandDefaultPage from 'components/brand/BrandDefaultPage';

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
  componentDidMount() {
    const { auth, brandId, location } = this.props;
    const { ApiAction } = this.context;
    ApiAction.loadBrand(brandId);
    const { categoryId, pageNum } = location.query;
    this.loadProducts(categoryId, pageNum);
    ApiAction.loadCategories();
    if (auth.id) {
      ApiAction.loadWishlist();
    }
  },
  loadProducts(categoryId, pageNum) {
    const { brandId } = this.props;
    const { ApiAction } = this.context;
    const limit = 30;
    const offset = (pageNum - 1) * limit || 0;
    ApiAction.searchProducts({
      brandId,
      categoryId,
      aggs: 'categories:50',
      sorts: '-id',
    }, offset, limit);
  },
  render() {
    const { brandId, location } = this.props;
    const { categoryId = 0, pageNum = 1 } = location.query;
    return (
      <div>
        <BrandDefaultHeader auth={this.props.auth} />
        <BrandDefaultPage
          {...this.props}
          loadProducts={this.loadProducts}
          isLikeBrand={storeUtil.isLikeBrand(brandId)}
          activeCategoryId={+categoryId}
          pageCurrent={+pageNum}
        />
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


