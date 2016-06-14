import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import i18n from 'commons/utils/i18n';
import { getProductMainImage } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { products } = this.props;
    const { activeCurrency } = this.context;

    const prodDiv = products.map((product) => {
      const img = getProductMainImage(product);
      const renderImage = () => {
        if (!img) {
          return <img />;
        }
        if (!img.publicId) {
          return (<img src={img.url} />);
        }
        return (
          <CloudinaryImage
            publicId={img.publicId}
            version={img.version}
            options={ { width: 220 } }
          />
        );
      };
      if (img) {
        return (
          <li key={product.id}>
            <Link className="mobile-product-image" to={`/products/${product.id}`}>
              <div className="inner-wrap">
                {renderImage()}
              </div>
            </Link>
          </li>
        );
      }
      return (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="mobile-product-image">
              <img />
            </div>
          </Link>
        </li>
      );
    });

    return (
      <section className="promotion-block today-deals">
        <header>
          <div style={({ padding: '0 8px' })}>{`${i18n.get('pcFooter.hot')} ${i18n.get('pcFooter.items')}`}</div>
          {/*<Link to="/categories/4">동대문 핫신상</Link>*/}
        </header>
        <article>
          <ul className="clearfix mobile-product-container">
            {prodDiv}
          </ul>
        </article>
        <Link to="/categories/4" className="ui-button ui-button-third">View more&nbsp;</Link>
      </section>
    );
  },
});
