// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { CloudinaryImage } from 'react-cloudinary';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  getInitialState() {
    return { startIndex: 0 };
  },
  render() {
    const { order } = this.props;
    const { startIndex } = this.state;
    const itemInRow = 9;
    const renderImage = (image) => {
      if (!image) {
        return (<img />);
      }

      if (!image.publicId) {
        return (<img src={image.url} />);
      }
      return (
        <CloudinaryImage
          publicId={image.publicId}
          version={image.version}
          options={ { width: 220 } }
        />
      );
    };
    const renderProduct = (p) => (
      <div key={p.productVariant.id} className="img-wrap">
        {renderImage(_.get(p.productVariant, 'appImages.default[0]'))}
      </div>
    );
    if (order.orderProducts.length <= itemInRow) {
      return (
        <div>
          {order.orderProducts.map(renderProduct)}
        </div>
      );
    }
    const orderProducts = order.orderProducts.slice(startIndex, startIndex + 9);
    const canLeft = () => startIndex > 0;
    const canRight = () => startIndex + 9 <= order.orderProducts.length - 1;
    const arrowLeft = () => {
      if (canLeft()) {
        this.setState({ startIndex: startIndex - 1 });
      }
    };
    const arrowRight = () => {
      if (canRight()) {
        this.setState({ startIndex: startIndex + 1 });
      }
    };
    return (
      <div>
        {orderProducts.map(renderProduct)}
        <div className="nav-wrap">
          <div className={`arrow-left${canLeft() ? ' active' : ''}`} onClick={arrowLeft}></div>
          <div className={`arrow-right${canRight() ? ' active' : ''}`} onClick={arrowRight}></div>
        </div>
      </div>
    );
  },
});
