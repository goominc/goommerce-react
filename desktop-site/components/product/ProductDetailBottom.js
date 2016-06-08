// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import ProductDetailModelView from './ProductDetailModelView';

import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';
import { productDetailAttributes } from 'commons/data';

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
    const renderImages = () => {
      const res = [];
      let row = 0;
      let imageIndex = 0;
      while (imageIndex < images.length) {
        if (row === 1 || imageIndex === images.length - 1) {
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
      const models = [
        {
          imgUrl: `${constants.resourceRoot}/banner/models/model_eun.png`,
          name: '이은지',
          height: '168 cm',
          weight: '48 kg',
          shoulderWidth: '40 cm',
          topsLength: '47 cm',
          bottomslength: '96 cm',
          waist: '26.7 inch',
          armLength: '65 cm',
          topBustSize: '80 cm',
          bottomBustSize: '68.5 cm',
          hipSize: '89 cm',
          ShoesSize: '235 cm',
        },
        {
          imgUrl: `${constants.resourceRoot}/banner/models/model_sori.png`,
          name: '임소리',
          height: '167 cm',
          weight: '47 kg',
          shoulderWidth: '40 cm',
          topsLength: '48 cm',
          bottomslength: '97 cm',
          waist: '23 inch',
          armLength: '63 cm',
          topBustSize: '79 cm',
          bottomBustSize: '69 cm',
          hipSize: '88 cm',
          ShoesSize: '235 cm',
        },
        {
          imgUrl: `${constants.resourceRoot}/banner/models/model_ys.png`,
          name: '유영석',
          height: '182 cm',
          weight: '64 kg',
          shoulderWidth: '53 cm',
          topsLength: '57 cm',
          bottomslength: '105 cm',
          waist: '29 inch',
          armLength: '63 cm',
          topBustSize: '94 cm',
          bottomBustSize: '94 cm',
          hipSize: '96 cm',
          ShoesSize: '260 cm',
        },
      ];
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
