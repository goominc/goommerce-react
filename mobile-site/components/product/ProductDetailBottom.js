// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    product: PropTypes.object,
    sizes: PropTypes.array,
  },
  render() {
    const { product, sizes } = this.props;
    const renderSizes = () => {
      if (!sizes || !sizes.length) {
        return null;
      }
      const baseIndex = Math.floor(sizes.length / 2);
      const rows = [
        i18n.get('pcItemDetail.detailLength'),
        i18n.get('pcItemDetail.detailBustSize'),
        i18n.get('pcItemDetail.detailShoulderWidth'),
        i18n.get('pcItemDetail.detailArmLength'),
        i18n.get('pcItemDetail.detailArmHole'),
        i18n.get('pcItemDetail.detailTailEdge'),
      ];
      const columnWidth = 70 / sizes.length;
      console.log(product);
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
      </div>
    );
  },
});
