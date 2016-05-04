// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    buildings: PropTypes.array,
  },
  render() {
    const { buildings } = this.props;
    const renderRightBar = () => {
      const res = [];
      const renderItem = (building) => (
        <div key={`item-${building.name.ko}`} className="item-box">
          <img src={building.img} />
          <div className="content-box">
            <div className="content-title">{building.name.ko}</div>
            <div className="content-body">
              {_.get(building, 'data.address')}<br />
              {_.get(building, 'data.businessHour')}<br />
              {_.get(building, 'data.holiday')}<br />
              {_.get(building, 'data.tel')}<br />
            </div>
          </div>
          <Link to={`/shops/buildings/${building.id}`} className="show-detail">
            매장 보기
          </Link>
        </div>
      );
      for (let i = 0; i < buildings.length; i += 3) {
        res.push(
          <div key={`item-line-${i}`} className="item-line">
            {renderItem(buildings[i])}
            {i + 1 < buildings.length ? renderItem(buildings[i + 1]) : null}
            {i + 2 < buildings.length ? renderItem(buildings[i + 2]) : null}
          </div>
        );
      }
      return res;
    };
    return (
      <div className="right-bar">
        {renderRightBar()}
      </div>
    );
  },
});
