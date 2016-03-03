// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loadEntities from '../../commons/redux/util/loadEntities';
import WishListPage from '../components/mypage/WishListPage';

const WishList = React.createClass({
  propTypes: {
    wishes: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadWishlist();
  },
  render() {
    const { wishes } = this.props;
    if (!wishes) {
      return (<div></div>);
    }
    return (<WishListPage wishes={wishes} />);
  },
});

export default connect(
  state => ({ wishes: Object.keys(state.entities.wishes).map(wishId => state.entities.wishes[wishId]).filter((i) => !!i) })
)(WishList);
