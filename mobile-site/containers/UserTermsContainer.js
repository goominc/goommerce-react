// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import i18n from 'commons/utils/i18n';

import UserTerms from 'commons/components/user/UserTerms';
import UserTermsCn from 'commons/components/user/UserTermsCn';

const UserTermsContainer = React.createClass({
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
    const userTerms = {
      ko: <UserTerms />,
      en: <UserTerms />,
      'zh-cn': <UserTermsCn />,
      'zh-tw': <UserTermsCn />,
    };
    const onClick = () => {
      this.context.router.goBack();
    };
    return (
      <div className="policies-container">
        {userTerms[activeLocale]}
        <div className="signin-button button-confirm" onClick={onClick}>{i18n.get('word.confirm')}</div>
      </div>
    );
  },
});

export default connect(
  (state) => ({ activeLocale: state.i18n.activeLocale }),
  Object.assign({}, ApiAction)
)(UserTermsContainer);
