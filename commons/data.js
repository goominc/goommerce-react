// Copyright (C) 2016 Goom Inc. All rights reserved.

import { constants } from 'commons/utils/constants';

exports.productDetailAttributes = {
  '상의': ['pcItemDetail.detailLength', 'pcItemDetail.detailBustSize', 'pcItemDetail.detailShoulderWidth', 'pcItemDetail.detailArmLength', 'pcItemDetail.detailArmHole', 'pcItemDetail.detailTailEdge'], // eslint-disable-line
  '바지': ['pcItemDetail.detailLength', 'pcItemDetail.detailWaistWidth', 'pcItemDetail.detailHipSize', 'pcItemDetail.detailThighSize', 'pcItemDetail.detailTailEdge', 'pcItemDetail.detailTailAbove'], // eslint-disable-line
  '치마': ['pcItemDetail.detailLength', 'pcItemDetail.detailWaistWidth', 'pcItemDetail.detailHipSize'], // eslint-disable-line
  '원피스': ['pcItemDetail.detailLength', 'pcItemDetail.detailBustSize', 'pcItemDetail.detailShoulderWidth', 'pcItemDetail.detailWaistWidth', 'pcItemDetail.detailArmHole', 'pcItemDetail.detailTailEdge'], // eslint-disable-line
};

exports.models = [
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
