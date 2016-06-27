// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import i18n from 'commons/utils/i18n';

import UserPolicies from 'commons/components/user/UserPolicies';
import UserPoliciesCn from 'commons/components/user/UserPoliciesCn';

const UserPoliciesContainer = React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    $('body').scrollTop(0);
  },
  render() {
    const { activeLocale } = this.props;
    const userPolices = {
      ko: <UserPolicies />,
      en: <UserPolicies />,
      'zh-cn': <UserPoliciesCn />,
      'zh-tw': <UserPoliciesCn />,
    };
    const onClick = () => {
      this.context.router.goBack();
    };
    console.log(activeLocale);
    return (
      <div className="policies-container">
        {userPolices[activeLocale]}
        <div className="signin-button button-confirm" onClick={onClick}>{i18n.get('word.confirm')}</div>
      </div>
    );
  },
});

export default connect(
  (state) => ({ activeLocale: state.i18n.activeLocale }),
  Object.assign({})
)(UserPoliciesContainer);
