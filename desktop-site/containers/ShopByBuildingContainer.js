// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import BuildingList from 'components/building/BuildingList';
import BuildingInfo from 'components/building/BuildingInfo';
import Breadcrumb from 'components/Breadcrumb';
import i18n from 'commons/utils/i18n';

import loadEntities from 'commons/redux/util/loadEntities';

import { constants } from 'commons/utils/constants';

const ShopByBuildingContainer = React.createClass({
  propTypes: {
    buildings: PropTypes.array,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadBuildings();
  },
  render() {
    const { buildings } = this.props;
    if (!buildings) {
      return <div></div>;
    }
    /*
    const buildings = [
      { name: '에이피엠', key: 'apm', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '에이피엠 럭스', key: 'apm_lux', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '누죤', key: 'nuzzon', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '디자이너 크럽', key: 'designer_club', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '벨포스트', key: 'belpost', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '유어스', key: 'yours', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '퀸스 스퀘어', key: 'queens_square', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '테그노', key: 'techno', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '신발상가 A 동', key: 'shoes_A', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '신발상가 B 동', key: 'shoes_B', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '신발상가 C 동', key: 'shoes_C', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '신발상가 D 동', key: 'shoes_D', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
      { name: '청평화', key: 'blue', img: `${constants.resourceRoot}/banner/buildings/build_apm01.jpg` },
    ];
    */
    const buildingImages = {
      'APM': `${constants.resourceRoot}/banner/buildings/build_apm02.jpg`,
      'APM LUXE': `${constants.resourceRoot}/banner/buildings/build_apmluxe01.jpg`,
      '누죤': `${constants.resourceRoot}/banner/buildings/build_nuzzon01.jpg`,
      '디자이너 크럽': `${constants.resourceRoot}/banner/buildings/build_dclub01.jpg`,
      '벨포스트': `${constants.resourceRoot}/banner/buildings/build_belpost01.jpg`,
      '유어스': `${constants.resourceRoot}/banner/buildings/build_uus01.jpg`,
      '퀸스 스퀘어': `${constants.resourceRoot}/banner/buildings/build_queens01.jpg`,
      '디오뜨': `${constants.resourceRoot}/banner/buildings/build_theot01.jpg`,
      '신발상가': `${constants.resourceRoot}/banner/buildings/build_shoes01.jpg`,
      '청평화': `${constants.resourceRoot}/banner/buildings/build_cph01.jpg`,
    };
    buildings.forEach((b) => {
      const name = b.name.ko;
      if (name.startsWith('신발상가')) {
        b.img = buildingImages['신발상가'];
        return;
      }
      b.img = buildingImages[name] || `${constants.resourceRoot}/banner/buildings/default_building_20160505.jpg`;
    });
    const buildingId = +_.get(this.props, 'params.buildingId');
    const path = [{ link: '/', name: { en: 'Home', ko: '홈' } }];
    let activeBuildingObj;
    if (buildingId) {
      for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].id === buildingId) {
          activeBuildingObj = buildings[i];
          break;
        }
      }
    }
    const renderMenuItem = (buildingItem) => {
      console.log(buildingItem);
      const name = buildingItem.name.ko;
      const cnt = buildingItem.allProductCount;
      const key = `building-${buildingItem.id}`;
      if (buildingItem && buildingItem.id === buildingId) {
        return <div key={key} className="item active">{name} <span>({cnt})</span></div>;
      }
      return (
        <Link key={key} to={`/shops/buildings/${buildingItem.id}`} className="item">{name} <span>({cnt})</span></Link>
      );
    };
    let contents;
    if (activeBuildingObj) {
      path.push({ link: '/shops/buildings', name: { en: 'All Buildings', ko: '모든 빌딩' } });
      contents = <BuildingInfo building={activeBuildingObj} />;
    } else {
      contents = <BuildingList buildings={buildings} />;
    }
    return (
      <div className="building-list-container">
        <Breadcrumb path={path} />
        <div className="left-bar">
            <div className="title">{i18n.get('pcFooter.byBuilding')} : <Link to="/shops/buildings"><strong>{i18n.get('pcFooter.dongdaemun')}</strong></Link></div>
          {buildings.map(renderMenuItem)}
        </div>
        {contents}
      </div>
    );
  },
});

export default connect(
  (state) => {
    return { ...loadEntities(state, 'buildings', 'buildings') };
  }
)(ShopByBuildingContainer);
