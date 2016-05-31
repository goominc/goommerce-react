// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const getCmsKey = (locale) => {
  let suffix = '_ko';
  if (locale === 'zh-cn' || locale === 'zh-tw') {
    suffix = '_zh-cn';
  }
  return `desktop_site_keywords${suffix}`;
};

const ServiceInfoContainer = React.createClass({
  propTypes: {
    cmsData: PropTypes.object,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  componentDidMount() {
    this.context.ApiAction.loadCMSData(getCmsKey('ko'));
    this.context.ApiAction.loadCMSData(getCmsKey('zh-cn'));
  },
  componentWillUpdate() {
    this.adjustScrollPosition();
  },
  adjustScrollPosition() {
    const { params } = this.props;
    if (params.section) {
      setTimeout(() => {
        // 2016. 04. 20. [heekyu] there is timing issue
        const offset = $(`#${params.section}`).offset();
        if (offset) {
          $('body').scrollTop(offset.top);
          // 2016. 04. 26. [heekyu] for IE
          document.documentElement.scrollTop = offset.top;
        }
      }, 10);
    }
  },
  render() {
    const { cmsData } = this.props;
    if (cmsData) {
      return <div dangerouslySetInnerHTML={({ __html: cmsData.data })} />;
    }
    return <div></div>;
  },
});

export default connect(
  (state) => {
    return { cmsData: state.cms[getCmsKey(state.i18n.activeLocale)] };
  }
)(ServiceInfoContainer);
