import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    parents: PropTypes.array.isRequired,
  },
  render() {
    if (!this.props.parents || this.props.parents.length < 1) {
      // TODO alert
      return;
    }
    const items = [];
    this.props.parents.forEach((parent, index) => {
      if (parent.link) {
        items.push(<a href={parent.link}><span>{parent.name}</span></a>);
      } else {
        items.push(<span>{parent.name}</span>);
      }
      if (index < this.props.parents.length - 1) {
        items.push(<span> > </span>);
      }
    });
    return (
      <div className="container breadcrumb">
        {items}
      </div>
    );
  },
});
