// Copyright (C) 2016 Goom Inc. All rights reserved.

// http://www.w3schools.com/js/js_cookies.asp
exports.set = (key, value, exdays) => {
  let cookie = `${key}=${value}`;
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    cookie += "; expires="+d.toUTCString();
  }
  document.cookie = cookie;
};

exports.get = (key) => {
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i];
    let j = 0;
    while (j < c.length && c[j] === ' ') {
      j++;
    }
    let m = 0;
    while (j < c.length && m < key.length && c[j] === key[m]) {
      m++;
      j++;
    }
    if (m === key.length && c[j] === '=') {
      return c.substring(j + 1);
    }
  }
  return '';
};

exports.reset = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
