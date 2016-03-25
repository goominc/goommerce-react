// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import ReorderComponent from 'components/order/ReorderComponent';

const Reorder = React.createClass({
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  render() {
    const { ApiAction } = this.context;
    const clickTab = (tab) => {

    };
    return (
      <div className="mypage-contents-container">
        <MyPageLeftbar />
        <ReorderComponent />
      </div>
    );
  },
});

export default connect(
  (state) => ({})
)(Reorder);
