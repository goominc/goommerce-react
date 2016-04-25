// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import roleUtil from 'commons/utils/roleUtil';

const FakeLoginContainer = React.createClass({
  propTypes: {
    auth: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  render() {
    const { auth } = this.props;
    const { fakeLogin } = this.context.ApiAction;
    if (roleUtil.hasRole(auth, ['admin'])) {
      const onKeyDown = (e) => {
        const keyCode = e.keyCode;
        if (keyCode === 13) {
          // enter
          const userId = this.refs.userId.value;
          if (userId) {
            fakeLogin(userId);
          }
        }
      };
      return (
        <div className="dropdown-menu">
          <input onKeyDown={onKeyDown} placeholder="User Id & Press Enter" ref="userId" />
        </div>
      );
    }
    return null;
  },
});

export default connect(
  (state) => _.pick(state, 'auth')
)(FakeLoginContainer);
