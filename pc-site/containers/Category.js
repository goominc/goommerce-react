import React, { PropTypes } from 'react';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
  },
  render() {
    const { categoryId } = this.props.params;
    function genPageLink(pageNum) {
      return { to: `/categories/${categoryId}/${pageNum}` };
    }
    return (
      <ProductList {...this.props.params} genPageLink={genPageLink}/>
    );
  },
});
