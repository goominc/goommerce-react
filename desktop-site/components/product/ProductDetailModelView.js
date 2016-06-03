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
            <div className="pd_title2">{i18n.get('pcItemDetail.modelChartTitle')}</div>
            <div className="subject odd">{i18n.get('word.name')}</div><div className="model_name odd">{model.name}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelHeight')}</div><div className="cont">{model.height}</div>
            <div className="subject odd">{i18n.get('pcItemDetail.modelWeight')}</div><div className="cont odd">{model.weight}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelShoulderWidth')}</div><div className="cont">{model.shoulderWidth}</div>
            <div className="subject odd">{i18n.get('pcItemDetail.modelTopsLength')}</div><div className="cont odd">{model.topsLength}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelBottomsLength')}</div><div className="cont">{model.bottomslength}</div>
            <div className="subject odd">{i18n.get('pcItemDetail.modelWaist')}</div><div className="cont odd">{model.waist}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelArmLength')}</div><div className="cont">{model.armLength}</div>
            <div className="subject odd">{i18n.get('pcItemDetail.modelTopBustSize')}</div><div className="cont odd">{model.topBustSize}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelBottomBustSize')}</div><div className="cont">{model.topBustSize}</div>
            <div className="subject odd">{i18n.get('pcItemDetail.modelHipSize')}</div><div className="cont odd">{model.hipSize}</div>
            <div className="subject">{i18n.get('pcItemDetail.modelShoesSize')}</div><div className="cont">{model.ShoesSize}</div>
          </div>
        </div>
      </div>
    );
  },
});
