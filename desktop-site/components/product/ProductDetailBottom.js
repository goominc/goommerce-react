// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import ProductDetailModelView from './ProductDetailModelView';

import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';
import { models, productDetailAttributes } from 'commons/data';

export default React.createClass({
  propTypes: {
    images: PropTypes.array,
    product: PropTypes.object,
    sizes: PropTypes.array,
  },
  render() {
    const { product, sizes, images } = this.props;
    const renderSizesTable = () => {
      if (!sizes.length) {
        return null;
      }
      const kind = _.get(product, 'data.detail.kind');
      if (!productDetailAttributes[kind]) {
        return null;
      }
      const baseIndex = Math.floor(sizes.length / 2);
      const renderSize = (size, index) => {
        const res = [<td key={`${size}-${index}`}>{size}</td>];
        for (let i = 0; i < productDetailAttributes[kind].length; i++) {
          res.push(
            <td key={`${size}-size-${i}`}>{(+_.get(product, `data.detail.size${i + 1}`) + (index - baseIndex) * 2) || 0}cm</td>
          );
        }
        return <tr>{res}</tr>;
      };
      return (
        <table className="size-table">
          <thead>
          <tr>
            <th>{i18n.get('pcItemDetail.detailSize')}</th>
            {productDetailAttributes[kind].map((attr) => <th>{i18n.get(attr)}</th>)}
          </tr>
          </thead>
          <tbody>
          {sizes.map(renderSize)}
          </tbody>
        </table>
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
    const renderImages = () => {
      if (!images || !images.length) {
        return null;
      }
      const res = [];
      let row = 0;
      let imageIndex = 0;
      const productImageCount = (_.get(product, 'appImages.default') || []).length;
      const isOddCount = productImageCount && productImageCount % 2 === 1;
      while (imageIndex < images.length) {
        if ((isOddCount && row === 1) || imageIndex === images.length - 1) {
          res.push(
            <div key={`detail-image-row-${row}`} className="image-row">
              <div className="img-center"><img src={images[imageIndex++].url} /></div>
            </div>
          );
        } else {
          res.push(
            <div key={`detail-image-row-${row}`} className="image-row">
              <div className="img-left"><img src={images[imageIndex++].url} /></div>
              <div className="img-right"><img src={images[imageIndex++].url} /></div>
            </div>
          );
        }
        row++;
      }
      return res;
    };
    const renderModel = () => {
      for (let i = 0; i < models.length; i++) {
        const model = models[i];
        if (_.get(product, 'data.detail.modelName') === model.name) {
          return <ProductDetailModelView model={model} />;
        }
      }
      return null;
    };

    return (
      <div className="product-detail-bottom-container">
        <div className="title">{i18n.get('pcItemDetail.bottomTitle')}</div>
        {renderSizesTable()}
        {renderDetailInfo()}
        {renderImages()}
        {renderModel()}
        <div className="simple-desc">
          <div className="left">{i18n.get('pcItemDetail.descRefundTitle')}</div>
          <div className="right">
            - {i18n.get('pcItemDetail.descRefund1')}<br />
            - {i18n.get('pcItemDetail.descRefund2')}<br />
            - {i18n.get('pcItemDetail.descRefund3')}<br />
            - {i18n.get('pcItemDetail.descRefund4')}<br />
            - {i18n.get('pcItemDetail.descRefund5')}<br />
            - {i18n.get('pcItemDetail.descRefund6')}<br />
          </div>
        </div>
        <div className="simple-desc">
          <div className="left">{i18n.get('pcItemDetail.descDelayTitle')}</div>
          <div className="right">
            - {i18n.get('pcItemDetail.descDelay1')}<br />
            - {i18n.get('pcItemDetail.descDelay2')}<br />
            - {i18n.get('pcItemDetail.descDelay3')}<br />
          </div>
        </div>
      </div>
    );
  },
});
