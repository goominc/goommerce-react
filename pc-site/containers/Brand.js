import React, { PropTypes } from 'react';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
  },
  render() {
    const { brandId } = this.props.params;
    function genPageLink(pageNum) {
      return { to: `/brands/${brandId}/${pageNum}` };
    }
    return (
      <ProductList {...this.props.params} genPageLink={genPageLink}/>
    );
  },
});
