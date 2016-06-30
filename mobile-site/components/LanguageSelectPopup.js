import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import cookie from 'commons/utils/cookie';
import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    change: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      isShowPopup: true,
      selectValue: cookie.get('locale'),
    };
  },
  updateValue(newValue) {
    this.setState({ selectValue: newValue });
  },
  render() {
    const { isShowPopup } = this.state;
    if (!isShowPopup) {
      return null;
    }
    const locales = {
      ko: { img: `${constants.resourceRoot}/header/flag-kor-rec.png`, name: '한국어' },
      en: { img: `${constants.resourceRoot}/header/flag-eng-rec.png`, name: 'ENGLISH' },
      'zh-cn': { img: `${constants.resourceRoot}/header/flag-chi-rec.png`, name: '中文(简体)' },
      'zh-tw': { img: `${constants.resourceRoot}/header/flag-tai-rec.png`, name: '中文(繁體)' },
    };
    const options = [
      { value: 'ko', label: <div className="select-item"><img src = {_.get(locales, 'ko').img} /><span>{_.get(locales, 'ko').name}</span></div>, className: 'State-KOR' },
      { value: 'zh-cn', label: <div className="select-item"><img src = {_.get(locales, 'zh-cn').img} /><span>{_.get(locales, 'zh-cn').name}</span></div>, className: 'State-CHI' },
      { value: 'zh-tw', label: <div className="select-item"><img src = {_.get(locales, 'zh-tw').img} /><span>{_.get(locales, 'zh-tw').name}</span></div>, className: 'State-TAI' },
      { value: 'en', label: <div className="select-item"><img src = {_.get(locales, 'en').img} /><span>{_.get(locales, 'en').name}</span></div>, className: 'State-ENG' },
    ];
    const closePopup = () => {
      this.props.change(this.state.selectValue);
      this.setState({ isShowPopup: false });
    };
    const renderOverlay = () => {
      return (
        <div className="overlay">
          <div className="popup-box">
            <div className="language-select-box">
              <div className="title">언어 / 语言 / 語言 / Language</div>
              <div className="select-language">
                <Select
                  ref="stateSelect"
                  autofocus
                  options={options}
                  value={this.state.selectValue}
                  simpleValue
                  name="selected-state"
                  onChange={this.updateValue}
                  clearable={false}
                  searchable={false}
                  placeholder="select..."
                />
              </div>
              <button type="button" className="language-select-button" onClick={closePopup}>OK</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="language-select-popup">
        {!cookie.get('locale') ? renderOverlay() : null}
      </div>
    );
  },
});
