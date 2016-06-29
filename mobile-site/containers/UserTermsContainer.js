// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import i18n from 'commons/utils/i18n';

import { getUserTerms } from 'commons/components/I18nComponentSelector';

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
    const onClick = () => {
      this.context.router.goBack();
    };
    return (
      <div className="policies-container">
        {getUserTerms(activeLocale)}
        <div className="signin-button button-confirm" onClick={onClick}>{i18n.get('word.confirm')}</div>
      </div>
    );
  },
});

export default connect(
  (state) => ({ activeLocale: state.i18n.activeLocale })
)(UserTermsContainer);
