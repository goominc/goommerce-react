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
    function genPageLink(pageNum) {
      return {
        pathname: `/search/${params.query}/${pageNum}`,
        query: location.query,
      };
    }
    const query = defaults({}, params, location.query);
    return (
      <ProductList {...query} genPageLink={genPageLink}/>
    );
  },
});
