import React, { PropTypes } from 'react';
import _ from 'lodash';

import OwlCarousel from 'react-owl-carousel';

export default React.createClass({
  propTypes: {
    addWish: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
  },
  shouldComponentUpdate(nextProps) {
    if (!this.props.addWish) {
      return true;
    }
    return !_.isEqual(this.props.images, nextProps.images);
  },
  handleAddWish() {
    // TODO check wishlist & remove wish item
    const promise = this.props.addWish();
    if (promise) {
      promise.then(() => {
        $('.icon-wishlist').addClass('icon-wishlist-focus');
        $('.icon-wishlist-focus').removeClass('icon-wishlist');
      });
    }
  },
  /*
  goTo(idx) {
    this.refs.carousel.goTo(idx);
  },
  */
  render() {
    const { images } = this.props;
    const slideSettings = {
      slideSpeed: 300,
      autoPlay: 5000,
      singleItem: true,
    };
    const renderImage = images.map((image, index) =>
      <img key={index} src={image.url} alt="product image" />
    );

    return (
      <section className="ms-detail-slider ms-slider">
        <div className="ms-viewport">
          <OwlCarousel {...slideSettings}>
            {renderImage}
          </OwlCarousel>
        </div>
        <span className="ms-add-wish">
          <span className="ms-icon icon-wishlist" onClick={this.handleAddWish}></span>
        </span>
      </section>
    );
  },
});
