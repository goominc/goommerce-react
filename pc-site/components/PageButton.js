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
    const pageCnt = Math.ceil(pagination.total / pagination.limit);
    if (pageCnt < 2) {
      // 2016. 02. 28. [heekyu] do not show if only one page
      return (<div></div>);
    }
    const beforeCnt = 2;
    const totalCnt = 7;
    let start = Math.max(0, Math.min(pageNum - 1 - beforeCnt, pageCnt - totalCnt)) + 1;
    let end = Math.min(pageCnt, start + totalCnt - 1);
    if (start === 2) start--;
    if (end === pageCnt - 1) end++;
    const renderFirst = () => {
      if (start > 1) {
        const res = [];
        res.push(
          <div className="page-button">1</div>
        );
        res.push(<span>...</span>);
        return res;
      }
    };
    const renderLast = () => {
      if (end < pageCnt) {
        const res = [];
        res.push(<span>...</span>);
        res.push(
          <div className="page-button">{pageCnt}</div>
        );
        return res;
      }
    };
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
        {renderFirst()}
        {_.range(start, end + 1).map(renderButton)}
        {renderLast()}
      </div>
    );
  },
});
