// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import OwlCarousel from 'react-owl-carousel';

export default React.createClass({
  propTypes: {
    items: PropTypes.array,
  },
  render() {
    const { items } = this.props;
    if (!items) {
      return <div></div>;
    }
    const settings = {
      slideSpeed: 300,
      autoPlay: 5000,
      singleItem: true,
      scrollPerPage: true,
    };
    const renderBanner = (item, index) => {
      if (item.link) {
        return <Link key={`main-banner-${index}`} to={item.link}><img src={item.image.url} /></Link>;
      }
      return <img key={`main-banner-${index}`} src={item.image.url} />;
    };
    return (
      <section id="key-visual" className="key-visual">
        <OwlCarousel {...settings} id="kv-container">
          {items.map(renderBanner)}
        </OwlCarousel>
      </section>
    );
  },
});
