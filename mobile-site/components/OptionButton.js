import React from 'react';

export default React.createClass({
  getInitialState() {
    return { scrollTop: 0 };
  },
  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  },
  scroll() {
    this.setState({ scrollTop: $('body').scrollTop() });
  },
  goTop() {
    $('body').animate({ scrollTop: 0 }, 500);
  },
  render() {
    const scrollTop = this.state.scrollTop;
    return (
      <a className={`go-top ${scrollTop ? 'active' : ''}`} onClick={this.goTop}></a>
    );
  },
});
