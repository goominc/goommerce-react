import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    error: PropTypes.object,
    resetError: PropTypes.func,
  },
  render() {
    const { error, resetError } = this.props;
    if (!error || !error.message) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <div className="popup-overlay"></div>
        <div className="error-popup-box">
          <div className="error-message">{error.message}</div>
          <button className="close-button" onClick={resetError}>Close</button>
        </div>
      </div>
    );
  },
});
