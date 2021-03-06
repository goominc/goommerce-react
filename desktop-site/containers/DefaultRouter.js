// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BrandCustomContainer from 'commons/containers/BrandCustomContainer';
import AppFooter from 'components/AppFooter';
import BrandDefaultHeader from 'components/brand/BrandDefaultHeader';
import BrandDefaultPage from 'components/brand/BrandDefaultPage';

const DefaultRouter = React.createClass({
  propTypes: {
    brandPathnameMap: PropTypes.object,
    location: PropTypes.object.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    const { brandPathnameMap, location } = this.props;
    const { router } = this.context;
    if (!brandPathnameMap[location.pathname]) {
      router.replace('/');
      return;
    }
  },
  render() {
    const { brandPathnameMap, location } = this.props;
    const brandId = brandPathnameMap[location.pathname];
    const { categoryId = 0, pageNum = 1 } = location.query;
    return (
      <BrandCustomContainer brandId={brandId} location={location}>
        <BrandDefaultHeader />
        <BrandDefaultPage
          activeCategoryId={+categoryId}
          pageCurrent={+pageNum}
          // aggs={this.state.aggs} aggs will pass in BrandCustomContainer
        />
        <AppFooter />
      </BrandCustomContainer>
    );
  },
});

export default connect(
  (state, ownProps) => {
    const brandPathnameMap = state.brand.pathnameMap;
    return {
      brandPathnameMap,
    };
  }
)(DefaultRouter);
