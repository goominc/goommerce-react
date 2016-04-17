// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  },
  getInitialState() {
    return { activeAreaCodeIndex: 0 };
  },
  componentDidMount() {
    this.props.onChange({ target: { value: '+82' } }, 'data.areaCode');
  },
  render() {
    const { auth, onChange } = this.props;
    const areaCodes = [
      { img: `${constants.resourceRoot}/main/country-kor.png`, name: 'Korea', number: '+82' },
      { img: `${constants.resourceRoot}/main/country-china.png`, name: 'China', number: '+86' },
      { img: `${constants.resourceRoot}/main/country-china.png`, name: 'Hongkong', number: '+886' },
      /*
       { img: `${constants.resourceRoot}/main/country-england.png`, name: 'United Kingdom', number: '+214' },
       { img: `${constants.resourceRoot}/main/country-usa.png`, name: 'Newyork', number: '+615' },
       */
      { img: `${constants.resourceRoot}/main/country-taiwan.png`, name: 'Taiwan', number: '+423' },
    ];
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
          개인정보
        </div>
        <div className="form-group">
          <label><span className="required">{auth ? '' : '*'}</span>성함</label>
          <div className="input-lastname">
            <input id="lastName" onChange={(e) => onChange(e, 'data.lastName')}
              defaultValue={auth ? _.get(auth, 'data.lastName') : ''}
              type="text" placeholder="성"
            />
          </div>
          <div className="input-firstname">
            <input id="firstName" onChange={(e) => onChange(e, 'data.firstName')}
              defaultValue={auth ? _.get(auth, 'data.firstName') : ''}
              type="text" placeholder="이름"
            />
          </div>
        </div>
        <div className="form-group">
          <label><span className="required">{auth ? '' : '*'}</span>연락처</label>
          <div className="form-tel">
            <div className="area-code" onClick={toggleNumberDropdown}>
              <img src={areaCodes[activeAreaCodeIndex].img} /> {areaCodes[activeAreaCodeIndex].number}
              <div className="arrow-down"></div>
            </div>
            <input id="tel" onChange={(e) => onChange(e, 'data.tel')}
              defaultValue={auth ? _.get(auth, 'data.tel') : ''}
              type="text" placeholder="연락처를 입력해 주세요"
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
