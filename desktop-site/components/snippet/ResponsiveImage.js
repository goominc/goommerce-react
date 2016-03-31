// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

export default React.createClass({
  propTypes: {
    image: PropTypes.object,
    link: PropTypes.string,
    width: PropTypes.number,
  },
  render() {
    const { image, link, width } = this.props;
    const ratio = 1.3;
    const renderImage = (image2) => {
      if (!image2) {
        return (<img />);
      }
      if (!width || !image2.publicId) {
        return (<img src={image2.url} />);
      }
      return (
        <CloudinaryImage publicId={image2.publicId}
          version={image2.version}
          options={ { width, height: Math.round(width * ratio) } }
        />
      );
    };
    const renderInner = () => {
      const res = (<div className="inner-wrap">{renderImage(image)}</div>);
      if (link) {
        return (
          <Link to={link}>{res}</Link>
        );
      }
      return res;
    }
    return (
      <div className="img-wrap">
        {renderInner()}
        {this.props.children}
      </div>
    );
  },
});
