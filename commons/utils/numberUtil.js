// Copyright (C) 2016 Goom Inc. All rights reserved.

exports.format = (number) => {
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
      res = `,${numToString(number % 1000, 3)}`;
    } else {
      res = `${number}${res}`;
    }
    number = Math.floor(number / 1000);
  }
  return `${sign}${res}`;
};
