// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object,
  },
  render() {
    const { cart } = this.props;
    // 1. brand panel
    // const brands = cart.brands;
    // 2. products with items( item - top: nickname, right: count, bottom: price )
    return (
      <div>
        <div className="reorder-brands-panel">
          <div className="brand-item">Hey</div>
          <div className="brand-item active">Hey</div>
          <div className="brand-item">TTTTTey</div>
          <div className="brand-item">KKKKKK</div>
          <div className="brand-item">Hey</div>
          <div className="brand-item plus-button">+</div>
        </div>
        <div className="reorder-products-panel">
          <div className="product-item">
            <div className="top-name">A.yo GG</div>
            <div className="img-wrap">
              <div className="dummy"></div>
              <img src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a7678-copy_6.jpg" />
              <img className="img-front1" src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a7678-copy_6.jpg" />
            </div>
            <div className="right-count">
              <div className="count-box">
                <input type="number" defaultValue="2" />
                <span>
                  <div className="up"></div>
                  <div className="down"></div>
                </span>
              </div>
            </div>
            <div className="bottom-price">$ 15.67</div>
          </div>
          <div className="product-item">
            <div className="top-name">A.yo GG</div>
            <div className="img-wrap">
              <div className="dummy"></div>
              <img src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a7678-copy_6.jpg" />
            </div>
            <div className="right-count">
              <div className="count-box">
                <input className="input-number-nospin" type="number" defaultValue="1" />
                <span>
                  <div className="up"></div>
                  <div className="down"></div>
                </span>
              </div>
            </div>
            <div className="bottom-price">$ 15.67</div>
          </div>
        </div>
      </div>
    );
  },
});
