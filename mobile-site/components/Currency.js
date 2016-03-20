import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    currencies: PropTypes.array.isRequired,
    activeCurrency: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  },
  handleChange(currency) {
    if (this.props.activeCurrency === currency) {
      return;
    }
    this.props.toggle();
    this.props.change(currency);
  },
  render() {
    const { currencies, activeCurrency, show } = this.props;
    const renderCurrency = $.map(currencies, (currency, id) =>
      <li key={id} className={currency === activeCurrency ? 'active' : ''} onClick={() => this.handleChange(currency)}>
        <span>{currency}</span>
      </li>
    );

    return (
      <div className={`ms-panel${show ? ' panel-show' : ''}`} style={{ top: show ? '0%' : '100%' }}>
        <div className="ms-panel-header">
          <span className="ms-panel-title">Currency</span>
          <span className="ms-panel-cancel" onClick={this.props.toggle}></span>
        </div>
        <div className="ms-panel-bodyer">
          <div className="ms-langcut">
            <ul className="lang-list">
              {renderCurrency}
            </ul>
          </div>
        </div>
      </div>

    );
  },
});
