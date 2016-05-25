// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
import i18n from 'commons/utils/i18n';

const _ = require('lodash');

export default React.createClass({
  propTypes: {
    wishes: PropTypes.array,
    deleteWish: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
  },
  render() {
    const { wishes, deleteWish } = this.props;
    const { activeCurrency } = this.context;
    if (!wishes) {
      return (<div></div>);
    }

    const renderWish = (wish) => {
      const renderImage = () => {
        const images = _.get(wish, 'product.appImages.default') || [];
        const thumbnailImage = images.length > 0 ? images[0] : null;

        return (
          <Link className="img-box" to={`/products/${wish.product.id}`}>
            <ResponsiveImage image={thumbnailImage} width={440} />
          </Link>
        );
      };
      return (
        <div key={wish.id} className="wish-item">
          {renderImage()}
          <div className="item-info-box">
            Product: {wish.product.id}
            <div className="price-area">
              <span className="price-number">{activeCurrency} {wish.product[activeCurrency]}</span>
              <span className="price-unit"> / pieces</span>
            </div>
          </div>
          <div className="item-action-box">
            <a onClick={() => deleteWish(wish.id)}>Remove</a>
          </div>
        </div>
      );
    };
    return (
      <div className="mypage-right-box">
        <h2>{i18n.get('pcMypage.wishList')}</h2>
        <div className="wish-list-box">{wishes.map(renderWish)}</div>
      </div>
    );
  },
});
