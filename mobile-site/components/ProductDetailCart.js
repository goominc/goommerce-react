// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import i18n from 'commons/utils/i18n';

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
  alarmSelectColor() {
    const elem = $('#select-color');
    elem.show();
    elem.addClass('ms-toast-glow');
    setTimeout(() => elem.removeClass('ms-toast-glow'), 1000);
  },
  alarmSelectSize() {
    const elem = $('#select-size');
    elem.show();
    elem.addClass('ms-toast-glow');
    setTimeout(() => elem.removeClass('ms-toast-glow'), 1000);
  },
  handleAddCart() {
    if (!this.props.currentColor) {
      this.alarmSelectColor();
      return;
    }
    if (!this.props.currentSize) {
      this.alarmSelectSize();
      return;
    }
    if (this.props.currentVariant) {
      const elem = $('#cart-added');
      elem.show();
      elem.addClass('ms-toast-glow');
      this.props.addCart(this.state.quantity)
      .then(() => {
        setTimeout(() => elem.removeClass('ms-toast-glow'), 1000);
      }, () => {
        setTimeout(() => elem.removeClass('ms-toast-glow'), 1000);
      });
    }
  },
  handleBuyNow() {
    if (!this.props.currentColor) {
      this.alarmSelectColor();
      return;
    }
    if (!this.props.currentSize) {
      this.alarmSelectSize();
      return;
    }
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

    return (
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
        <section className="ms-quantity">
          <header className="ms-row-title">Quantity&nbsp;</header>
          <p className="ms-numberic-wrap">
            <span className="ms-numberic-container">
              <span className="ms-numberic">
                <span className={`ms-minus${(this.state.quantity <= 1 ? ' disabled' : '')}`}
                  onClick={this.minusQuantity}
                ><i lassName="ms-icon icon-minus"></i>
                </span>
                  <input type="number" min="1" valueLink={this.linkState('quantity')} />
                <span className="ms-plus" onClick={this.addQuantity}><i className="ms-icon icon-plus"></i></span>
              </span>
            </span>
            { /* <span className="numberic-text">360 pieces Left</span> */ }
          </p>
        </section>
        <section className="ms-detail-btn-wrap">
          <button className="ms-button-secondary" onClick={this.handleAddCart}>{i18n.get('pcItemDetail.cart')}&nbsp;</button>
          <button className="ms-button-primary" onClick={this.handleBuyNow}>{i18n.get('pcItemDetail.orderNow')}&nbsp;</button>
        </section>
        <div id="cart-added" className="ms-toast">
          <div className="ms-toast-content">{i18n.get('pcCart.popupProductAdded')}</div>
        </div>
        <div id="select-color" className="ms-toast red">
          <div className="ms-toast-content">{i18n.get('pcItemDetail.selectColor')}</div>
        </div>
        <div id="select-size" className="ms-toast red">
          <div className="ms-toast-content">{i18n.get('pcItemDetail.selectSize')}</div>
        </div>
      </div>
    );
  },
});
