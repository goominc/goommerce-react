import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    return (
      <section id="order-detail-container">
        <header>
          <div className="order-status">
            Status: The seller has shipped your order
          </div>
          <div className="order-status">
            Reminder: In <span className="orange">5 days 23 hours 8 minutes</span>Purchase Protection will end.
          </div>
        </header>
        <div className="detail-actions">
          <Link to="/">Delivery Information
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </Link>
          <Link to="/">Order Message
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </Link>
        </div>

        <div className="detail-info">
          <div className="order-props">Order ID: 393734FF</div>
          <div className="order-props">Order Time: 2016-03-05 19:55</div>
          <ul>
            <li className="order-product-item">
              <img />
              <div className="order-product-name">
                2016 casual shirts dress...
              </div>
              <div className="order-product-variants">
                Properties: <span>Purple+M+China</span>
              </div>
              <div className="order-product-price">
                <span className="price">US $ 11.72</span><span className="amount">X 1</span>
              </div>
            </li>
            <li className="order-product-item">
              <img />
              <div className="order-product-name">
                2016 casual shirts dress...
              </div>
              <div className="order-product-variants">
                Properties: <span>Navi+M+China</span>
              </div>
              <div className="order-product-price">
                <span className="price">US $ 11.72</span><span className="amount">X 1</span>
              </div>
            </li>
          </ul>
          <div className="order-product-showmore">
            Display 3 items remaining<span className="shrink-arrow"></span>
          </div>
          <div className="order-quantity">
            Quantity
            <span className="quantity-right">5</span>
          </div>
          <div className="order-quantity">
            Total Amount
            <span className="price-right">US $ 58.60</span>
          </div>
        </div>

        <div className="seller-info">
          Seller Info
          <Link to={'/brands/21'}>
            <div className="order-status">Store: J's Style</div>
            <div className="order-status">Seller: angel wang</div>
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </Link>
        </div>
      </section>
    );
  },
});
