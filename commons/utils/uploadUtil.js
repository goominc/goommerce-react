// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

exports.uploadFile = (localUrl, cb) => {
  $.ajax({
    url: 'https://api.cloudinary.com/v1_1/linkshops/image/upload',
    type: 'POST',
    data: { file: localUrl, upload_preset: 'xbr0q85r' },
    success: (res) => {
      const result = {
        url: res.url.substring(5),
        publicId: res.public_id,
        version: res.version,
        mainImage: false,
      };
      cb(result);
    },
    error: (res) => {
      window.alert(_.get(res, 'error.message') || 'upload fail');
    },
  });
};
