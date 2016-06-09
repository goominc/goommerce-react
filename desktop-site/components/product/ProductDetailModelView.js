// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    model: PropTypes.object,
  },
  render() {
    const { model } = this.props;
    // `${constants.resourceRoot}/banner/models/model_ys.png`
    return (
      <div className="product-detail-model-view">
        <div className="row">
          <div className="pic1"><img src={model.imgUrl} /></div>
          <div className="size">
            <div className="title">{i18n.get('pcItemDetail.modelChartTitle')} ({model.name})</div>
            <table>
              <tbody>
              <tr>
                <td className="key">{i18n.get('pcItemDetail.modelShoulderWidth')}</td>
                <td>{model.shoulderWidth}</td>
                <td className="key">{i18n.get('pcItemDetail.modelTopsLength')}</td>
                <td>{model.topsLength}</td>
              </tr>
              <tr>
                <td className="key">{i18n.get('pcItemDetail.modelBottomsLength')}</td>
                <td>{model.bottomslength}</td>
                <td className="key">{i18n.get('pcItemDetail.modelWaist')}</td>
                <td>{model.waist}</td>
              </tr>
              <tr>
                <td className="key">{i18n.get('pcItemDetail.modelArmLength')}</td>
                <td>{model.armLength}</td>
                <td className="key">{i18n.get('pcItemDetail.modelTopBustSize')}</td>
                <td>{model.topBustSize}</td>
              </tr>
              <tr>
                <td className="key">{i18n.get('pcItemDetail.modelBottomBustSize')}</td>
                <td>{model.bottomBustSize}</td>
                <td className="key">{i18n.get('pcItemDetail.modelHipSize')}</td>
                <td>{model.hipSize}</td>
              </tr>
              <tr>
                <td className="key">{i18n.get('pcItemDetail.modelShoesSize')}</td>
                <td>{model.ShoesSize}</td>
                <td className="key"></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
});
