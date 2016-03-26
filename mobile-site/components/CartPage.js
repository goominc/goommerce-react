import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  componentDidUpdate() {
    const { cart } = this.props;
    const productVariants = orderUtil.getProductVariantsFromCart(cart);
    if (cart && productVariants && productVariants.length) {
      for (let i = 0; i < productVariants.length; i++) {
        const count = productVariants[i].count;
        const variant = productVariants[i].productVariant;
        if (count <= 1) {
          $(`#minus-${variant.id}`).addClass('disabled');
        } else {
          $(`#minus-${variant.id}`).removeClass('disabled');
        }
        if (count >= 9999) {  // FIXME
          $(`#plus-${variant.id}`).addClass('disabled');
        } else {
          $(`#plus-${variant.id}`).removeClass('disabled');
        }
      }
    }
  },
  handleBuyAll() {
    const { cart } = this.props;
    const productVariants = orderUtil.getProductVariantsFromCart(cart);
    if (cart && productVariants && productVariants.length) {
      this.props.createOrder(productVariants.map(
        (variant) => ({ id: variant.productVariant.id, count: variant.count }))
      );
    }
  },
  renderCart() {
    const { cart } = this.props;
    const { activeLocale, activeCurrency } = this.context;
    const productVariants = orderUtil.getProductVariantsFromCart(cart);

    if (cart && productVariants && productVariants.length) {
      return productVariants.map((productVariant) => {
        const updateCount = (event) => {
          this.props.updateCartProduct(productVariant.productVariant.id, event.target.value);
        };
        const minusCount = () => {
          if (productVariant.count > 1) {
            productVariant.count--;
            this.props.updateCartProduct(productVariant.productVariant.id, productVariant.count);
            $(`#count-${productVariant.productVariant.id}`).val(productVariant.count);
          }
        };
        const plusCount = () => {
          productVariant.count++; // FIXME
          this.props.updateCartProduct(productVariant.productVariant.id, productVariant.count);
          $(`#count-${productVariant.productVariant.id}`).val(productVariant.count);
        };
        const deleteProduct = () => {
          this.props.deleteCartProduct(productVariant.productVariant.id);
        };

        return (
          <article className="seller-products" key={productVariant.productVariant.id}>
            { /* <div className="seller bt p-24 pt-24 pb-24">
              <Link to="/brands/">
                <div className="has-coupon"> Seller: <span className="seller-title">Special lady</span>
                  <i className="ms-icon icon-arrow-right fr"></i>
                  <div className="coupon big-coupon">
                    <span className="left-bg"></span>
                    <span className="coupon-info">
                      US $2.00 off US $18.00
                    </span>
                  </div>
                </div>
              </Link>
            </div> */ }
            <ul className="product bt">
              <li className="p-24">
                <div className="pi-details mb-24 clearfix">
                  <div className="pi-details-pic">
                    <Link to={`/products/${productVariant.productVariant.productId}`}>
                      <img src={productVariant.productVariant.appImages.default[0].url} />
                    </Link>
                  </div>
                  <div className="pi-details-desc">
                    <div className="pi-details-desc-row">
                      <Link to={`/products/${productVariant.productVariant.productId}`}>
                        <div className="details-title">
                          { /* TODO put product name here */ }
                          {productVariant.productVariant.sku}
                        </div>
                      </Link>
                      <div className="details-price clearfix">
                        <div>
                          <span className="sell-price">
                            {activeCurrency}&nbsp;{productVariant.productVariant[activeCurrency]}
                          </span>
                        </div>
                      </div>
                      <div className="details-sku ellipsis-multiple">{productVariant.productVariant.sku}</div>
                    </div>
                  </div>
                </div>
                <div className="pi-quantity mb-48 clearfix">
                  <div className="clearfix">
                    <span className="pre">Quantity&nbsp;:</span>
                    <div className="trim">
                      <span className="trim ms-numberic">
                        <a className="ms-minus" id={`minus-${productVariant.productVariant.id}`} onClick={minusCount}>
                          <i className="ms-icon icon-minus"></i>
                        </a>
                        <input id={`count-${productVariant.productVariant.id}`} type="number" min="1"
                          defaultValue={productVariant.count} onChange={updateCount}
                        />
                        <a className="ms-plus" id={`plus-${productVariant.productVariant.id}`} onClick={plusCount}>
                          <i className="ms-icon icon-plus"></i>
                        </a>
                      </span>
                    </div>
                    <span className="delete" onClick={deleteProduct}><i className="ms-icon icon-remove fr"></i></span>
                  </div>
                </div>
                { /* <div className="pi-shipping mb-40">
                  <div className="shipping clearfix">
                    Shipping&nbsp;: <span className="shipping-cost">free shipping&nbsp;
                    <i className="ms-icon icon-arrow-right fr"></i></span>
                  </div>
                </div> */ }
              </li>
            </ul>
            { /* <div className="seller-costs bt p-24 ">
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
                <dd>
                  <Link to="/orders">
                    <span className="ui-button ui-button-main buy ">
                      buy all from this seller&nbsp;
                    </span>
                  </Link>
                </dd>
              </dl>
            </div> */ }
          </article>
          );
      });
    }
    return null;
  },

  render() {
    const { cart } = this.props;
    const { activeLocale, activeCurrency } = this.context;
    if (!cart || !cart.total) {
      return (
          <div />
        );
    }

    return (
      <section className="shopcart-list" id="shopcart-list">
        { /* <div className="shipto bb p-24 mb-24">Ship my order(s) to
          <span className="ship-to" id="ship-to">South Korea<i className="ms-icon icon-arrow-right fr"></i></span>
        </div> */ }
        {this.renderCart()}
        <article id="seller-cart-buyall" className="seller-products">
          { /* <div className="seller-cart-buyall seller-costs bt p-24 pb-24">
            <dl className="seller-costs-subtotal mt-24 clearfix">
              <dt>Subtotal: (2 items)</dt>
              <dd><span>US $24.74</span></dd>
            </dl>
            <dl className="seller-costs-shipping mt-16 clearfix">
              <dt>Shipping&nbsp;:</dt>
              <dd><span>US $0.84</span></dd>
            </dl>
          </div> */ }
          <div className="accounts bt bb p-24 pt-24 pb-24 clearfix">
            <div className="total">
              <span>Total&nbsp;:</span>
              <span className="mt-16 price">{activeCurrency} {cart.total[activeCurrency]}</span>
            </div>
            <div className="ui-button ui-button-main buyall" onClick={this.handleBuyAll}>Buy All</div>
          </div>
        </article>
      </section>
    );
  },
});
