import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductMainImage } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    inipay: PropTypes.func.isRequired,
  },
  inipay() {
    this.props.inipay(this.props.order.id).then((res) => {
      this.refs.mid.value = res.mid;
      this.refs.oid.value = res.oid;
      this.refs.amt.value = res.price;
      this.refs.email.value = res.buyeremail;
      this.refs.nextUrl.value = res.returnUrl;
      this.refs.inipay.action = `https://mobile.inicis.com/smart/${'wcard'}/`;
      this.refs.inipay.submit();
    });
  },
  renderAddresses() {
    const { addresses, activeAddressId } = this.props;
    if (!addresses || !Object.keys(addresses).length) {
      return (
          <div className="order-section order-shipping-address">
            <Link id="change-address" to="/orders/address/add">Add Shipping Address</Link>
          </div>
        );
    }
    let selectedAddress = null;
    for (const i in addresses) {
      /* if no default address */
      if (!selectedAddress) {
        selectedAddress = addresses[i];
      }
      if (addresses[i].id === activeAddressId) {
        selectedAddress = addresses[i];
      }
    }

    return (
        <div className="order-section order-shipping-address">
          <div className="name">{selectedAddress.detail.name}</div>
          <p>
            {selectedAddress.detail.streetAddress}
            <br /> {selectedAddress.detail.city}
            <br /> {selectedAddress.countryCode}
            <br /> {selectedAddress.detail.postalCode}
            <br />
          </p>
          <Link id="change-address" to="/orders/address/select">Change Shipping Address</Link>
        </div>
      );
  },
  renderProducts() {
    const { order } = this.props;
    if (order && order.orderProducts && order.orderProducts.length) {
      return order.orderProducts.map((orderProduct) => {
        const renderBrand = () => {
          if (orderProduct.brand && orderProduct.brand.data && orderProduct.brand.data.name) {
            return (
              <h3>Seller:
                <Link className="company-name" to={`/brand/${orderProduct.brand.id}`}>
                  {orderProduct.brand.data.name.en}
                </Link>
              </h3>
              );
          }
          return null;
        };
        let variantStr = '';
        if (orderProduct.productVariant && orderProduct.productVariant.data) {
          const variantData = orderProduct.productVariant.data;
          for (const key of Object.keys(variantData)) {
            variantStr += `${variantData[key]} `;
          }
        } else {
          variantStr = orderProduct.productVariant.sku;
        }

        return (
          <div className="order-panel order-seller" key={orderProduct.id}>
            {renderBrand()}

            <section className="order-section order-product">
              <dl className="order-product-info clearfix">
                <dt>
                  <div className="order-image">
                    <img src={getProductMainImage(orderProduct.product).url} />
                  </div>
                </dt>
                <dd>
                  2015 Over Slim Dresses Women Grey Half Sleeve Ruched Wrap Front Dress
                </dd>
              </dl>

              <dl className="order-product-sku clearfix">
                <dt>Options:</dt>
                <dd>
                  <span className="order-product-options">{variantStr}</span>
                </dd>
              </dl>

              <dl className="order-product-cost clearfix">
                <dt>Price:</dt>
                <dd><span className="cost"><b>US ${orderProduct.USD}</b></span>
                </dd>
              </dl>

              <dl className="order-product-quantity clearfix">
                <dt>Quantity:</dt>
                <dd>
                  <span className="product-quantity">{orderProduct.orderedCount}</span>
                  <span className="product-unit">piece</span>
                  <div className="product-error-message">only 9999 units available</div>
                </dd>
              </dl>

              { /* <dl className="order-product-shipping clearfix">
                <dt>Shipping&nbsp;:</dt>
                <dd>
                  <div className="shipping-box">
                    <div className="shipping-selected">
                      <span className="cost"><b>US $0.84</b></span> via Seller's Shipping Method
                    </div>
                    <div className="shipping-content">
                      <ul className="shipping-list">
                        <li className="shipping-item">
                          <label htmlFor="scs-8964239302-CAINIAO_STANDARD_E">
                            <input id="scs-8964239302-CAINIAO_STANDARD_E" name="scs-8964239302-company" value="CAINIAO_STANDARD_E" type="radio" className="shipping-radio" checked="checked"/>
                            <span className="shipping-label">
                              <span className="shipping-time">15-34 Days</span>
                              <span className="shipping-cost cost"><b>$0</b></span>
                              <span className="shipping-company">CAINIAO_STANDARD_E</span>
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="shipping-info">
                      Delivery Time : 39 -60 days
                      <br /> Processing Time : 6 days
                    </div>
                  </div>
                </dd>
              </dl> */ }

              { /* <dl className="order-product-message clearfix">
                <dt><b>Message to Supplier:</b> <span className="optional">(Optional)</span></dt>
                <dd>
                  <div className="text-wrap">
                    <textarea className="change-message" rows="1"></textarea>
                  </div>
                </dd>
              </dl> */ }
            </section>
            <dl>
              <dt></dt>
              <dd id="quantity-error" className="board-error" style={ { display: 'none' } }>Number is error</dd>
            </dl>
            <ul className="order-section-summary order-product-checkout">
              { /* <li className="clearfix">
                <span className="checkout-item">Subtotal:</span>
                <span className="cost"><b>US $6.84</b></span>
              </li>
              <li className="clearfix">
                <span className="checkout-item">Shipping:</span>
                <span className="cost"><b>US $0.84</b></span>
              </li> */ }
              <li className="checkout-total clearfix">
                <span className="checkout-item"><b>Total:</b></span>
                <span className="cost checkout-price"><b>US ${orderProduct.totalUSD}</b></span>
              </li>
            </ul>
          </div>
          );
      });
    }
    return <div />;
  },
  render() {
    const { order } = this.props;
    if (!order) {
      return <div />;
    }
    return (
      <section id="place-order">
        <div className="order-panel">
          <h3>shipping address&nbsp;:</h3>
          {this.renderAddresses()}
        </div>
        {this.renderProducts()}
        <div id="order-summary">
          <h3>order summary&nbsp;</h3>
          <ul className="order-product-checkout">
            { /* <li className="clearfix">
              <span className="checkout-item">Subtotal:</span>
              <span className="cost"><b>US $6.84</b></span>
            </li>
            <li className="clearfix">
              <span className="checkout-item">Shipping:</span>
              <span className="cost"><b>US $0.84</b></span>
            </li> */ }
            { /*
            <li className="clearfix">
              <span className="checkout-item">AliExpress Coupon:</span>
              <span className="change-coupon">Please enter Coupon code</span>
            </li>
            */ }
            <li className="checkout-total clearfix">
              <span className="checkout-item"><b>Grand total&nbsp;:</b></span>
              <span id="checkout-price-total" className="cost"><b>US ${order.totalEstimationUSD}</b></span>
            </li>
          </ul>
          <form method="post" acceptCharset="euc-kr" ref="inipay">
            <input type="hidden" name="P_MID" ref="mid" />
            <input type="hidden" name="P_OID" ref="oid" value="1234abcdef-1234" />
            <input type="hidden" name="P_AMT" ref="amt" value="1000" />
            <input type="hidden" name="P_MNAME" ref="name" value="LINKSHOPS" />
            <input type="hidden" name="P_UNAME" ref="name" value="LINKSHOPS" />
            <input type="hidden" name="P_GOODS" ref="goods" value="의류" />
            <input type="hidden" name="P_MOBILE" ref="mobile" value="010-2000-1234" />
            <input type="hidden" name="P_EMAIL" ref="email" />
            <input type="hidden" name="P_NEXT_URL" ref="nextUrl" />
            <input type="hidden" name="P_NOTI_URL" ref="notiUrl" />
            <input type="hidden" name="P_CHARSET" value="utf8" />
          </form>
          <input
            type="submit"
            id="create-order"
            value="place order&nbsp;"
            className="ui-button ui-button-main"
            onClick={this.inipay}
          />
        </div>

      </section>
    );
  },
});
