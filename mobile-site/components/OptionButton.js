import React, { PropTypes } from 'react';
export default React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return { scrollTop: 0 };
  },
  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  },
  getPathName() {
    const uri = window.location.pathname.substring(1);
    const pathName = uri.substring(0, uri.indexOf('/'));
    if (uri === 'cart') {
      return uri;
    }
    if (pathName === 'orders') {
      return pathName;
    }
    return '';
  },
  goTop() {
    $('body').animate({ scrollTop: 0 }, 500);
  },
  scroll() {
    const scrollTop = $('body').scrollTop();
    let isShow;
    if (scrollTop > 0) {
      isShow = true;
    } else {
      isShow = false;
    }
    if (this.state.isShow !== isShow) {
      this.setState({ isShow });
    }
  },
  render() {
    if (!this.state.isShow) {
      return null;
    }
    const pathName = this.getPathName();
    return (
      <a className={`go-top ${pathName} active`} onClick={this.goTop}></a>
    );
  },
});
