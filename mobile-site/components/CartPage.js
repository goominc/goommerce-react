import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from 'commons/utils/i18n';
import orderUtil from 'commons/utils/orderUtil';
import brandUtil from 'commons/utils/brandUtil';
import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object.isRequired,
    checkBuy: PropTypes.bool.isRequired,
    toggleBuy: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
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
    const { cart, checkBuy } = this.props;
    if (!checkBuy) {
      $('.check-forbuy').addClass('warning');
      $('body').animate({ scrollTop: $('.check-forbuy').offset().top }, 500);
      return;
    }
    $('.check-forbuy').removeClass('warning');

    const productVariants = orderUtil.getProductVariantsFromCart(cart);
    if (cart && productVariants && productVariants.length) {
      this.props.createOrder(productVariants.map(
        (variant) => ({ id: variant.productVariant.id, count: variant.count }))
      );
    }
  },
  renderCart() {
    const { cart } = this.props;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    // const productVariants = orderUtil.getProductVariantsFromCart(cart);

    if (cart && cart.brands && cart.brands.length) {
      return cart.brands.map((brand) => {
        const renderVariants = () => {
          if (brand.products && brand.products.length) {
            return brand.products.map((product) => {
              if (product.product && product.productVariants && product.productVariants.length) {
                return product.productVariants.map((productVariant) => {
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
                  const skuIdx = productVariant.productVariant.sku.indexOf('-');
                  const skuStr = productVariant.productVariant.sku.substr(0, skuIdx);
                  const variantStr = productVariant.productVariant.sku.substr(skuIdx + 1);

                  return (
                    <li className="p-24" key={productVariant.productVariant.id}>
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
                                {productUtil.getName(product.product)}
                              </div>
                            </Link>
                            <div className="details-sku ellipsis-multiple">{skuStr}</div>
                            <div className="details-variant ellipsis-multiple">{variantStr}</div>
                            <div className="details-price clearfix">
                              <div>
                                <span className="sell-price">
                                  {numberUtil.formatPrice(productVariant.productVariant[activeCurrency], activeCurrency, currencySign)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pi-quantity mb-48 clearfix">
                        <div className="clearfix">
                          <span className="pre">&nbsp;</span>
                          <div className="trim">
                            <span className="trim ms-numberic">
                              <a className="ms-minus" id={`minus-${productVariant.productVariant.id}`}
                                onClick={minusCount}
                              >
                                <i className="ms-icon icon-minus"></i>
                              </a>
                              <input id={`count-${productVariant.productVariant.id}`} type="number" min="1"
                                defaultValue={productVariant.count} onChange={updateCount}
                              />
                              <a className="ms-plus" id={`plus-${productVariant.productVariant.id}`}
                                onClick={plusCount}
                              >
                                <i className="ms-icon icon-plus"></i>
                              </a>
                            </span>
                          </div>
                          <span className="delete" onClick={deleteProduct}>
                            <i className="ms-icon icon-remove fr"></i>
                          </span>
                        </div>
                      </div>
                    </li>
                    );
                });
              } // end if productvariants
              return null;
            });
          } // end if brand.product
          return null;
        };


        return (
          <article className="seller-products" key={brand.brand.id}>
            <div className="seller bt p-24 pt-24 pb-24">
              <Link to={`/brands/${brand.brand.id}`}>
                <div className="has-coupon">
                  <span className="seller-title">{brandUtil.getName(brand.brand)}</span>
                  {/* 2016.06.22 [minho] hide unknown dot
                  <i className="ms-icon icon-arrow-right fr"></i> */}
                </div>
              </Link>
            </div>
            <ul className="product bt">
              {renderVariants()}
            </ul>
          </article>
        );
      });
    } // end if cart.brand
    return (
      <div className="empty-cart">
      </div>
    );
  },

  render() {
    const { cart, checkBuy } = this.props;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    if (!cart || !cart.total) {
      return (
        <div className="empty-cart" />
      );
    }

    return (
      <section className="shopcart-list" id="shopcart-list">
        {this.renderCart()}

        <div className="check-forbuy">
          <span className={`checkbox ${checkBuy ? 'checked' : ''}`} onClick={this.props.toggleBuy}></span>
          <p className="check-title">{i18n.get('pcPayment.refundPolicyTitle')}</p>
          <div className="check-desc">
            {i18n.get('mPayment.refundPolicyDesc1')}<a href="/user/terms#terms_14">{i18n.get('mPayment.refundPolicyDesc2')}</a>{i18n.get('mPayment.refundPolicyDesc3')}
            <ul className="dashed">
              <li>{i18n.get('pcPayment.refundPolicyMore1')}</li>
              <li>{i18n.get('pcPayment.refundPolicyMore2')}</li>
              <li>{i18n.get('pcPayment.refundPolicyMore3')}</li>
            </ul>
          </div>
        </div>

        <article id="seller-cart-buyall" className="seller-products">
          <div className="accounts bt bb p-24 pt-24 pb-24 clearfix">
            <div className="total">
              <span>{i18n.get('pcCart.total')}:</span>
              <span className="mt-16 price">{numberUtil.formatPrice(cart.total[activeCurrency], activeCurrency, currencySign)}</span>
            </div>
            <div className="ui-button ui-button-main buyall" onClick={this.handleBuyAll}>{i18n.get('word.doOrder')}</div>
          </div>
        </article>
      </section>
    );
  },
});
