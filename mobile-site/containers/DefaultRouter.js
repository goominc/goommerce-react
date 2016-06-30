// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BrandCustomContainer from 'commons/containers/BrandCustomContainer';
import CommonFooter from 'components/CommonFooter';
import BrandDefaultHeader from 'components/brand/BrandDefaultHeader';
import BrandDefaultMenu from 'components/brand/BrandDefaultMenu';
import BrandDefaultPage from 'components/brand/BrandDefaultPage';

import { toggleBrandPageMenu } from 'redux/actions';

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
    const { isOpenMenu, toggleBrandPageMenu } = this.props; // eslint-disable-line
    const brandId = brandPathnameMap[location.pathname];
    const { categoryId = 0, pageNum = 1 } = location.query;
    const pageLimit = 10;
    const body = isOpenMenu ?
      <BrandDefaultMenu
        toggleBrandPageMenu={toggleBrandPageMenu}
        pageLimit={pageLimit}
      /> :
      <BrandDefaultPage
        activeCategoryId={+categoryId}
        pageNum={pageNum}
        pageLimit={pageLimit}
      />;
    return (
      <BrandCustomContainer brandId={brandId} location={location}>
        <BrandDefaultHeader isOpenMenu={isOpenMenu} toggleBrandPageMenu={toggleBrandPageMenu} />
        {body}
        <CommonFooter />
      </BrandCustomContainer>
    );
  },
});

export default connect(
  (state, ownProps) => {
    const brandPathnameMap = state.brand.pathnameMap;
    return {
      brandPathnameMap,
      isOpenMenu: state.pageBrandPage.isOpenMenu,
    };
  },
  { toggleBrandPageMenu }
)(DefaultRouter);
