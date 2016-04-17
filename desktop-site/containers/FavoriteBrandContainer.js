// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import FavoriteBrandPage from 'components/mypage/FavoriteBrandPage';

const FavoriteBrand = React.createClass({
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadFavoriteBrandProducts();
  },
  render() {
    return (
      <div className="mypage-contents-container">
        <FavoriteBrandPage {...this.props} deleteFavoriteBrand={this.context.ApiAction.deleteFavoriteBrand} />
      </div>
    );
  },
});

export default connect((state) => (
  {
    brands: state.auth.favoriteBrands || [],
    brandProducts: state.favoriteBrand.brandProducts || [],
  }
))(FavoriteBrand);
