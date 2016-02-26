import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const { params, location } = this.props;
    const genLink = ({ pageNum, brandId, categoryId }) => ({
      pathname: `/search/${params.query}${pageNum ? `/${pageNum}` : ''}`,
      query: { brandId, categoryId },
    });
    const query = defaults({}, params, location.query);
    return (
      <ProductList {...query} genLink={genLink}/>
    );
  },
});
