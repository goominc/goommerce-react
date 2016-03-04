import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const { brandId } = this.props.params;
    const genLink = ({ pageNum, categoryId }) => ({
      pathname: `/brands/${brandId}${pageNum ? `/${pageNum}` : ''}`,
      query: { categoryId },
    });
    const { params, location } = this.props;
    const query = defaults({}, params, location.query);
    return (
      <ProductList {...query} genLink={genLink}/>
    );
  },
});
