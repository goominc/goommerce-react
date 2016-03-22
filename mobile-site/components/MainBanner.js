import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  componentDidMount() {
    $('.kv-container').owlCarousel({ autoPlay: 10000, items: 1 });
  },

  render() {
    const banners = [
      { id: 1, link: '/', img: 'http://g02.a.alicdn.com/kf/HTB11oA1LpXXXXaXXVXXq6xXFXXXv.jpg' },
      { id: 2, link: '/', img: 'http://gtms01.alicdn.com/tps/i1/TB1ITVJLFXXXXcPXpXXsQ7K0FXX-640-296.jpg' },
      { id: 3, link: '/', img: 'http://gtms02.alicdn.com/tps/i2/TB1LbrFLFXXXXaAapXXsQ7K0FXX-640-296.jpg' },
    ];

    const bannerTop = banners.map((banner) =>
        <div className="kv-item" key={banner.id}>
            <Link rel="nofollow" to={banner.link}>
                <img src={banner.img} />
            </Link>
        </div>
    );

    return (
      <section id="key-visual" className="key-visual">
        <div id="kv-container" className="kv-container">
          {bannerTop}
        </div>
      </section>
    );
  },
});
