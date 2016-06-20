// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BrandCustomContainer from 'containers/BrandCustomContainer';

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
    return (
      <BrandCustomContainer brandId={brandId} location={location} />
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
