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

  const buildingName = _.get(data, 'location.building.name.ko');
  if (buildingName) {
    return `[${buildingName}] ${name}`;
  }
  return name;
};

const getBuildingInfo = (brand) =>
  `${_.get(brand, 'data.location.building.name.ko')} ${_.get(brand, 'data.location.floor')} ${_.get(brand, 'data.location.flatNumber')}호`; // eslint-disable-line

exports.getBuildingInfo = getBuildingInfo;

exports.getNameWithAllBuildingInfo = (brand) => {
  // format: 'Name (Building Floor FlatNumber)'
  const name = brandName(brand);
  if (!name) {
    return '';
  }
  return `${name} (${getBuildingInfo(brand)})`;
};

exports.countProducts = (brand) => {
  let count = 0;
  for (let i = 0; i < brand.products.length; i++) {
    count += brand.products[i].productVariants.length;
  }
  return count;
}
