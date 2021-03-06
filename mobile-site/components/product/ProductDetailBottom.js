// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import { models, productDetailAttributes } from 'commons/data';

import ShippingPolicyCountry from 'components/product/ShippingPolicyCountry';

export default React.createClass({
  propTypes: {
    product: PropTypes.object,
    sizes: PropTypes.array,
  },
  getInitialState() {
    return {};
  },
  render() {
    const { product, sizes } = this.props;
    const renderSizes = () => {
      if (!sizes || !sizes.length) {
        return null;
      }
      const kind = _.get(product, 'data.detail.kind');
      if (!productDetailAttributes[kind]) {
        return null;
      }
      const baseIndex = Math.floor(sizes.length / 2);
      const rows = productDetailAttributes[kind].map((attr) => i18n.get(attr));
      const columnWidth = 70 / sizes.length;
      return (
        <div className="section">
          <div className="title-line">
            <div className="title">{i18n.get('mItemDetail.productActualSize')}</div>
            <div className="title-right-text">{i18n.get('mItemDetail.actualSizeUnit')}</div>
          </div>
          <table className="size-table">
            <thead>
            <tr>
              <th width="30%"></th>
              {sizes.map((size) => <th width={`${columnWidth}%`}>{size.size}</th>)}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, rIndex) =>
              <tr>
                <td width="30%" className="head">{row}</td>
                {sizes.map((size, cIndex) => <td width={`${columnWidth}%`}>{(+_.get(product, `data.detail.size${rIndex + 1}`) + (cIndex - baseIndex) * 2) || 0}</td>)}
              </tr>
            )}
            </tbody>
          </table>
          <p className="product-detail-warning">
            {i18n.get('mItemDetail.warnDetailInfoMaybeWrong')}
          </p>
        </div>
      );
    };
    const renderDetailInfo = () => {
      const enumFields = [
        { title: '촉감', enums: ['까슬함', '적당함', '부드러움'], key: 'data.detail.touch' },
        { title: '신축성', enums: ['좋음', '약간', '없음'], key: 'data.detail.flexibility' },
        { title: '비침', enums: ['많이비침', '약간비침', '비침없음'], key: 'data.detail.transparency' },
        { title: '광택감', enums: ['광택있음', '약간있음', '광택없음'], key: 'data.detail.gloss' },
        { title: '두께감', enums: ['두꺼움', '적당함', '얇음'], key: 'data.detail.thickness' },
        { title: '안감', enums: ['전체안감', '부분안감', '안감없음'], key: 'data.detail.lining' },
        // { title: '모델착용사이즈', key: 'data.detail.modelSize' },
        // { title: '원산지', key: 'data.detail.origin' },
      ];
      const createRealEnum = () => {
        const newEnum = [];
        const detailInfo = _.get(product, 'data.detail');
        if (detailInfo) {
          Object.keys(detailInfo).forEach((key) => {
            enumFields.map((field) => {
              if (field.key === `data.detail.${key}` && _.get(detailInfo, key) !== '') {
                newEnum.push(field);
              }
              return null;
            });
          });
        }
        return newEnum;
      };
      const realEnum = createRealEnum();
      const convert = (key) => {
        const k = key.split('.').slice(-1)[0];
        return `${k[0].toUpperCase()}${k.substring(1)}`;
      };
      const activeIndexes = new Array(enumFields.length).fill(-1);
      enumFields.forEach((field, index) => {
        field.i18nPrefix = `pcItemDetail.info${convert(field.key)}`;
        const productValue = _.get(product, field.key);
        for (let i = 0; i < field.enums.length; i++) {
          if (productValue === field.enums[i]) {
            activeIndexes[index] = i;
            break;
          }
        }
      });
      const renderEnumField = (field, fieldIndex) => (
        <div key={field.key} className="info">
          <div className="key">
            {i18n.get(`${field.i18nPrefix}`)}
          </div>
          {field.enums.map((e, enumIndex) =>
            <div
              key={e} className={`enum-value ${enumIndex === activeIndexes[fieldIndex] ? 'active' : ''}`}
            >
              {i18n.get(`${field.i18nPrefix}${enumIndex}`)}
            </div>
          )}
        </div>
      );
      const renderDetailField = () => {
        if (realEnum.length > 0) {
          return (
            <div className="product-state">
              {enumFields.map(renderEnumField)}
            </div>
          );
        }
        return null;
      };
      const renderModelAndOrigin = () => {
        const modelName = _.get(product, 'data.detail.modelName');
        const modelSize = _.get(product, 'data.detail.modelSize');
        const origin = _.get(product, 'data.detail.origin');
        const renderModelSizeField = () => {
          if (!modelName) {
            return null;
          }
          return (
            <div className="info">
              <div className="key">{i18n.get('pcItemDetail.infoModelSize')}</div>
              <div className="value">{modelSize || ''}</div>
            </div>
          );
        };
        const renderOriginField = () => {
          if (!origin) {
            return null;
          }
          return (
            <div className="info">
              <div className="key">{i18n.get('pcItemDetail.infoOrigin')}</div>
              <div className="value">{origin || ''}</div>
            </div>
          );
        };
        const modelsizeFields = renderModelSizeField();
        const originFields = renderOriginField();
        if (modelsizeFields || originFields) {
          return (
            <div className="product-origin">
              {modelsizeFields}
              {originFields}
            </div>
          );
        }
        return null;
      };
      const detailFields = renderDetailField();
      const modelAndOriginFields = renderModelAndOrigin();
      if (!detailFields && !modelAndOriginFields) {
        return null;
      }
      return (
        <div className="info-table">
          {detailFields}
          {modelAndOriginFields}
        </div>
      );
    };
    const renderModel = () => {
      for (let i = 0; i < models.length; i++) {
        const model = models[i];
        if (_.get(product, 'data.detail.modelName') === model.name) {
          return (
            <div className="section">
              <div className="title-line">
                <div className="title">{i18n.get('pcItemDetail.modelChartTitle')}</div>
                <div className="title-right-text">{i18n.get('mItemDetail.model')}: {model.name}</div>
              </div>
              <table className="model-table">
                <tbody>
                <tr>
                  <td>{i18n.get('pcItemDetail.modelHeight')}<br />{model.height}</td>
                  <td>{i18n.get('pcItemDetail.modelWeight')}<br />{model.weight}</td>
                  <td>{i18n.get('pcItemDetail.modelShoulderWidth')}<br />{model.shoulderWidth}</td>
                  <td>{i18n.get('pcItemDetail.modelTopsLength')}<br />{model.topsLength}</td>
                  <td>{i18n.get('pcItemDetail.modelBottomsLength')}<br />{model.bottomslength}</td>
                </tr>
                <tr>
                  <td>{i18n.get('pcItemDetail.modelWaist')}<br />{model.waist}</td>
                  <td>{i18n.get('pcItemDetail.modelArmLength')}<br />{model.armLength}</td>
                  <td>{i18n.get('pcItemDetail.modelTopBustSize')}<br />{model.waist}</td>
                  <td>{i18n.get('pcItemDetail.modelHipSize')}<br />{model.hipSize}</td>
                  <td>{i18n.get('pcItemDetail.modelShoesSize')}<br />{model.ShoesSize}</td>
                </tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
      return null;
    };
    const rederDetail = () => {
      const detailInfo = renderDetailInfo();
      if (!detailInfo) {
        return null;
      }
      return (
        <div className="section">
          <div className="title-line">
            <div className="title">{i18n.get('mItemDetail.detailTitle')}</div>
          </div>
          {detailInfo}
        </div>
      );
    };

    const renderRefundPopup = () => {
      if (this.state.isShowRefundPopup) {
        return (
          <div>
            <div className="popup-overlay" />
            <div className="popup">
              <div className="header">
                <span className="title">{i18n.get('mItemDetail.popupRefundTitle')}</span>
                <span className="cancel" onClick={() => this.setState({ isShowRefundPopup: false })}></span>
              </div>
              <section className="product-detail-desc-section">
                <ul className="dashed">
                  <li>{i18n.get('mItemDetail.descRefund1')}</li>
                  <li>{i18n.get('mItemDetail.descRefund2')}</li>
                  <li>{i18n.get('mItemDetail.descRefund3')}</li>
                  <li>{i18n.get('mItemDetail.descRefund4')}</li>
                  <li>{i18n.get('mItemDetail.descRefund5')}</li>
                  <li>{i18n.get('mItemDetail.descRefund6')}</li>
                </ul>
              </section>
            </div>
          </div>
        );
      }
      return null;
    };
    const renderSoldoutPopup = () => {
      if (this.state.isShowSoldoutPopup) {
        return (
          <div>
            <div className="popup-overlay" />
            <div className="popup">
              <div className="header">
                <span className="title">{i18n.get('mItemDetail.popupSoldoutTitle')}</span>
                <span className="cancel" onClick={() => this.setState({ isShowSoldoutPopup: false })}></span>
              </div>
              <section className="product-detail-desc-section">
                <ul className="dashed">
                  <li>{i18n.get('mItemDetail.descSoldout1')}</li>
                  <li>{i18n.get('mItemDetail.descSoldout2')}</li>
                  <li>{i18n.get('mItemDetail.descSoldout3')}</li>
                </ul>
              </section>
            </div>
          </div>
        );
      }
      return null;
    };
    const renderShippingPopup = () => {
      if (this.state.isShowShippingPopup) {
        return (
          <div>
            <div className="popup-overlay" />
            <div className="popup">
              <div className="header">
                <span className="title">{i18n.get('mItemDetail.popupShippingTitle')}</span>
                <span className="cancel" onClick={() => this.setState({ isShowShippingPopup: false })}></span>
              </div>
              <section className="product-detail-desc-section">
                <ul className="dashed">
                  <li>{i18n.get('mItemDetail.descShipping1')}</li>
                  <li>{i18n.get('mItemDetail.descShipping2')}</li>
                  <li>{i18n.get('mItemDetail.descShipping3')}</li>
                  <li>
                    <strong>{i18n.get('mItemDetail.descShipping4')}</strong><br />
                    {i18n.get('mItemDetail.descShipping5')}<br />
                    {i18n.get('mItemDetail.descShipping6')}<br />
                    {i18n.get('mItemDetail.descShipping7')}<br />
                  </li>
                  <li>
                    <strong>{i18n.get('mItemDetail.descShipping8')}</strong><br />
                    {i18n.get('mItemDetail.descShipping9')}<br />
                    {i18n.get('mItemDetail.descShipping10')}<br />
                    {i18n.get('mItemDetail.descShipping11')}<br />
                  </li>
                </ul>
                <div className="shipping-policy-title">{i18n.get('mItemDetail.descShippingOverseasTitle')}</div>
                <ShippingPolicyCountry />
              </section>
            </div>
          </div>
        );
      }
      return null;
    };
    const popups = [renderRefundPopup, renderSoldoutPopup, renderShippingPopup];
    for (let i = 0; i < popups.length; i++) {
      const content = popups[i]();
      if (content) {
        return content;
      }
    }
    const openPopup = (popupState) => {
      // $('body').animate({ scrollTop: 0 }, 100);
      $('body').scrollTop(0);
      this.setState(popupState);
    };
    return (
      <div className="product-detail-info-section">
        {renderSizes()}
        {rederDetail()}
        {renderModel()}
        <div className="product-detail-popup-button" onClick={() => openPopup({ isShowRefundPopup: true })}>
          {i18n.get('mItemDetail.popupRefundTitle')}
          <i className="ms-icon icon-arrow-right"></i>
        </div>
        <div className="product-detail-popup-button" onClick={() => openPopup({ isShowSoldoutPopup: true })}>
          {i18n.get('mItemDetail.popupSoldoutTitle')}
          <i className="ms-icon icon-arrow-right"></i>
        </div>
        <div className="product-detail-popup-button" onClick={() => openPopup({ isShowShippingPopup: true })}>
          {i18n.get('mItemDetail.popupShippingTitle')}
          <i className="ms-icon icon-arrow-right"></i>
        </div>
        <p className="product-detail-warning">
          {i18n.get('mItemDetail.warnLinkshopsImage1')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage2')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage3')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage4')}<br />
        </p>
      </div>
    );
  },
});
