import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array,
  },
  render() {
    return (
      <section id="myorder-container">
        <header>
          <div className="order-filter">
            All
          </div>
          <span className="expand-arrow"></span>
        </header>
        <div className="order-list">
          <ul>
            <li className="order-listitem">
              <Link className="order-link" to={'/myOrder/1'}>
                <div className="order-props">Order ID: 393734FF</div>
                <div className="order-props">Order Time: 2016-03-05 19:55</div>
              </Link>
              <ul>
                <li className="order-product-item">
                  <img />
                  <div className="order-product-wrap">
                    <div className="order-product-name">
                      2016 casual shirts dress...
                    </div>
                    <div className="order-product-variants">
                      Properties: <span>Purple+M+China</span>
                    </div>
                    <div className="order-product-price">
                      <span className="price">US $ 11.72</span> <span className="amount">X 1</span>
                    </div>
                  </div>
                </li>
                <li className="order-product-item">
                  <img />
                  <div className="order-product-wrap">
                    <div className="order-product-name">
                      2016 casual shirts dress...
                    </div>
                    <div className="order-product-variants">
                      Properties: <span>Navi+M+China</span>
                    </div>
                    <div className="order-product-price">
                      <span className="price">US $ 11.72</span> <span className="amount">X 1</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="order-product-showmore">
                Display 3 items remaining<span className="expand-arrow"></span>
              </div>
              <div className="order-quantity">
                Quantity
                <span className="quantity-right">5</span>
              </div>
              <div className="order-quantity">
                Total Amount
                <span className="price-right">US $ 58.60</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  },
});
