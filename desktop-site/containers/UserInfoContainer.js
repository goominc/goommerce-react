// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import UserInfo from 'components/mypage/UserInfo';

const UserInfoContainer = React.createClass({
  propTypes: {
    auth: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  getInitialState() {
    return { ...this.props.auth };
  },
  render() {
    const { ApiAction } = this.context;
    const onChange = (e, key) => {
      const nextState = {};
      _.set(nextState, key, e.target.value);
      this.setState(_.merge(this.state, nextState));
    };
    const save = () => {
      const user = _.pick(this.state, ['data']);
      if (user.data.firstName && user.data.lastName) {
        user.name = `${user.data.lastName} ${user.data.firstName}`;
      }
      ApiAction.updateUser(user);
    };
    const cancel = () => {
      this.context.router.push('/');
    };
    return (
      <UserInfo auth={this.state} save={save} cancel={cancel} onChange={onChange} />
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth })
)(UserInfoContainer);
