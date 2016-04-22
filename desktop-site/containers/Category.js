import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from 'containers/ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const genLink = ({ pageNum, brandId, categoryId, sorts, KRW }) => ({
      pathname: `/categories/${categoryId}${pageNum ? `/${pageNum}` : ''}`,
      query: { brandId, sorts, KRW },
    });
    const { params, location } = this.props;
    const query = defaults({}, params, location.query);
    if (!query.sorts) {
      query.sorts = '-id';
    }
    return (
      <ProductList {...query} genLink={genLink} />
    );
  },
});
