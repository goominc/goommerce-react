import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { getProductMainPrice } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    variants: PropTypes.array,
    colors: PropTypes.array,
    sizes: PropTypes.array,
    currentColor: PropTypes.string,
    currentSize: PropTypes.string,
    currentVariant: PropTypes.string,
    setColor: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,
    buyNow: PropTypes.func.isRequired,
    topImg: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return { quantity: 1 };
  },
  addQuantity() {
    this.setState({ quantity: this.state.quantity + 1 });
  },
  minusQuantity() {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  },
  handleAddCart() {
    if (this.props.currentVariant) {
      $('.ms-toast').show();
      $('.ms-toast').addClass('ms-toast-glow');
      this.props.addCart(this.state.quantity)
      .then(() => {
        setTimeout(() => $('.ms-toast').removeClass('ms-toast-glow'), 1000);
      }, () => {
        setTimeout(() => $('.ms-toast').removeClass('ms-toast-glow'), 1000);
      });
    }
  },
  handleBuyNow() {
    if (this.props.currentVariant) {
      const { variants } = this.props;
      for (let i = 0; i < variants.length; i++) {
        if (variants[i].sku.indexOf(this.props.currentVariant) >= 0) {
          this.props.buyNow({ id: variants[i].id, count: this.state.quantity });
        }
      }
    }
  },
  renderColors() {
    const { colors, currentColor } = this.props;
    if (colors && colors.length > 0) {
      const renderColors = colors.map((color) => {
        if (color.variant && color.variant.appImages
        && color.variant.appImages.default && color.variant.appImages.default.length) {
          return (
            <span className={`sku-color${(color.color === currentColor ? ' selected' : '')}`}
              key={color.color} onClick={() => this.props.setColor(color.color)}
            >
              <img alt="sku" src={color.variant.appImages.default[0].url} />
              <span className="sku-disabled-mask"></span>
            </span>
            );
        }
        return null;
      });
      return renderColors;
    }
    return null;
  },
  renderSizes() {
    const { sizes, currentSize } = this.props;
    if (sizes && sizes.length > 0) {
      return sizes.map((size) => (
          <span className={`sku-text${(size.size === currentSize ? ' selected' : '')}` }
            key={size.size} onClick={() => this.props.setSize(size.size)}
          >{size.size}</span>
        )
      );
    }
    return null;
  },
  render() {
    const { show, product, currentColor, currentSize, currentVariant, topImg } = this.props;
    const { activeCurrency } = this.context;
    let style = {};
    if (show) {
      style = {
        zIndex: '51',
        top: '0%',
      };
    }

    const renderTopImg = () => {
      if (topImg && topImg.length) {
        return (
            <div className="sku-img">
              <img alt="" src={topImg[0].url} />
            </div>
          );
      }
      return null;
    };

    const variantTitle = currentVariant ? (`${currentColor},${currentSize}`) : 'please select Color,Size';

    return (
      <div className={`ms-panel${(show ? ' panel-show' : '')}` } style={ style } id="panel-ai-ilcb30cb">
        <div className="ms-panel-header">
          <span className="ms-panel-title">Product Specifications</span>
          <span className="ms-panel-cancel" onClick={this.props.toggle}></span>
        </div>
        <div className="ms-panel-bodyer">
          <section className="ms-sku">
            <header className="sku-header">
              {renderTopImg()}
              <div className="sku-detail">
                <p className="sku-price">
                  <span className="price-span">{activeCurrency} {getProductMainPrice(product, activeCurrency)} </span>
                  / <span className="unit-span">piece</span>
                </p>
                <p className="sku-desc">{variantTitle}</p>
              </div>
            </header>
            <div className="sku-body ms-sku">
              <ul>
                <li>
                  <p className="sku-props-title">Color <span className="current-prop">{currentColor}</span></p>
                  <div className="ms-sku-props">
                    {this.renderColors()}
                  </div>
                </li>
                <li>
                  <p className="sku-props-title">Size <span className="current-prop">{currentSize}</span></p>
                  <div className="ms-sku-props">
                    {this.renderSizes()}
                  </div>
                </li>
              </ul>
              { /*
              <section className="ms-row ms-color-second">
                <p>Ships to</p>
                <span className="ms-row-floatright ms-color-link" data-code="KR">KOREA</span>
                <span className="ms-arrow">
                  <span className="ms-icon icon-arrow-right"></span>
                </span>
              </section>
            */ }
              <section className="ms-quantity">
                <header className="ms-row-title">Quantity&nbsp;</header>
                <p className="ms-numberic-wrap">
                  <span className="ms-numberic-container">
                    <span className="ms-numberic">
                      <span className={`ms-minus${(this.state.quantity <= 1 ? ' disabled' : '')}`}
                        onClick={this.minusQuantity}
                      ><i className="ms-icon icon-minus"></i>
                      </span>
                        <input type="number" min="1" valueLink={this.linkState('quantity')} />
                      <span className="ms-plus" onClick={this.addQuantity}><i className="ms-icon icon-plus"></i></span>
                    </span>
                  </span>
                  { /* <span className="numberic-text">360 pieces Left</span> */ }
                </p>
              </section>
              { /*
              <section className="ms-sku-shipping ms-shipping-wrap">
                <header className="shipping-header">
                  <p className="ms-row-title">
                    <span>Free Shipping</span>
                    <span className="ms-arrow">
                      <span className="ms-icon icon-arrow-down"></span>
                    </span>
                  </p>
                  <div className="shipping-info">
                    <p>
                      <span>From</span>&nbsp;<span className="from-span ms-color-link">China (Mainland)</span>
                        &nbsp;<span>to</span> <span className="to-span ms-color-link">KOREA</span>
                        &nbsp;<span>via</span> China Post Registered Air Mail
                    </p>
                    <p className="ship-out-days">Ships within 60 business days</p>
                  </div>
                  <p className="sku-shipping-error">Cannot ship to selected address</p>
                </header>
                <ul className="ms-shipping-list ms-hide">
                  <li data-index="0" data-service-name="CPAM" data-company="China Post Registered Air Mail" data-cost="Free Shipping">
                    <div className="shipping-title clearfix">
                      <span>Free Shipping</span>
                      <span>15-34 days</span>
                    </div>
                    <p className="shipping-desc">China Post Registered Air Mail</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="1" data-service-name="HKPAM" data-company="HongKong Post Air Mail" data-cost="US $ 4.95">
                    <div className="shipping-title clearfix">
                      <span>US $ 4.95</span>
                      <span>15-34 days</span>
                    </div>
                    <p className="shipping-desc">HongKong Post Air Mail</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="2" data-service-name="EMS" data-company="EMS" data-cost="US $ 16.57">
                    <div className="shipping-title clearfix">
                      <span>US $ 16.57</span>
                      <span>4-6 days</span>
                    </div>
                    <p className="shipping-desc">EMS</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="3" data-service-name="DHL" data-company="DHL" data-cost="US $ 38.38">
                    <div className="shipping-title clearfix">
                      <span>US $ 38.38</span>
                      <span>3-6 days</span>
                    </div>
                    <p className="shipping-desc">DHL</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="4" data-service-name="FEDEX" data-company="Fedex IP" data-cost="US $ 46.52">
                    <div className="shipping-title clearfix">
                      <span>US $ 46.52</span>
                      <span>3-6 days</span>
                    </div>
                    <p className="shipping-desc">Fedex IP</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="5" data-service-name="TNT" data-company="TNT" data-cost="US $ 46.92">
                    <div className="shipping-title clearfix">
                      <span>US $ 46.92</span>
                      <span>3-6 days</span>
                    </div>
                    <p className="shipping-desc">TNT</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="6" data-service-name="UPS" data-company="UPS Express Saver" data-cost="US $ 50.04">
                    <div className="shipping-title clearfix">
                      <span>US $ 50.04</span>
                      <span>3-6 days</span>
                    </div>
                    <p className="shipping-desc">UPS Express Saver</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                  <li data-index="7" data-service-name="UPSE" data-company="UPS Expedited" data-cost="US $ 51.26">
                    <div className="shipping-title clearfix">
                      <span>US $ 51.26</span>
                      <span>3-6 days</span>
                    </div>
                    <p className="shipping-desc">UPS Expedited</p>
                    <i className="ms-icon icon-check"></i>
                  </li>
                </ul>
              </section> */ }
              <section className="ms-detail-btn-wrap">
                <button className="ms-button-secondary" onClick={this.handleAddCart}>Add to cart&nbsp;</button>
                <button className="ms-button-primary" onClick={this.handleBuyNow}>Buy now&nbsp;</button>
              </section>
            </div>
          </section>
        </div>
        <div className="ms-toast">
          <div className="ms-toast-content">Item added to cart</div>
        </div>
      </div>
    );
  },
});
