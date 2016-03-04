// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import FavoriteBrandPage from 'components/mypage/FavoriteBrandPage';

const FavoriteBrand = React.createClass({
  render() {
    return (
      <FavoriteBrandPage {...this.props} />
    );
  },
});

export default connect(
  state => ({ brands: state.auth.favoriteBrands || [] })
)(FavoriteBrand);
