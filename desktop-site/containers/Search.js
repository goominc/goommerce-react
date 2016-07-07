import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from 'containers/ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const { params, location } = this.props;
    const genLink = ({ query, pageNum, brandId, categoryId, sorts, KRW }) => {
      let pathname = query ? `/search/${query}` : '/categories/4';
      if (pageNum) {
        pathname = `${pathname}/${pageNum}`;
      }
      return {
        pathname,
        query: { brandId, categoryId, sorts, KRW },
      };
    };
    const query = defaults({}, params, location.query);
    return (
      <ProductList {...query} genLink={genLink} />
    );
  },
});
