import React, { PropTypes } from 'react';
//import { Link } from 'react-router';

export default React.createClass({
  /*propTypes: {

  },*/

  render() {
    const banners = [
      {'id' : 1, 'img' : 'http://g04.a.alicdn.com/kf/HTB1ZqKWKFXXXXaQXVXXq6xXFXXXE/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
      {'id' : 2, 'img' : 'http://g02.a.alicdn.com/kf/HTB1HsC.KFXXXXbSXpXXq6xXFXXXA/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
      {'id' : 3, 'img' : 'http://g02.a.alicdn.com/kf/HTB1Q5u.KFXXXXciXpXXq6xXFXXXY/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
      {'id' : 4, 'img' : 'http://g03.a.alicdn.com/kf/HTB1D02fKFXXXXXNXpXXq6xXFXXXL/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
      {'id' : 5, 'img' : 'http://g04.a.alicdn.com/kf/HTB1PGi0KFXXXXXvXVXXq6xXFXXXn/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
      {'id' : 6, 'img' : 'http://g01.a.alicdn.com/kf/HTB1HvDbKFXXXXaBXpXXq6xXFXXXG/2015-New-Autumn-Women-Dress-Zipper-Off-Shoulder-Long-Sleeve-Dresses-Sexy-Club-Evening-Party-Bodycon.jpg_640x640.jpg'},
    ];

    const bannerTop = banners.map((banner) => {
      return (
          <li key={banner.id}>
            <img src={banner.img} alt="product image" data-index={banner.id} />
          </li>
        );
    });

    const bannerBottom = banners.map((banner, index) => {
      if (index === 0) {
        return (<span className="current" key={banner.id}></span>);
      }
      else {
        return (<span key={banner.id}></span>);
      }
    });

    return (
      <section className="ms-detail-slider ms-slider">
        <div className="ms-viewport">
          <ul className="img-list ms-list">
            {bannerTop}
          </ul>
        </div>

        <div className="ms-points">
            {bannerBottom}
        </div>
        <span className="ms-add-wish">
            <span className="ms-icon icon-wishlist"></span>
        </span>
      </section>
    );
  },
});
