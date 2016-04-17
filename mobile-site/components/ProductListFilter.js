import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    aggs: PropTypes.object,
    filterPrice: PropTypes.string,
    filterBrand: PropTypes.number,
    setPrice: PropTypes.func.isRequired,
    setBrand: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    apply: PropTypes.func.isRequired,
  },

  render() {
    const { show, aggs, filterPrice, filterBrand } = this.props;
    if (show) {
      const windowHeight = $(window).height();
      $('#root').css({
        overflow: 'hidden',
        height: windowHeight,
      });
    } else {
      $('#root').css({
        overflow: 'auto',
        height: 'inherit',
      });
    }
    const renderPrice = () => {
      if (!aggs || !aggs.KRW_ranges || !aggs.KRW_ranges.length) {
        return null;
      }
      return aggs.KRW_ranges.map((range) => {
        const setFilterPrice = (key) => {
          this.props.setPrice(key);
        };
        return (
          <div className={`filter-item filter-price ${range.key === filterPrice ? 'active' : ''}`}
            key={range.key} onClick={() => setFilterPrice(range.key)}
          >
            {range.key}
          </div>
          );
      });
    };
    const renderBrand = () => {
      if (!aggs || !aggs.brands || !aggs.brands.length) {
        return null;
      }
      return aggs.brands.map((brand) => {
        const setFilterBrand = (key) => {
          this.props.setBrand(key);
        };
        return (
          <div className={`filter-item filter-brand ${brand.key === filterBrand ? 'active' : ''}`}
            key={brand.key} onClick={() => setFilterBrand(brand.key)}
          >
            {brandUtil.getName(brand)}({brand.doc_count || 0})
          </div>
          );
      });
    };


//  style="display: block; width: 304px; height: 659px; left: 108px;"
//  width height
//  style="height: 607px; overflow: auto;"
    return (
      <div>
        <div className="refine-wrapper"
          style={{ display: show ? 'block' : 'none', width: show ? '80%' : '' }}
        >
          <div className="refine-wrapper-inner">
            <div className="refine-title">
              Filter
              <span className="refine-cancel" onClick={this.props.toggle}></span>
            </div>
            <div className="refine-main">
              <div className="refine-main-inner">
                <div className="filter-group">
                  <p className="filter-title">가격</p>
                  <div className="filter-item-group">
                    {renderPrice()}
                  </div>
                </div>
                <div className="filter-group">
                  <p className="filter-title">브랜드</p>
                  <div className="filter-item-group">
                    {renderBrand()}
                  </div>
                </div>

                { /* TODO category & property filter
                <div className="refine-field">
                  <div className="r-item r-category">
                    <span className="r-key">Categories</span>
                    <span className="r-value " id="j-categoryName">Dresses</span>
                  </div>
                  <ul className="properties">
                    <li className="r-item property">
                      <span className="r-key">Sleeve Length</span>
                      <span className="r-value" data-vid="" data-pid="100007732">All</span>
                    </li>
                    <li className="r-item property">
                      <span className="r-key">Dresses Length</span>
                      <span className="r-value" data-vid="" data-pid="200000446">All</span>
                    </li>
                    <li className="r-item property">
                      <span className="r-key">Fabric Type</span>
                      <span className="r-value" data-vid="" data-pid="100002012">All</span>
                    </li>
                  </ul>
                </div> */ }
                { /* TODO on-off style filter
                <div className="refine-field">
                  <div className="r-item r-freeShip">
                    <span className="r-key-onoff">Free shipping&nbsp;</span>
                    <span className="onoff" id="j-free-ship" data-action="off-on">
                      <label></label> <i></i> <b className="small-round"></b>
                    </span>
                  </div>
                  <div className="r-item r-onlyPiece">
                    <span className="r-key-onoff">One piece only&nbsp;</span>
                    <span className="onoff" id="j-piece-only" data-action="off-on">
                                    <label></label>
                                    <i></i>
                                    <b className="small-round"></b>
                                </span>
                  </div>
                </div> */ }
              </div>
            </div>
            <div className="refine-button">
              <input type="button" value="Apply" className="apply-btn" onClick={this.props.apply} />
              <input type="button" value="Reset" className="reset-btn" onClick={this.props.reset} />
            </div>
          </div>
        </div>
        <div className="refine-mask"
          style={{ display: show ? 'block' : 'none', width: show ? '20%' : '' }} onClick={this.props.toggle}
        >
          <span className="i-mask-round"></span>
        </div>
      </div>
    );
  },
});
