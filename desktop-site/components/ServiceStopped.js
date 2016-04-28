// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="service-stopped-container">
        <img src={`${constants.resourceRoot}/banner/service_stopped_160428.jpg`} />
      </div>
    );
  },
});
