import React from 'react';

export default React.createClass({
  propTypes: {
    // TODO conditions
  },
  render() {
    const itemsInRow = 3;
    const maxRowCount = 10;

    return (
      <div className="container">
        <div className="product-list-item-row">
          <div className="product-list-item-wrap product-list-first-item">
            <div className="product-list-item-box">
              <img src="http://g03.a.alicdn.com/kf/HTB1dc5pLXXXXXatXVXXq6xXFXXXQ/Mens-Breathable-Trail-Running-Shoes-New-2015-Summer-Outdoor-Walking-Fishing-Water-Shoe-Athletic-Sport-Shoes.jpg_220x220.jpg" />
              <div className="product-title">
                <a href="/product/1">Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</a>
              </div>
              <div className="product-price">
                KRW 70,000
              </div>
            </div>
          </div>
          <div className="product-list-item-wrap product-list-first-item">
            <div className="product-list-item-box">
              <img src="http://g03.a.alicdn.com/kf/HTB1dc5pLXXXXXatXVXXq6xXFXXXQ/Mens-Breathable-Trail-Running-Shoes-New-2015-Summer-Outdoor-Walking-Fishing-Water-Shoe-Athletic-Sport-Shoes.jpg_220x220.jpg" />
              <div className="product-title">
                <a href="/product/1">Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</a>
              </div>
              <div className="product-price">
                KRW 70,000
              </div>
            </div>
          </div>
          <div className="product-list-item-wrap product-list-first-item">
            <div className="product-list-item-box">
              <img src="http://g03.a.alicdn.com/kf/HTB1dc5pLXXXXXatXVXXq6xXFXXXQ/Mens-Breathable-Trail-Running-Shoes-New-2015-Summer-Outdoor-Walking-Fishing-Water-Shoe-Athletic-Sport-Shoes.jpg_220x220.jpg" />
              <div className="product-title">
                <a href="/product/1">Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</a>
              </div>
              <div className="product-price">
                KRW 70,000
              </div>
            </div>
          </div>
        </div>
        <div className="product-list-item-row">
          <div className="product-list-item-wrap product-list-first-item">
            <div className="product-list-item-box">
              <img src="http://g03.a.alicdn.com/kf/HTB1dc5pLXXXXXatXVXXq6xXFXXXQ/Mens-Breathable-Trail-Running-Shoes-New-2015-Summer-Outdoor-Walking-Fishing-Water-Shoe-Athletic-Sport-Shoes.jpg_220x220.jpg" />
              <div className="product-title">
                <a href="/product/1">Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</a>
              </div>
              <div className="product-price">
                KRW 70,000
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
