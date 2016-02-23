import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    path: PropTypes.array.isRequired,
  },
  renderPath(path, index) {
    function next() {
      if (path.length > index + 1) {
        return (
          <div className="product-list-category-depth2">
            {this.renderPath(path, index + 1)}
          </div>
        );
      }
    }
    return (
      <div>
        <div className="product-list-category-depth1">
          <Link to={path[index].link}>
            <span className="category-arrow">&lt;</span>{path[index].name.ko}
          </Link>
        </div>
        {next.bind(this)()}
      </div>
    );
  },
  render() {
    const { path = [] } = this.props;
    return (
      <div className="product-list-left-box">
        <div className="product-list-category-title">
          Related Categories
        </div>
        {path.length && this.renderPath(path, 0)}
      </div>
    );
  },
});
