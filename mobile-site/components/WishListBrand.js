import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import { getProductMainImage, getProductMainPrice } from '../../desktop-site/util';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    brand: PropTypes.array,
    delete: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { show, brand } = this.props;
    const renderBrand = $.map(brand, (item) => {
      const deleteBrand = (event) => {
        event.preventDefault();
        this.props.delete(item.id);
      };
      return (
          <li className="clearfix" key={item.id}>
            <Link to={`/brands/${item.id}`}>
              <div className="store-name">{item.name.en}</div>
              <div className="store-feedback">NO.{item.id}</div>
              <div className="store-feedback-score delete clearfix">
                100950
                { /* <img src="http://i01.i.aliimg.com/wimg/feedback/icon/32-s.gif" /> */ }
                <i className="ms-icon icon-remove fr" onClick={deleteBrand}></i>
              </div>
            </Link>
          </li>
        );
    });

    return (
      <div className="tab-pane" style={{ display: show ? 'block' : 'none' }}>
        <ul className="store-list">
          {renderBrand}
          { /* <li className="empty"></li> */ }
        </ul>
      </div>
    );
  },
});
