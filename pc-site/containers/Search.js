import React, { PropTypes } from 'react';
import { defaults } from 'lodash';

import ProductList from './ProductList';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  render() {
    const query = defaults({}, this.props.params, this.props.location.query);
    return (
      <ProductList {...query}/>
    );
  },
});
