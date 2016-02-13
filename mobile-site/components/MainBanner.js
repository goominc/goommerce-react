import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  /*propTypes: {

  },*/

  render() {
    const banners = [
      {'id' : 1, 'link' : '/', 'img' : 'http://g02.a.alicdn.com/kf/HTB11oA1LpXXXXaXXVXXq6xXFXXXv.jpg'},
      {'id' : 2, 'link' : '/', 'img' : 'http://gtms01.alicdn.com/tps/i1/TB1ITVJLFXXXXcPXpXXsQ7K0FXX-640-296.jpg'},
    ];

    const bannerTop = banners.map((banner) => {
      return (
          <div className="kv-item" key={banner.id}>
              <Link rel="nofollow" to={banner.link}>
                  <img src={banner.img} />
              </Link>
          </div>
        );
    });

    const bannerBottom = banners.map((banner) => {
      return (
          <span className="kv-selector" key={banner.id}>
          </span>
        );
    });

    return (
      <section id="key-visual" className="key-visual">
        <div id="kv-container" className="kv-container">
          {bannerTop}
        </div>
        <div id="kv-tab" className="kv-tab clearfix">
          {bannerBottom}
        </div>
      </section>
    );
  },
});
