import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  componentWillUpdate(nextProps, nextState) {
    if (nextState.keyword && nextState.keyword.length) {
      $('.clear-btn').show();
    } else {
      $('.clear-btn').hide();
    }
  },
  handleSearch() {
    const { keyword } = this.state;
    if (keyword && keyword.length) {
      this.props.toggle();
      this.props.search(keyword);
    }
  },
  render() {
    const { show } = this.props;
    const clearInput = () => {
      this.setState({ keyword: '' });
    };
    return (
      <section className="ms-autocomplete expand" id="ms-autocomplete" style={{ display: show ? 'block' : 'none' }}>
        <div className="ms-autocomplete-main">
          <div className="ms-input-search-wrapper">
            <input type="search" placeholder="I'm shopping for..." className="ms-text-primary" name="keywords"
              spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off"
              valueLink={this.linkState('keyword')}
            />
            <span className="clear-btn" onClick={clearInput}></span>
          </div>
          <span className="ms-autocomplete-search" onClick={this.handleSearch}></span>
          <span className="ms-autocomplete-cannel" onClick={this.props.toggle}>Cancel</span>
        </div>
        { /* <div className="ms-autocomplete-list">
          <div className="autocomplate-brand">
            <a href="#">
              <div className="brand-logo"></div>
              <div className="store-name"></div>
            </a>
          </div>
          <div className="autocomplete-hot">
            <div className="autocomplete-hot-content"></div>
          </div>
          <h3 className="autocomplete-list-title">Recent searches</h3>
          <ul>
            <li key="tt bike frame" data-value="">
              <div><b>tt </b>bike frame</div>
            </li>
            <li key="tt saddle" data-value="">
              <div><b>tt </b>saddle</div>
            </li>
          </ul>
          <div className="ms-button-secondary ms-autocomplete-close"></div>
        </div> */ }
      </section>
    );
  },
});
