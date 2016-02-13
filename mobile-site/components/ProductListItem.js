import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    const prods = [
      { 'id' : 1, 'name' : '2015 Over Slim Dresses Women Grey Half Sleeve Ruched Wrap Front Dress PE3527*50', 'link' : '/', 'price' : 'US $ 1.23', 'count' : 45, 'img' : 'http://g02.a.alicdn.com/kf/HTB1NrEdKVXXXXalXpXXq6xXFXXXe/Casual-fashion-sport-Women-s-2-pcs-set-New-Brand-Women-Sexy-Underwear-Set-Tracksuits-Bikini.jpg_350x350.jpg'},
      { 'id' : 2, 'name' : '2015 Over Slim Dresses Women Grey Half Sleeve Ruched Wrap Front Dress PE3527*50', 'link' : '/', 'price' : 'US $ 4.56', 'count' : 18, 'img' : 'http://g01.a.alicdn.com/kf/HTB1PHRMHFXXXXbiaXXXq6xXFXXXL/2015-summer-novelty-t-shirt-women-fashion-brand-tee-shirt-sequined-short-sleeve-cartoon-regular-cotton.jpg_350x350.jpg'},
      { 'id' : 3, 'name' : '2015 Over Slim Dresses Women Grey Half Sleeve Ruched Wrap Front Dress PE3527*50', 'link' : '/', 'price' : 'US $ 1.23', 'count' : 45, 'img' : 'http://g01.a.alicdn.com/kf/HTB1ju3BKVXXXXa.XXXXq6xXFXXXu/Blue-Heart-Dots-Print-Split-Back-Slim-Sexy-Blouse-Long-Sleeve-Turn-Down-Collar-Backless-Fall.jpg_350x350.jpg'},
      { 'id' : 4, 'name' : '2015 Over Slim Dresses Women Grey Half Sleeve Ruched Wrap Front Dress PE3527*50', 'link' : '/', 'price' : 'US $ 4.56', 'count' : 18, 'img' : 'http://g01.a.alicdn.com/kf/HTB1RjNzIFXXXXXxXpXXq6xXFXXXd/luxury-pure-cotton-4pcs-bedding-kit-princess-duvet-cover-set-pink-and-white-ruffle-color-FLORAL.jpg_350x350.jpg'},
    ];

    const prodDivs = prods.map((prod) => {
      return (
          <li className="product-item" key={prod.id}>
            <div className="pro-inner">
              <Link to={prod.link}>
                <div className="pic">
                  <img src={prod.img} />
                </div>
                <span className="discount-rate">- 50% </span>
                <div className="infomation">
                  <div className="title">
                    <span>{prod.name}</span>
                  </div>

                  <span className="discount-price"><em>{prod.price}</em> / piece</span>
                  <del className="original-price">US $13.67 / piece</del>

                  <div className="custom-gallery-view-blank"></div>

                  <div className="info-bottom">
                    <span className="free-shipping">Shipping: US $0.84</span>
                    <span className="order-number">Orders:{prod.count}</span>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        );
    });

    return (
      <div className={this.props.viewType} id="product-main">
        <ul className="product-list clearfix" id="product-list">
          {prodDivs}
        </ul>
      </div>
    );
  },
});
