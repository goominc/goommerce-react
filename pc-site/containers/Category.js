import React, { PropTypes } from 'react';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
  },
  render() {
    const genLink = ({ pageNum, brandId, categoryId }) => ({
      pathname: `/categories/${categoryId}${pageNum ? `/${pageNum}` : ''}`,
      query: { brandId },
    });
    return (
      <ProductList {...this.props.params} genLink={genLink}/>
    );
  },
});
