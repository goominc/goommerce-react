import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

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

    const categoryLink = (categoryId) => genLink(Object.assign(_.pick(this.props, ['query', 'sorts']), { categoryId }));
    const renderTop = (root) => {
      if (!root.isActive) {
        return null;
      }
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
      const dfs = (child, parent) => {
        const renderWithSibling = (elem, category2, siblings, renderSibling) => {
          const res = [];
          siblings.forEach((sibling) => {
            if (!sibling.isActive) {
              return;
            }
            if (sibling.id === category2.id) {
              res.push(elem);
            } else {
              res.push(renderSibling(sibling));
            }
          });
          return res;
        };
        if (child.id === category.id) {
          const elem = (
            <div key={child.id} className="product-list-category-indent">
              <Link className="product-list-category-item active" to={categoryLink(child.id)}>
                {child.name[activeLocale]} {categoryCount(child.id)}
              </Link>
              {renderChildOfCategory(child.children)}
            </div>
          );
          if (parent) {
            return renderWithSibling(elem, child, parent.children, (sibling) => (
              <div key={sibling.id} className="product-list-category-indent">
                <Link className="product-list-category-item" to={categoryLink(sibling.id)}>
                  {sibling.name[activeLocale]}
                </Link>
              </div>
            ));
          }
          return elem;
        }
        if (!child.isActive || !child.children || child.children.length < 1) {
        // if (!child.children || child.children.length < 1) {
          return null;
        }
        let foundElem = null;
        for (let i = 0; i < child.children.length; i++) {
          const child2 = child.children[i];
          const c = dfs(child2, child);
          if (c) {
            foundElem = c;
          }
        }
        if (foundElem) {
          const currentElem = (
            <div key={child.id} className="product-list-category-indent">
              <Link className="product-list-category-item active" to={categoryLink(child.id)}>
                {child.name[activeLocale]}
              </Link>
              {foundElem}
            </div>
          );
          const renderSibling = (sibling) => (
            <div key={sibling.id} className="product-list-category-indent">
              <Link className="product-list-category-item" to={categoryLink(sibling.id)}>
                {sibling.name[activeLocale]}
              </Link>
            </div>
          );
          return renderWithSibling(currentElem, child, parent.children, renderSibling);
        }
        return null;
      };
      const renderChildren = () => {
        if (root.id === category.id) {
          return renderChildOfCategory(root.children);
        }
        return (root.children || []).map((child) => dfs(child, root));
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
  },
  render() {
    return (
      <div className="product-list-left-box">
        <Link to="/categories/4" className="title">{i18n.get('word.categories')}</Link>
        {this.renderCategories()}
      </div>
    );
  },
});
