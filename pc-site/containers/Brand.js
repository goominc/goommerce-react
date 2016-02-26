import React, { PropTypes } from 'react';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
  },
  render() {
    const { brandId } = this.props.params;
    const genLink = ({ pageNum, categoryId }) => ({
      pathname: `/brands/${brandId}${pageNum ? `/${pageNum}` : ''}`,
      query: { categoryId },
    });
    return (
      <ProductList {...this.props.params} genLink={genLink}/>
    );
  },
});
