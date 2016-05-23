import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import { getProductMainImage, getProductMainPrice } from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    categories: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    products: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },

  render() {
    const { currentCategory } = this.props;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    const renderCategory = () => {
      if (currentCategory && currentCategory.children) {
        return currentCategory.children.map((cat) => {
          if (!cat.isActive) {
            return null;
          }
          const validChildren = [];
          cat.children.forEach((child) => {
            if (child.isActive) {
              validChildren.push(child);
            }
          });
          let cateLink;
          if (validChildren.length === 0) {
            cateLink = `/categories/${cat.id}`;
          } else {
            cateLink = `/categoryList/${cat.id}`;
          }

          return (
            <li key={cat.id}>
              <span className={`icon-${cat.id}`}></span>
              <Link to={cateLink} rel="nofollow">{cat.name[activeLocale]}</Link>
            </li>
            );
        });
      }
      return null;
    };

    const renderProducts = () => {
      const { products } = this.props;
      if (!products || !products.length) {
        return null;
      }

      return products.map((product) => {
        const image = getProductMainImage(product);
        const renderImage = () => {
          if (!image) {
            return <img />;
          }
          if (!image.publicId) {
            return (<img src={image.url} />);
          }
          return (
            <CloudinaryImage publicId={image.publicId}
              version={image.version}
              options={ { width: 220 } }
            />
          );
        };
        return (
          <li key={product.id}>
            <Link className="mobile-product-image" to={`/products/${product.id}`}>
              <div className="inner-wrap">
                {renderImage()}
              </div>
            </Link>
            <div className="price-center">{numberUtil.formatPrice(product[activeCurrency], activeCurrency, currencySign)}</div>
          </li>
          );
      });
    };

    return (
      <article className="category-container">
        <ul className="cate-list clearfix">
          {renderCategory()}
        </ul>
        <section className="products-wrap">
          <div className="recommend-wrap" id="recommend-wrap">
            <ul className="clearfix mobile-product-container" id="recommend-list">
              {renderProducts()}
            </ul>
            <div className="loading"></div>
          </div>
        </section>
      </article>
    );
  },
});
