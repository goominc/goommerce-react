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
};

exports.constants = constants;
