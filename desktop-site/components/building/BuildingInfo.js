// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import stringUtil from 'commons/utils/stringUtil';

export default React.createClass({
  propTypes: {
    building: PropTypes.object,
  },
  render() {
    const { building } = this.props;
    const renderTitle = () => (
      <div key={`item-${building.name.ko}`} className="title-box">
        <img src={building.img} />
        <div className="content-box">
          <div className="content-title">{building.name.ko}</div>
          <div className="content-body">
            <p><label>건물주소 :</label> {_.get(building, 'data.address')}</p>
            <p><label>영업시간 :</label> {_.get(building, 'data.businessHour')}</p>
            <p><label>휴무일 :</label> {_.get(building, 'data.holiday')}</p>
            <p><label>대표전화 :</label> {_.get(building, 'data.tel')}</p>
            <div dangerouslySetInnerHTML={({ __html: _.get(building, 'data.description') })} />
          </div>
        </div>
      </div>
    );
    const renderBrand = (brand) => {
      let content;
      if (brand.productCount > 0) {
        content = <Link to={`/categories/all?brandId=${brand.id}`}>{stringUtil.shorten(_.get(brand, 'name.ko'), 13)}</Link>;
      } else {
        content = stringUtil.shorten(_.get(brand, 'name.ko'), 13);
      }
      return (
        <div key={brand.id} className="floor-shop-item">
          <div className="label">{_.get(brand, 'data.location.floor')} {_.get(brand, 'data.location.flatNumber')}</div>
          <div className="control">{content} {brand.productCount ? `(${brand.productCount})` : ''}</div>
        </div>
      );
    };
    const renderFloor = (floor) => (
      <div key={floor.floor} className="floor-info-container">
        <div className="floor-title">{floor.floor}</div>
        <div className="floor-shops-container">
          {(floor.flats || []).map(renderBrand)}
        </div>
      </div>
    );
    return (
      <div className="right-bar-detail">
        {renderTitle()}
        {building.floors.map(renderFloor)}
      </div>
    );
  },
});
