import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    images: PropTypes.array.isRequired,
    addWish: PropTypes.func.isRequired,
  },
  componentDidUpdate() {
    $('.img-list').owlCarousel({ autoPlay: 10000, items: 1 });
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
        <li key={index}>
          <img src={image.url} alt="product image" />
        </li>
    );

    return (
      <section className="ms-detail-slider ms-slider">
        <div className="ms-viewport">
          <ul className="img-list ms-list">
            {renderImage}
          </ul>
        </div>

        <span className="ms-add-wish">
          <span className="ms-icon icon-wishlist" onClick={this.handleAddWish}></span>
        </span>
      </section>
    );
  },
});
