// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';
import { constants } from 'commons/utils/constants';
import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  contextTypes: {
    router: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  render() {
    const onChange = (e, key) => {
      const nextState = {};
      nextState[key] = e.target.value;
      this.setState(nextState);
    };
    const onlyNumberFieldOnChange = (e, key, maxLen) => {
      if (numberUtil.validateNumberInput(e.target.value, maxLen)) {
        onChange(e, key);
      }
    };
    const fields = [
      { name: '업체명', placeholder: '업체명을 입력해 주세요', key: 'name' },
      { name: '담당자명', placeholder: '담당자 성함을 입력해 주세요', key: 'contactName' },
      { name: 'E-mail', placeholder: 'E-mail을 입력해 주세요', key: 'email', type: 'email' },
      { name: '연락처', placeholder: "'-'를 제외한 숫자만 입력해 주세요", key: 'tel', onChange: (e) => onlyNumberFieldOnChange(e, 'tel', 15) },
      { name: '판매상가', key: 'building' },
      { name: '층', key: 'floor' },
      { name: '호수', key: 'flatNumber' },
      { name: '판매물품', placeholder: '예) 여성 의류, 신발, 가방 등', key: 'productType' },
    ];
    const renderField = (field) => (
      <div key={field.key} className="input-line">
        <div className="label">{field.name}</div>
        <input
          type={field.type || 'text'}
          value={this.state[field.key] || ''}
          onChange={field.onChange ? field.onChange : (e) => onChange(e, field.key)}
          placeholder={field.placeholder}
        />
      </div>
    );
    const handleSubmit = (e) => {
      e.preventDefault();
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!this.state[field.key]) {
          window.alert(`${field.name}을 입력해 주세요`);
          return;
        }
      }
      $('.button-next').prop('disabled', true);
      ajaxReturnPromise(null, 'post', '/api/v1/brands/inquiries', { data: this.state }).then(() => {
        window.alert(`입점 신청 문의가 완료되었습니다. 24시간 이내에 (${this.state.tel})으로 연락 드리겠습니다`);
        this.context.router.push('/');
      }, () => {
        $('.button-next').prop('disabled', false);
        window.alert('입점 신청 접수가 실패하였습니다. 다시 시도해 주세요');
      });
    };
    return (
      <div className="seller-join-container">
        <img className="banner" src={`${constants.resourceRoot}/banner/seller-join-banner.jpg`} />
        <img className="join-why" src={`${constants.resourceRoot}/banner/seller-join-why.jpg`} />
        <img className="join-24" src={`${constants.resourceRoot}/banner/seller-join-24.jpg`} />
        <img className="join-process" src={`${constants.resourceRoot}/banner/seller-join-step.jpg`} />
        <div className="join-request-title">
          <img src={`${constants.resourceRoot}/main/seller-speech-icon.png`} />
          <strong>링크샵스 입점문의 및 상담 신청</strong>
          <span>전화연결이 어려우신 분들은 문의를 남겨주시면 24시간 이내로 담당자가 연락 드리겠습니다</span>
        </div>
        <div className="form-line">
          <form className="join-request-form" onSubmit={handleSubmit}>
            {fields.map(renderField)}
            <div className="form-button-line">
              <Link to="/"><button type="reset" className="button-back">취소</button></Link>
              <button type="submit" className="button-next">상담신청</button>
            </div>
          </form>
          <img className="banner-inquiry" src={`${constants.resourceRoot}/banner/seller-join-inquiry_20160630-1.jpg`} />
        </div>
      </div>
    );
  },
});
