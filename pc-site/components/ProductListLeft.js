import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { get, pick } from 'lodash';

export default React.createClass({
  propTypes: {
    category: PropTypes.object,
    categories: PropTypes.object.isRequired,
    genLink: PropTypes.func.isRequired,
    aggs: PropTypes.object.isRequired,
    brand: PropTypes.object,
    query: PropTypes.string,
    brandId: PropTypes.string,
    categoryId: PropTypes.string,
    pageNum: PropTypes.string,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  renderBrands() {
    const { activeLocale } = this.context;
    const { aggs: { brands = [] }, genLink } = this.props;

    if (this.props.brand) {
      const link = genLink(pick(this.props, ['query', 'categoryId', 'pageNum']));
      return (
        <div className="product-list-category-title">
          Selected Brand:
          <div>
            {this.props.brand.data.name[activeLocale]}
            <Link to={link}><span>(X)</span></Link>
          </div>
        </div>
      );
    }

    const brandLink = (brandId) => {
      return genLink(Object.assign(pick(this.props, ['query', 'categoryId']), { brandId }));
    };

    return (
      <div>
        <div className="product-list-category-title">
          Related Brands
        </div>
        {brands.map((b) => (
          <div key={b.id} className="product-list-category-depth1">
            <Link to={brandLink(b.id)}>
              {b.data.name[activeLocale]} ({b.doc_count})
            </Link>
          </div>
        ))}
      </div>
    );
  },
  renderCategories() {
    const { activeLocale } = this.context;
    const { aggs, category, categories, genLink } = this.props;
    if (!category || !categories) {
      return undefined;
    }

    const categoryLink = (categoryId) => {
      return genLink(Object.assign(pick(this.props, ['query', 'brandId']), { categoryId }));
    };

    const childCategories = category.children
      .filter((c) => get(aggs, `categories.${c.id}.doc_count`))
      .map((c, index) => (
        <div className="product-list-category-depth2" key={index}>
          <Link to={categoryLink(c.id)}>
            {c.name[activeLocale]} ({aggs.categories[c.id].doc_count})
          </Link>
        </div>
      ));

    function ancestor(c) {
      if (!c) return [];
      return ancestor(categories[c.parentId]).concat(c);
    }

    const render = (list) => {
      if (list.length) {
        const next = () => list.length === 1 ? childCategories : (
          <div className="product-list-category-depth2">
            {render(list.slice(1))}
          </div>
        );
        return (
          <div>
            <div className="product-list-category-depth1">
              <Link to={categoryLink(list[0].id)}>
                {list.length !== 1 && <span className="category-arrow">&lt;</span>}
                {list[0].name[activeLocale]}
              </Link>
            </div>
            {next()}
          </div>
        );
      }
    };

    return render(ancestor(category));
  },
  render() {
    return (
      <div className="product-list-left-box">
        <div className="product-list-category-title">
          Related Categories
        </div>
        {this.renderCategories()}
        {this.renderBrands()}
      </div>
    );
  },
});
