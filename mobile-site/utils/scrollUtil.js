// Copyright (C) 2016 Goom Inc. All rights reserved.

exports.incrementalFetch = (doFetch) => {
  $(window).scroll(() => {
    let bottom = $(document).height();
    const fotterTop = $('.footer-linkshops').offset().top;
    if (fotterTop > 500) {
      bottom = fotterTop;
    }
    if ($(window).scrollTop() + window.innerHeight >= bottom) {
      doFetch();
    }
  });
};
