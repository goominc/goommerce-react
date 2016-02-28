import React, { PropTypes } from 'react';
import { Link } from 'react-router';


export default React.createClass({
  propTypes: {
    cart: PropTypes.object.isRequired,
  },
  renderCart() {
    const { cart } = this.props;
    //if (cart && cart.productVariant) {
    if (true) {
      return (
          <article id="seller-cart-220935154" className="seller-products">
            <div className="seller bt p-24 pt-24 pb-24">
              <a href="/store/storeHome.htm?sellerAdminSeq=220935154">
                <div className="has-coupon"> Seller: <span className="seller-title">Special lady</span>
                  <i className="ms-icon icon-arrow-right fr"></i>
                  <div className="coupon big-coupon">
                    <span className="left-bg"></span>
                    <span className="coupon-info">
                      US $2.00 off US $18.00
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <ul className="product bt">
              <li id="shopcart-" className="p-24">
                <div className="pi-details mb-24 clearfix">
                  <div className="pi-details-pic">
                    <a href="/item/32273714667.html">
                      <img src="http://g01.a.alicdn.com/kf/HTB1gHaOJFXXXXaYXVXXq6xXFXXXS/2015-New-Fashion-Women-Summer-Dress-Vintage-Print-Flower-Strapless-Bohemian-Dress-Causal-Long-Dress-Vestidos.jpg_80x80.jpg" alt="2015 New Fashion Women Summer Dress Vintage Print Flower Strapless Bohemian Dress Causal Long Dress Vestidos Plus Size 4 Color" />
                    </a>
                  </div>
                  <div className="pi-details-desc">
                    <div className="pi-details-desc-row">
                      <a href="/item/32273714667.html">
                        <div className="details-title">2015 New Fashion Women Summer Dress Vintage Print Flower Strapless Bohemian Dress Causal Long Dress Vestidos Plus Size 4 Color
                        </div>
                      </a>
                      <div className="details-price clearfix">
                        <div>
                          <span className="sell-price">US $17.90</span>
                        </div>
                      </div>
                      <div className="details-sku ellipsis-multiple">
                          Purple , One Size </div>
                    </div>
                  </div>
                </div>
                <div className="pi-quantity mb-48 clearfix">
                  <div className="clearfix">
                    <span className="pre">Quantity&nbsp;:</span>
                    <div className="trim">
                      <span className="trim ms-numberic ms-numberic-8908340955" data-shop-cartid="8908340955">
                        <a className="ms-minus disabled"><i className="ms-icon icon-minus"></i></a>
                        <input type="number" id="quantity-8908340955" min="1" />
                        <a className="ms-plus"><i className="ms-icon icon-plus"></i></a>
                      </span>
                    </div>
                    <span className="delete"><i className="ms-icon icon-remove fr"></i></span>
                  </div>
                </div>
                <div className="pi-shipping mb-40">
                  <div className="shipping clearfix" data-shop-cartid="8908340955">
                    Shipping&nbsp;: <span className="shipping-cost">free shipping&nbsp;<i className="ms-icon icon-arrow-right fr"></i></span>
                  </div>
                </div>
              </li>
            </ul>
            <div className="seller-costs bt p-24 ">
              <dl className="seller-costs-subtotal mt-24 clearfix">
                <dt>Subtotal:</dt>
                <dd><span>US $17.90</span></dd>
              </dl>
              <dl className="seller-costs-shipping mt-16 clearfix">
                <dt>Shipping&nbsp; : </dt>
                <dd><span>US $0.00</span></dd>
              </dl>
            </div>
            <div className="pi-operate bb mb-24 p-24 ">
              <dl className="pi-operate-total pt-24 clearfix">
                <dt>Total&nbsp;:</dt>
                <dd><span className="price">US $17.90</span>
                </dd>
              </dl>
              <dl className="pi-operate-buy mt-24 mb-32 clearfix">
                <dt>
                  <div className="big-coupon">
                    <span className="left-bg"></span>
                    <a href="/store/storeHome.htm?sellerAdminSeq=220935154">
                      <span className="coupon-info">Get a Store Coupon<i className="icon-right"></i></span>
                    </a>
                  </div>
                </dt>
                <dd><Link to="/orders"><span className="ui-button ui-button-main buy ">buy all from this seller&nbsp;</span></Link></dd>
              </dl>
            </div>
          </article>
          );
    }
  },

  render() {
    return (
      <section className="shopcart-list" id="shopcart-list">
        <div className="shipto bb p-24 mb-24">Ship my order(s) to
          <span className="ship-to" id="ship-to">South Korea<i className="ms-icon icon-arrow-right fr"></i></span>
        </div>
        {this.renderCart()}
        <article id="seller-cart-buyall" className="seller-products">
          <div className="seller-cart-buyall seller-costs bt p-24 pb-24">
            <dl className="seller-costs-subtotal mt-24 clearfix">
              <dt>Subtotal: (2 items)</dt>
              <dd><span>US $24.74</span></dd>
            </dl>
            <dl className="seller-costs-shipping mt-16 clearfix">
              <dt>Shipping&nbsp;:</dt>
              <dd><span>US $0.84</span></dd>
            </dl>
          </div>
          <div className="accounts bt bb p-24 pt-24 pb-24 clearfix">
            <div className="total">
              <span>Total&nbsp;:</span>
              <span className="mt-16 price">US $25.58</span>
            </div>
            <Link to="/orders"><div className="ui-button ui-button-main buyall  ">Buy All</div></Link>
          </div>
        </article>
        <form id="submit-for-seller-create-order" method="post" action="/order/createNewOrderForCombine.htm">
        </form>
        <form id="submit-for-delete" method="post" action="/shopcart/detail.htm">
        </form>
        <form id="submit-for-delete-all" method="post" action="/shopcart/detail.htm">
        </form>
        <form id="submit-for-update-quantity" method="post" action="/shopcart/detail.htm">
        </form>
        <form id="submit-for-update-freight" method="post" action="/shopcart/detail.htm">
        </form>
        <form id="submit-for-update-country" method="post" action="/shopcart/detail.htm">
        </form>
        <form id="submit-for-buy-all" method="post" action="/order/createNewOrderForCombine.htm">
        </form>
      </section>
    );
  },
});
