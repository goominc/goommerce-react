import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { get, pick } from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import i18n from 'commons/utils/i18n';

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
  renderCategories() {
    const { activeLocale } = this.context;
    const { aggs, category, categories, genLink } = this.props;
    if (!category || !categories || !aggs) {
      return undefined;
    }
    const tree = categories.tree;

    const categoryCount = (categoryId) => {
      if (!aggs || !aggs.categories || !aggs.categories[categoryId]) {
        return '';
      }
      return `(${aggs.categories[categoryId].doc_count})`;
    };

    const categoryLink = (categoryId) => genLink(Object.assign(pick(this.props, ['query', 'sorts']), { categoryId }));
    const renderTop = (root) => {
      const renderChildOfCategory = (children) => {
        if (!children) {
          return null;
        }
        return children.filter((child) => child.isActive).map((child) => (
          <div key={child.id} className="product-list-category-indent">
            <Link className="product-list-category-item sub" to={categoryLink(child.id)}>
              {child.name[activeLocale]} {categoryCount(child.id)}
            </Link>
          </div>
        ));
      };
      const dfs = (child) => {
        if (child.id === category.id) {
          return (
            <div key={child.id} className="product-list-category-indent">
              <Link className="product-list-category-item active" to={categoryLink(child.id)}>
                {child.name[activeLocale]} {categoryCount(child.id)}
              </Link>
              {renderChildOfCategory(child.children)}
            </div>
          );
        }
        if (!child.isActive || !child.children || child.children.length < 1) {
        // if (!child.children || child.children.length < 1) {
          return null;
        }
        for (let i = 0; i < child.children.length; i++) {
          const child2 = child.children[i];
          const c = dfs(child2);
          if (c) {
            return (
              <div key={child.id} className="product-list-category-indent">
                <Link className="product-list-category-item" to={categoryLink(child.id)}>
                  {child.name[activeLocale]}
                </Link>
                {c}
              </div>
            );
          }
        }
        return null;
      };
      const renderChildren = () => {
        if (root.id === category.id) {
          return renderChildOfCategory(root.children);
        }
        return (root.children || []).map((child) => dfs(child));
      };
      return (
        <div key={root.id} className="product-list-top-category">
          <Link className={`product-list-category-title ${root.id === category.id ? 'active' : ''}`} to={categoryLink(root.id)}>
            {root.name[activeLocale]} {`${root.id === category.id ? categoryCount(root.id) : ''}`}
          </Link>
          {renderChildren()}
        </div>
      );
    };
    return (
      <div>
        {tree.children.map(renderTop)}
      </div>
    );
/*
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
      if (!c) {
        return [];
      }
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
      return '';
    };

    return render(ancestor(category));
    */
  },
  render() {
    return (
      <div className="product-list-left-box">
        <Link to="/categories/all" className="title">카테고리</Link>
        {this.renderCategories()}
      </div>
    );
  },
});
