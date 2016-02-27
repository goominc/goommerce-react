import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  /*propTypes: {

  },*/

  render() {
    const prods = [
      { 'id' : 1, 'link' : '/products/1', 'price' : 'US $ 1.23', 'count' : 45, 'img' : 'http://g02.a.alicdn.com/kf/HTB1NrEdKVXXXXalXpXXq6xXFXXXe/Casual-fashion-sport-Women-s-2-pcs-set-New-Brand-Women-Sexy-Underwear-Set-Tracksuits-Bikini.jpg_350x350.jpg'},
      { 'id' : 2, 'link' : '/products/2', 'price' : 'US $ 4.56', 'count' : 18, 'img' : 'http://g01.a.alicdn.com/kf/HTB1PHRMHFXXXXbiaXXXq6xXFXXXL/2015-summer-novelty-t-shirt-women-fashion-brand-tee-shirt-sequined-short-sleeve-cartoon-regular-cotton.jpg_350x350.jpg'},
      { 'id' : 3, 'link' : '/products/3', 'price' : 'US $ 1.23', 'count' : 45, 'img' : 'http://g01.a.alicdn.com/kf/HTB1ju3BKVXXXXa.XXXXq6xXFXXXu/Blue-Heart-Dots-Print-Split-Back-Slim-Sexy-Blouse-Long-Sleeve-Turn-Down-Collar-Backless-Fall.jpg_350x350.jpg'},
      { 'id' : 4, 'link' : '/products/4', 'price' : 'US $ 4.56', 'count' : 18, 'img' : 'http://g01.a.alicdn.com/kf/HTB1RjNzIFXXXXXxXpXXq6xXFXXXd/luxury-pure-cotton-4pcs-bedding-kit-princess-duvet-cover-set-pink-and-white-ruffle-color-FLORAL.jpg_350x350.jpg'},
    ];

    const prodDiv = prods.map((prod) => {
      return (
          <li key={prod.id}>
            <Link to={prod.link}>
              <div className="product-image">
                <img src={prod.img} />
              </div>
              <div className="product-cost"><strong>{prod.price}</strong> / piece</div>
              <div className="product-cost">{prod.count} Orders</div>
            </Link>
          </li>
        );
    });

    return (
      <section id="today-deals" className="promotion-block today-deals">
        <header>
          <Link to="/categories/1">Quality Picks</Link>
        </header>
        <article>
          <ul className="clearfix product-container">
            {prodDiv}
          </ul>
        </article>
        <Link to="/categories/1" id="today-deals-view-more-lnk" className="ui-button ui-button-third">View more&nbsp;</Link>
      </section>
    );
  },
});
