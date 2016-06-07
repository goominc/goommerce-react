import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  /*propTypes: {

  },*/

  render() {
    const related = [
      {'id' : 1, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g01.a.alicdn.com/kf/HTB1la86LXXXXXbFXpXXq6xXFXXXZ/Vestidos-Sexy-Club-Stretch-Laced-Back-Cage-Winter-Party-Dresses-Black-Night-Wear-Criss-Cross-Warm.jpg_120x120.jpg'},
      {'id' : 2, 'title': 'Sammydress 2015 New Fashion Spring Sexy PU Leather Dress Leopard Printing Woman Long Sleeve Bodycon mini Dress vestidos', 'img' : 'http://g02.a.alicdn.com/kf/HTB1RzF1KpXXXXb5XVXXq6xXFXXXB/Sammydress-2015-New-Fashion-Spring-Sexy-PU-Leather-Dress-Leopard-Printing-Woman-Long-Sleeve-Bodycon-mini.jpg_120x120.jpg'},
      {'id' : 3, 'title': 'Women Sexy Fashion Off the Shoulder Slash Neck Sheath Stretch Mini Nightclub Prom Party Casual Bodycon Dress MK748', 'img' : 'http://g02.a.alicdn.com/kf/HTB1sXhwLXXXXXbmXpXXq6xXFXXXI/Women-Sexy-Fashion-Off-the-Shoulder-Slash-Neck-Sheath-Stretch-Mini-Nightclub-Prom-Party-Casual-Bodycon.jpg_120x120.jpg'},
      {'id' : 4, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g01.a.alicdn.com/kf/HTB1GlCVIXXXXXbEXVXXq6xXFXXXs/2015-new-hot-sexy-Slim-was-thin-Square-Neck-package-hip-dress.jpg_120x120.jpg'},
      {'id' : 5, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g02.a.alicdn.com/kf/HTB1cm6OIpXXXXb3XFXXq6xXFXXXr/Durable-Voberry-Fashion-Skinny-Dress-Hot-Sexy-Bodycon-Patent-Leather-Braces-Skirt-Clubwear-Women-Stripper-Vestidos.jpg_120x120.jpg'},
      {'id' : 6, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g01.a.alicdn.com/kf/HTB1pFziLXXXXXblXVXXq6xXFXXXn/2015-spring-models-new-European-style-dress-was-thin-YM042.jpg_120x120.jpg'},
      {'id' : 7, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g02.a.alicdn.com/kf/HTB1dQvnLXXXXXcoXFXXq6xXFXXX8/Europe-and-the-United-States-wind-of-autumn-dress-foreign-trade-women-s-dress-MP046.jpg_120x120.jpg'},
      {'id' : 8, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g03.a.alicdn.com/kf/HTB15om6LXXXXXXTapXXq6xXFXXXH/European-and-American-stars-with-blue-and-purple-leopard-print-paragraph-sexy-package-hip-long-sleeved.jpg_120x120.jpg'},
      {'id' : 9, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g01.a.alicdn.com/kf/HTB1F2LELXXXXXX2XpXXq6xXFXXXn/2015-Summer-stytle-dresses-fashion-lace-patchwork-short-sleeve-pencil-dress-vestidos-GZ240.jpg_120x120.jpg'},
      {'id' : 10, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g01.a.alicdn.com/kf/HTB1ObfNLXXXXXXpXXXXq6xXFXXXB/European-and-American-models-with-fold-waist-dress-fifth-sleeve-dress-hot-TH060.jpg_120x120.jpg'},
      {'id' : 11, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g04.a.alicdn.com/kf/HTB10L3PJVXXXXa0aXXXq6xXFXXXi/New-Autumn-Winter-Above-Knee-Casual-Dresses-Women-High-Quality-Sexy-Slim-Sheath-Solid-Short-Sleeve.jpg_120x120.jpg'},
      {'id' : 12, 'title': 'Vestidos Sexy Club Stretch Laced Back Cage Winter Party Dresses Black Night Wear Criss Cross Warm Cotton Bandage Bodycon Dress', 'img' : 'http://g03.a.alicdn.com/kf/HTB1ihrfLXXXXXceXVXXq6xXFXXXt/Europe-and-the-wave-point-long-sleeved-dress-The-spring-and-autumn-period-and-the-base.jpg_120x120.jpg'},
    ];

    const relatedDiv = related.map((relate) => {
      return (
          <li key={relate.id}>
            <Link rel="nofollow" to="http://m.aliexpress.com/item/32579560925.html">
              <div className="related-img"><img alt={relate.title} src={relate.img} /></div>
              <p className="related-subject">{relate.title}</p>
              <p className="related-price">US $8.48</p>
            </Link>
          </li>
        );
    });

    return (
        <section className="ms-detail-related">
          <header className="related-title">Customers who viewed also viewed or bought&nbsp;</header>
          <div className="viewport">
            <ul className="related-list" style={ { width: '1680px' } }>
            {relatedDiv}
            </ul>
          </div>
        </section>
    );
  },
});
