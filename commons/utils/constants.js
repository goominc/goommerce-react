// Copyright (C) 2016 Goom Inc. All rights reserved.

// 2016. 04. 08. [heekyu] this is client only config
const resourceRoot = '//d3f03u7lex6hmc.cloudfront.net/front/resource';
const constants = {
  resourceRoot,
  currencies: [
    { name: 'KRW', sign: '￦', img: `${resourceRoot}/header/money-krw.png` },
    { name: 'USD', sign: '$', img: `${resourceRoot}/header/money-usd.png` },
    { name: 'CNY', sign: '￥', img: `${resourceRoot}/header/money-cny.png` },
  ],
  areaCodes: [
    { img: `${resourceRoot}/main/country-kor.png`, name: 'Korea', number: '+82' },
    { img: `${resourceRoot}/main/country-china.png`, name: 'China', number: '+86' },
    { img: `${resourceRoot}/main/country-china.png`, name: 'Hongkong', number: '+886' },
    /*
     { img: `${constants.resourceRoot}/main/country-england.png`, name: 'United Kingdom', number: '+214' },
     { img: `${constants.resourceRoot}/main/country-usa.png`, name: 'Newyork', number: '+615' },
     */
    { img: `${resourceRoot}/main/country-taiwan.png`, name: 'Taiwan', number: '+423' },
  ],
};

exports.constants = constants;
