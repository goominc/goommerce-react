// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    wishes: PropTypes.array,
  },
  render() {
    const { wishes } = this.props;
    if (!wishes) {
      return (<div></div>);
    }

    const renderWish = (wish) => (
      <div key={wish.id} className="wish-item">
        <div className="img-box">
          <div className="img-wrap">
            <img
              src="http://res.cloudinary.com/linkshops/image/upload/c_limit,h_330,w_220/v1/old/3f8a2769-copy_1.jpg"
            />
          </div>
        </div>
        <div className="item-info-box">{wish.productId}</div>
      </div>
    );
    return (
      <div className="mypage-right-box">
        <h2>Wish List</h2>
        <div className="wish-list-box">{wishes.map(renderWish)}</div>
      </div>
    );
  },
});
