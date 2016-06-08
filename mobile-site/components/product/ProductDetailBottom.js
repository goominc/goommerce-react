// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import { productDetailAttributes } from 'commons/data';

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
      );
    };
    const renderDetailInfo = () => {
      const enumFiels = [
        { title: '촉감', enums: ['까슬함', '적당함', '부드러움'], key: 'data.detail.touch' },
        { title: '신축성', enums: ['좋음', '약간', '없음'], key: 'data.detail.flexibility' },
        { title: '비침', enums: ['많이비침', '약간비침', '비침없음'], key: 'data.detail.transparency' },
        { title: '광택감', enums: ['광택있음', '약간있음', '광택없음'], key: 'data.detail.gloss' },
        { title: '두께감', enums: ['두꺼움', '적당함', '얇음'], key: 'data.detail.thickness' },
        { title: '안감', enums: ['전체안감', '부분안감', '안감없음'], key: 'data.detail.lining' },
        // { title: '모델착용사이즈', key: 'data.detail.modelSize' },
        // { title: '원산지', key: 'data.detail.origin' },
      ];
      const convert = (key) => {
        const k = key.split('.').slice(-1)[0];
        return `${k[0].toUpperCase()}${k.substring(1)}`;
      };
      const activeIndexes = new Array(enumFiels.length).fill(-1);
      enumFiels.forEach((field, index) => {
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
      return (
        <div className="info-table">
          {enumFiels.map(renderEnumField)}
          <div className="info">
            <div className="key">{i18n.get('pcItemDetail.infoModelSize')}</div>
            <div className="value">{_.get(product, 'data.detail.modelSize') || ''}</div>
          </div>
          <div className="info">
            <div className="key">{i18n.get('pcItemDetail.infoOrigin')}</div>
            <div className="value">{_.get(product, 'data.detail.origin') || ''}</div>
          </div>
        </div>
      );
    };
    const { isShowShippingCountry } = this.state;
    const renderShippingPolicyCountry = () => {
      if (isShowShippingCountry) {
        return [
          <div
            key="shippig-policy-title"
            className="product-detail-shipping-country-title"
            onClick={() => this.setState({ isShowShippingCountry: false })}
          >
            해외 국가별 배송비 책정기준 <i className="ms-icon icon-arrow-up"></i>
          </div>,
          <ShippingPolicyCountry key="shipping-policy-content" />,
        ];
      }
      return (
        <div
          className="product-detail-shipping-country-title"
          onClick={() => this.setState({ isShowShippingCountry: true })}
        >
          해외 국가별 배송비 책정기준 <i className="ms-icon icon-arrow-down"></i>
        </div>
      );
    };
    return (
      <div className="product-detail-info-section">
        <div className="section">
          <div className="title-line">
            <div className="title">{i18n.get('mItemDetail.productActualSize')}</div>
            <div className="title-right-text">{i18n.get('mItemDetail.actualSizeUnit')}</div>
          </div>
          {renderSizes()}
        </div>
        <div className="section">
          <div className="title-line">
            <div className="title">{i18n.get('mItemDetail.detailTitle')}</div>
          </div>
          {renderDetailInfo()}
        </div>
        <p className="product-detail-warning">
          {i18n.get('mItemDetail.warnLinkshopsImage1')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage2')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage3')}<br />
          {i18n.get('mItemDetail.warnLinkshopsImage4')}<br />
        </p>
        <section className="product-detail-desc-section">
          <div className="title">반품교환</div>
          <ul className="dashed">
            <li>도매사이트 특성 상 반품은 불가합니다.</li>
            <li>불량상품의 경우 링크샵스에서 배송료를 부담하고 교환해 드립니다.</li>
            <li>상품 불량으로 인한 교환신청은 배송완료 후 7일 이내에만 신청이 가능하며 동일 색상/사이즈로만 교환이 가능합니다.</li>
            <li>교환하고자 하는 상품이 품절된 경우 환불 처리해 드립니다.</li>
            <li>컴퓨터 모니터의 차이로 인해 색상차이가 있을 수 있으며 상품의 사이즈 오차는 측정하는 방법에 따라 다를 수 있어 불량에 해당하지 않습니다.</li>
            <li>상품을 착용하거나 세탁한 경우 교환기간 내라도 접수 불가능합니다.</li>
          </ul>
        </section>
        <section className="product-detail-desc-section">
          <div className="title">품절/입고지연</div>
          <ul className="dashed">
            <li>도매시장의 특성 상 판매자의 실시간 재고 파악이 불가능 합니다.</li>
            <li>판매자 또는 제조사의 사정으로 상품이 갑작스럽게 품절되거나 재고가 부족할 수 있습니다.</li>
            <li>품절된 상품의 경우 주문 당시 동일 결제수단으로 자동 환불 처리해 드립니다.</li>
          </ul>
        </section>
        <section className="product-detail-desc-section">
          <div className="title">배송</div>
          <ul className="dashed">
            <li>배송은 월~금요일만 진행되며 주말/공휴일/도매시장 휴업일은 제외입니다.</li>
            <li>주말, 공휴일 또는 도서산간 지역의 경우 1~2일의 추가 배송기간이 소요됩니다.</li>
            <li>자연재해, 제조/판매자의 재고 사정, 배송업체, 통관 문제 등으로 배송기간이 추가 지연될 수 있습니다.</li>
            <li>
              <strong>국내 택배 배송</strong><br />
              결제확인 후 2~3일의 배송기간이 소요됩니다.<br />
              상품은 택배발송 되며 배송비는 3,300원(부가세 포함)입니다.<br />
              국내 전지역(도서산간 포함) 중량/부피 상관없이 동일한 배송비가 선 결제됩니다.<br />
            </li>
            <li>
              <strong>해외 택배 배송</strong><br />
              결제확인 후 3~4일의 배송기간이 소요됩니다.<br />
              도매사이트의 특성 상, 사입 전 구매상품의 중량을 확인할 수 없기 때문에 총 상품금액의 일정 %를 배송비로 미리 선결제 받고 있으며 발송 전 정확한 중량이 확인되면 실 배송비가 책정됩니다.<br />
              책정된 실 배송비가 선결제하신 배송비보다 적을 경우, 차액은 주문 시 결제수단으로 자동 환불 처리해 드리고 있습니다.<br />
            </li>
          </ul>
        </section>
        {renderShippingPolicyCountry()}
      </div>
    );
  },
});
