import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    locales: PropTypes.object.isRequired,
    activeLocale: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  },
  handleChange(language) {
    if (this.props.activeLocale === language) {
      return;
    }
    this.props.toggle();
    this.props.change(language);
  },
  render() {
    const { locales, activeLocale, show } = this.props;
    const renderLocale = $.map(locales, (loc, id) =>
      <li key={id} className={id === activeLocale ? 'active' : ''} onClick={() => this.handleChange(id)}>
        <span>{loc}</span>
      </li>
    );

    return (
      <div className={`ms-panel${show ? ' panel-show' : ''}`} style={{ top: show ? '0px' : '100%' }}>
        <div className="ms-panel-header">
          <span className="ms-panel-title">Language</span>
          <span className="ms-panel-cancel" onClick={this.props.toggle}></span>
        </div>
        <div className="ms-panel-bodyer">
          <div className="ms-langcut">
            <ul className="lang-list">
              {renderLocale}
            </ul>
          </div>
        </div>
      </div>

    );
  },
});
