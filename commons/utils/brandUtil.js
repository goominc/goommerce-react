// Copyright (C) 2016 Goom Inc. All rights reserved.

import i18n from 'commons/utils/i18n';

exports.getName = (brand) => `[${brand.data.building.name}] ${i18n.get(brand.data.name)}`;
