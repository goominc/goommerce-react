// Copyright (C) 2016 Goom Inc. All rights reserved.

const format = (number) => {
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
      res = `,${numToString(number % 1000, 3)}${res}`;
    } else {
      res = `${number}${res}`;
    }
    number = Math.floor(number / 1000);
  }
  return `${sign}${res}`;
};

exports.format = format;

const formatPrice = (price, currency, currencySign) => {
  if (currency === 'KRW') {
    return `${format(price)}원`;
  }
  return `${currencySign[currency]} ${price}`;
};

exports.formatPrice = formatPrice;

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
