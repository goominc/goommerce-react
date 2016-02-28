import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    categories: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
  },

  render() {
    const { currentCategory } = this.props;
    const renderCategory = () => {
      if (currentCategory && currentCategory.children) {
        return currentCategory.children.map((cat) => {
          let cateLink;
          if (cat.children && cat.children.length === 0) {
            cateLink = '/categories/' + cat.id;
          }
          else {
            cateLink = '/categoryList/' + cat.id;
          }

          return (
            <li key={cat.id}>
              <span className={'icon-' + cat.id}></span>
              <Link to={cateLink} rel="nofollow">{cat.name.en}</Link>
            </li>
            );
        });
      }
    };

    return (
      <article className="category-container">
        <ul className="cate-list clearfix">
          {renderCategory()}
        </ul>
      </article>
    );
  },
});
