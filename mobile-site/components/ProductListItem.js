import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';
import { getProductMainImage, getProductMainPrice } from '../../desktop-site/util';

export default React.createClass({
  propTypes: {
    viewType: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
  },
  render() {
    const { viewType, products } = this.props;

    const prodDivs = products.map((prod) => {
      const image = getProductMainImage(prod.topHit || prod);
      const renderImage = () => {
        if (!image) {
          return (<img />);
        }
        return (<img src={image.url} />);

        /* if (!image.publicId) {
          return (<img src={image.url} />);
        }
        return (
          <CloudinaryImage publicId={image.publicId}
            version={image.version}
            options={ { width: 220, height: 330 } }
          />
        ); */
      };

      return (
          <li className="product-item" key={prod.id}>
            <div className="pro-inner">
              <Link to={'/products/' + prod.id}>
                <div className="pic">
                  {renderImage()}
                </div>
                <span className="discount-rate">- 50% </span>
                <div className="infomation">
                  <div className="title">
                    <span>20160303 SS </span>
                  </div>

                  <span className="discount-price"><em>US ${prod.USD}</em> / piece</span>
                  <del className="original-price">US ${prod.USD} / piece</del>

                  <div className="custom-gallery-view-blank"></div>

                  <div className="info-bottom">
                    <span className="free-shipping">Shipping: US $0.84</span>
                    <span className="order-number">Orders: 999</span>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        );
    });

    return (
      <div className={'custom-' + viewType} id="product-main">
        <ul className="product-list clearfix" id="product-list">
          {prodDivs}
        </ul>
      </div>
    );
  },
});
