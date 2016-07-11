// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    className: PropTypes.string,
    genLink: PropTypes.func,
    pageNum: PropTypes.string,
    pagination: PropTypes.object,
  },
  render() {
    const { className, pagination, genLink } = this.props;
    if (!pagination || !genLink) {
      return (<div></div>);
    }
    let { pageNum } = this.props;
    if (!pageNum) {
      pageNum = Math.floor(pagination.offset / pagination.limit) + 1;
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
    if (start === 2) {
      start--;
    }
    if (end === pageCnt - 1) {
      end++;
    }
    const renderFirst = () => {
      if (start > 1) {
        const res = [];
        res.push(
          <Link key="page-first" to={genLink(1)}>
            <div className="page-button">1</div>
          </Link>
        );
        res.push(<span key="page-first-dot">...</span>);
        return res;
      }
      return '';
    };
    const renderLast = () => {
      if (end < pageCnt) {
        const res = [];
        res.push(<span key="page-last-dot">...</span>);
        res.push(
          <Link key="page-last" to={genLink(pageCnt)}>
            <div className="page-button">{pageCnt}</div>
          </Link>
        );
        return res;
      }
      return '';
    };
    const renderButton = (i) => {
      if (i === Number(pageNum)) {
        return (
          <div key={i} className="page-button active">{i}</div>
        );
      }
      return (
        <Link key={i} to={genLink(i)}>
          <div className="page-button">{i}</div>
        </Link>
      );
    };
    return (
      <div className={className}>
        {renderFirst()}
        {_.range(start, end + 1).map(renderButton)}
        {renderLast()}
      </div>
    );
  },
});
