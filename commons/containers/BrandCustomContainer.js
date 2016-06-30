// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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
  loadProducts(categoryId, pageNum, limit = 30) {
    const { brandId } = this.props;
    const { ApiAction } = this.context;
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
    const { brandId } = this.props;

    const cloneChild = (child) => {
      const commonState = {
        ...this.props,
        loadProducts: this.loadProducts,
        aggs: this.state.aggs,
        isLikeBrand: storeUtil.isLikeBrand(brandId),
      };
      const props = Object.assign(commonState, child.props);
      return React.cloneElement(child, props);
    };
    const childrenWithProps = React.Children.map(this.props.children, cloneChild);

    return (
      <div>
        {childrenWithProps}
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    auth: state.auth,
    // 2016. 06. 21. [heekyu] activeLocale from context does not update correctly
    activeLocale: state.i18n.activeLocale,
    activeCurrency: state.currency.activeCurrency,
    categoryRoot: state.categories.tree,
    brand: _.get(state, `entities.brands.${ownProps.brandId}`),
    // favoriteBrands: state.auth.favoriteBrands || [], // for refresh when change favorite brand
    searchResult: state.search.product,
    ...loadEntities(state, 'wishes', 'wishes'),
  })
)(BrandCustomContainer);


