import React, { PropTypes } from 'react';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
  },
  render() {
    return (
      <ProductList query={this.props.location.query}/>
    );
  },
});
