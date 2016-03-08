// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import SigninForm from 'components/user/SigninForm';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func.isRequired,
  },
  render() {
    return (
      <div>
        <div className="popup-overlay"></div>
        <div className="popup-body signin-popup">
          <SigninForm {...this.props} />
          <div className="popup-close-button" onClick={this.props.closePopup}>X</div>
        </div>
      </div>
    );
  },
});
