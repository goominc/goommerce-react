import React, { PropTypes } from 'react';

import OwlCarousel from 'react-owl-carousel';

export default React.createClass({
  propTypes: {
    images: PropTypes.array.isRequired,
    addWish: PropTypes.func.isRequired,
  },
  componentDidUpdate() {
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
  render() {
    const { images } = this.props;
    const renderImage = images.map((image, index) =>
      <img key={index} src={image.url} alt="product image" />
    );

    const slideSettings = {
      slideSpeed: 300,
      autoPlay: 5000,
      singleItem: true,
    };
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
