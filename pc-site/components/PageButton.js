// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    pageNum: PropTypes.string,
    pagination: PropTypes.object,
    genLink: PropTypes.func,
  },
  render() {
    const { pageNum, pagination, genLink } = this.props;
    if (!pagination || !genLink) {
      return (<div></div>);
    }
    const beforeCnt = 2;
    const totalCnt = 7;
    const pageCnt = Math.ceil(pagination.total / pagination.size);
    const start = Math.max(0, Math.min(pageNum - 1 - beforeCnt, pageCnt - totalCnt)) + 1;
    const end = Math.min(pageCnt, start + totalCnt) + 1;
    const renderButton = (i) => {
      if (i === Number(pageNum)) {
        return (
          <div key={i} className="page-button active">{i}</div>
        );
      }
      return (
        <Link to={genLink(i)} key={i}>
          <div className="page-button">{i}</div>
        </Link>
      );
    };
    return (
      <div className="page-button-line">
        {_.range(start, end).map(renderButton)}
      </div>
    );
  },
});
