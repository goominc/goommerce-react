import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { searchProducts } = ApiAction;

import loadEntities from 'commons/redux/util/loadEntities';

import MainBanner from 'components/MainBanner';
import MainRecommendList from 'components/MainRecommendList';

const Home = React.createClass({
  propTypes: {
    searchProducts: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.props.setHeader(true, true, true, '');
    this.props.searchProducts({
      // q: query,
      // categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      // brandId,
      from: 0,
      size: 30,
    }).then((res) => this.setState(res));
  },
  render() {
    if (!this.state.products) {
      return (<div></div>);
    }
    return (
      <div className="main-container">
        <MainBanner />
        <div className="promotion">
          <section className="promotion-block categories">
            <header>
              <Link to="/categoryList">
                All Categories
              </Link>
            </header>
            <article>
              <ul className="flex-box">
                <li className="apparel-accessories">
                  <Link to="/categoryList/4">Apparel &amp; Accessories</Link>
                </li>
                <li className="jewelry">
                  <Link to="/categoryList/46">Jewelry</Link>
                </li>
                <li className="electronics">
                  <Link to="/categoryList/51">Electronics</Link>
                </li>
                <li className="beauty-health">
                  <Link to="/categoryList/179">Beauty &amp;Health</Link>
                </li>
              </ul>
            </article>
          </section>
          <section className="promotion-block top-spread">
            <article>
              <ul className="flex-box top-spread-2">
                <li>
                <Link to="http://m.aliexpress.com/column/recommend.htm?fromapp=false">
                  <img src="//img.alicdn.com/tps/i3/TB1hht3FVXXXXaTaXXXtXFo3FXX-296-264.jpg" />
                  <p className="evt-title">Quality Picks</p>
                </Link>
                </li>
                <li>
                <Link to="http://activities.aliexpress.com/superdeals_mobile.php">
                  <img src="//img.alicdn.com/tpsSuperDeals/i2/TB1CcuOFVXXXXcDXFXXtXFo3FXX-296-264.jpg" />
                  <p className="evt-title">Super Deals</p>
                </Link>
                </li>
              </ul>
            </article>
          </section>
          <MainRecommendList products={this.state.products} />
        </div>

        <div className="info-area">
        더배워 - 주문안되면 환불되고 어쩌고<br />
        결재방법 - visa master<br />
        따러와 - facebook vk insta<br />
        </div>
      </div>
    );
  },
});

export default connect(
  (state) => ({
    ...loadEntities(state, 'products', 'products'),
  }),
  { searchProducts, setHeader }
)(Home);
