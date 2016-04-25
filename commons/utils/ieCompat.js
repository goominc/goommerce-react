// Copyright (C) 2016 Goom Inc. All rights reserved.

// http://nuli.navercorp.com/sharing/blog/post/792
exports.onCheckboxLabel = (elem) => {
  if (navigator.appVersion.indexOf('MSIE') !== -1) {
    elem.click();
  }
};
