// Copyright (C) 2016 Goom Inc. All rights reserved.
import Decimal from 'decimal.js-light';

const format = (number) => {
  if (+number === 0) {
    return '0';
  }
  let res = '';
  let sign = '';
  if (number < 0) {
    sign = '-';
    number = -number;
  }
  const numToString = (num, zeros) => {
    let mul = 10;
    while (zeros > 0) {
      if (num < mul) {
        return `${Array(zeros).join('0')}${num}`;
      }
      zeros--;
      mul *= 10;
    }
    return num;
  };
  while (number > 0) {
    if (number >= 1000) {
      const mod = new Decimal(number).mod(1000).toNumber();
      res = `,${numToString(mod, 3)}${res}`;
    } else {
      res = `${number}${res}`;
    }
    number = new Decimal(number).divToInt(1000).toNumber();
  }
  return `${sign}${res}`;
};

exports.format = format;

const formatPrice = (price, currency, currencySign) => {
  if (currency === 'KRW') {
    return `${format(price)}원`;
  }
  return `${currencySign[currency]} ${price || 0}`;
};

exports.formatPrice = formatPrice;

exports.calcProductVariantTotalPrice = (variant, quantity, cur) => {
  const pricePerUnit = +variant.productVariant[cur];
  return pricePerUnit &&
    new Decimal(pricePerUnit).mul(quantity || 0).toFixed(cur === 'KRW' ? 0 : 2);
};

const formatDate = (date, isDateOnly) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const yyyy = date.getFullYear().toString();
  function appendLeadingZeroIfNeeded(str) {
    if (str[1]) {
      return str;
    }
    return `0${str}`;
  }
  const mm = appendLeadingZeroIfNeeded((date.getMonth() + 1).toString()); // getMonth() is zero-based
  const dd = appendLeadingZeroIfNeeded(date.getDate().toString());
  if (isDateOnly) {
    return `${yyyy}-${mm}-${dd}`;
  }

  const HH = appendLeadingZeroIfNeeded(date.getHours().toString());
  const MM = appendLeadingZeroIfNeeded(date.getMinutes().toString());
  const SS = appendLeadingZeroIfNeeded(date.getSeconds().toString());
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
};

exports.formatDate = formatDate;

exports.formatDateKor = (date) => {
  const d = formatDate(date, true);
  const split = d.split('-');
  return `${split[0]}년 ${split[1]}월 ${split[2]}일`;
};

exports.validateNumberInput = (val, maxLen) => {
  if (val.length > maxLen) {
    return false;
  }
  for (let i = 0; i < val.length; i++) {
    if (val[i] < '0' || val[i] > '9') {
      return false;
    }
  }
  return true;
};
