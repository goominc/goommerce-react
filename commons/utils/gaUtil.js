// Copyright (C) 2016 Goom Inc. All rights reserved.

exports.initGa = (store, history) => {
  if (window.gaid) {
    const ga = require('react-ga');
    const options = { debug: false };
    ga.initialize(window.gaid, options);
    history.listen((location) => {
      const auth = store.getState().auth;
      if (auth) {
        // 2016. 04. 19. [heekyu] TODO remove common logic
        for (var i = 0; i < (auth.roles || []).length; i++) { // eslint-disable-line
          const role = auth.roles[i];
          if (role.type === 'admin') {
            return;
          }
        }
      }
      ga.pageview(location.pathname);
    });
  }
};
