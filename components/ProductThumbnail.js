import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
  },
  render: function render() {
    const { data } = this.props.product;
    return (
      <div>{data.ko}</div>
    );
  },
});
