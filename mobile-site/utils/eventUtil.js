// Copyright (C) 2016 Goom Inc. All rights reserved.

// http://stackoverflow.com/questions/13234971/simulate-click-on-select-element-with-jquery
exports.simulateOpen = (elem) => {
  if (document.createEvent) {
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elem[0].dispatchEvent(e);
  } else if (element.fireEvent) {
    elem[0].fireEvent('onmousedown');
  }
};
