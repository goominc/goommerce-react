import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getProductMainImage, getProductMainPrice } from 'commons/utils/productUtil';
import productUtil from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    wishes: PropTypes.object,
    delete: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { show, wishes } = this.props;
    const renderWish = $.map(wishes, (wish) => {
      const image = getProductMainImage(wish.product.topHit || wish.product);
      const renderImage = () => {
        if (!image) {
          return (<img />);
        }
        return (<img src={image.url} />);

        /* if (!image.publicId) {
          return (<img src={image.url} />);
        }
        return (
          <CloudinaryImage publicId={image.publicId}
            version={image.version}
            options={ { width: 220, height: 330 } }
          />
        ); */
      };
      const deleteWish = (event) => {
        event.preventDefault();
        this.props.delete(wish.id);
      };
      return (
        <li key={wish.id} className="clearfix">
          <Link to={`/products/${wish.product.id}`}>
            <div className="left">
              <div className="prod-pic">
                {renderImage()}
              </div>
            </div>
            <div className="right">
              <div className="prod-name">{productUtil.getName(wish.product)}
              </div>
              <div className="prod-price">
                US ${wish.product.USD}
              </div>
              <div>
                <del className="prod-delete">US ${wish.product.USD}</del>
              </div>
              <i className="ms-icon icon-remove delete" onClick={deleteWish}></i>
            </div>
          </Link>
        </li>
        );
    });


    return (
      <div className="tab-pane" style={{ display: show ? 'block' : 'none' }}>
        <ul className="product-list" >
          {renderWish}
          { /* <li className="empty"></li> */ }
        </ul>
      </div>
    );
  },
});
