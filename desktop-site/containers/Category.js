import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from 'containers/ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const genLink = ({ pageNum, brandId, categoryId }) => ({
      pathname: `/categories/${categoryId}${pageNum ? `/${pageNum}` : ''}`,
      query: { brandId },
    });
    const { params, location } = this.props;
    const query = defaults({}, params, location.query);
    return (
      <ProductList {...query} genLink={genLink}/>
    );
  },
});
