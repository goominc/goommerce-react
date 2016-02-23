import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    path: PropTypes.array.isRequired,
  },
  render() {
    if (!this.props.path || this.props.path.length < 1) {
      // TODO alert
      return;
    }
    const items = [];
    // 2016. 01. 25. [heekyu] http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    //               need keys
    this.props.path.forEach((parent, index) => {
      if (parent.link) {
        items.push(<Link key={index} to={parent.link}><span>{parent.name.ko}</span></Link>);
      } else {
        items.push(<span key={index}>{parent.name.ko}</span>);
      }
      if (index < this.props.path.length - 1) {
        items.push(<span key={`spen${index}`}> > </span>);
      }
    });
    return (
      <div className="container breadcrumb">
        {items}
      </div>
    );
  },
});
