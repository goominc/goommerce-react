// Copyright (C) 2016 Goom Inc. All rights reserved.

import i18n from 'commons/utils/i18n';

exports.getName = (brand) => {
  const data = brand && brand.data;
  if (!data) {
    return '';
  }

  const name = data.name && i18n.get(data.name);
  if (!name) {
    return '';
  }

  const buildingName = data.building && data.building.name;
  if (buildingName) {
    return `[${buildingName}] ${name}`;
  }
  return name;
};
