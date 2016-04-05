// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

import i18n from 'commons/utils/i18n';

const brandName = (brand) => {
  const name = brand && brand.name;
  if (!name) {
    return '';
  }

  return name && i18n.get(name);
};

exports.getName = (brand) => {
  // format: '[Building] Name'
  const name = brandName(brand);
  if (!name) {
    return '';
  }

  const data = brand && brand.data;

  const buildingName = data.building && data.building.name;
  if (buildingName) {
    return `[${buildingName}] ${name}`;
  }
  return name;
};

exports.getNameWithAllBuildingInfo = (brand) => {
  // format: 'Name (Building Floor FlatNumber)'
  const name = brandName(brand);
  if (!name) {
    return '';
  }
  return `${name} (${_.get(brand, 'data.building.name')} ${_.get(brand, 'data.building.floor')} ${_.get(brand, 'data.building.flatNumber')}호)`; // eslint-disable-line
};
