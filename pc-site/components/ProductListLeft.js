import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    path: PropTypes.array.isRequired,
    children: PropTypes.array.isRequired,
  },
  renderCategories(path, children, index) {
    const lastIndex = path.length - 1;
    const next = () => {
      if (lastIndex > index) {
        return (
          <div className="product-list-category-depth2">
            {this.renderCategories(path, children, index + 1)}
          </div>
        );
      }
      return children.map((child, idx) => (
        <div className="product-list-category-depth2" key={idx}>
          {child.name.ko} ({child.count})
        </div>
      ));
    };

    return (
      <div>
        <div className="product-list-category-depth1">
          <Link to={path[index].link}>
            {lastIndex !== index && <span className="category-arrow">&lt;</span>}
            {path[index].name.ko}
          </Link>
        </div>
        {next()}
      </div>
    );
  },
  render() {
    const { path = [], children = [] } = this.props;
    return (
      <div className="product-list-left-box">
        <div className="product-list-category-title">
          Related Categories
        </div>
        {path.length && this.renderCategories(path, children.filter(c => c.count), 0)}
      </div>
    );
  },
});
