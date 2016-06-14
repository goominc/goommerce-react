// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onlyNumberFieldOnChange: PropTypes.func,
  },
  getInitialState() {
    return { activeAreaCodeIndex: 0 };
  },
  componentDidMount() {
    this.props.onChange({ target: { value: _.get(this.props, 'auth.data.areaCode', '+82') } }, 'data.areaCode');
  },
  render() {
    const { auth, onChange, onlyNumberFieldOnChange } = this.props;
    const { areaCodes } = constants;
    const activeAreaCodeIndex = this.state.activeAreaCodeIndex || 0;
    const toggleNumberDropdown = () => {
      const target = $('.signup-form-section .form-tel .dropdown-box');
      const display = target.css('display');
      if (display === 'none') {
        target.css('display', 'block');
      } else {
        target.css('display', 'none');
      }
    };
    const renderAreaCodeDropdown = (ac, index) => {
      if (index === activeAreaCodeIndex) {
        return null;
      }
      const onClick = () => {
        toggleNumberDropdown();
        this.setState({ activeAreaCodeIndex: index });
        onChange({ target: { value: areaCodes[index].number } }, 'data.areaCode');
      };
      return (
        <div key={ac.name} onClick={onClick} className="dropdown-item">
          <img src={ac.img} /> {ac.name} <span className="number">{ac.number}</span>
        </div>
      );
    };
    return (
      <div className="signup-form-section">
        <div className="title">
          {i18n.get('pcMain.signup.personalInformation')}
        </div>
        <div className="form-group">
          <label><span className="required">{auth.id ? '' : '*'}</span>{i18n.get('pcMypage.name')}</label>
          <div className="input-lastname">
            <input id="lastName" onChange={(e) => onChange(e, 'data.lastName')}
              defaultValue={auth ? _.get(auth, 'data.lastName') : ''}
              type="text" placeholder={i18n.get('pcMypage.lastName')}
            />
          </div>
          <div className="input-firstname">
            <input id="firstName" onChange={(e) => onChange(e, 'data.firstName')}
              defaultValue={auth ? _.get(auth, 'data.firstName') : ''}
              type="text" placeholder={i18n.get('pcMypage.firstName')}
            />
          </div>
        </div>
        <div className="form-group">
          <label><span className="required">{auth.id ? '' : '*'}</span>{i18n.get('pcMypage.phoneNumber')}</label>
          <div className="form-tel">
            <div className="area-code" onClick={toggleNumberDropdown}>
              <img src={areaCodes[activeAreaCodeIndex].img} /> {areaCodes[activeAreaCodeIndex].number}
              <div className="arrow-down"></div>
            </div>
            <input
              id="tel"
              onChange={(e) => (
                onlyNumberFieldOnChange ? onlyNumberFieldOnChange(e, 'data.tel', 15) : onChange(e, 'data.tel')
              )}
              value={auth ? _.get(auth, 'data.tel') || '' : ''}
              type="text" placeholder={i18n.get('pcMain.signup.pleaseEnterOnlyNumbersExcept')}
            />
            <div className="dropdown-box">
              {areaCodes.map(renderAreaCodeDropdown)}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
