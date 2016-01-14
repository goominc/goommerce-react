import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../redux/actions';
import loadEntities from '../redux/util/loadEntities';

import ProductThumbnail from '../components/ProductThumbnail';

const Home = React.createClass({
  propTypes: {
    products: PropTypes.array,
    loadProducts: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProducts();
  },
  render() {
    const { products = [] } = this.props;
    return (
      <div className="row">
        {products.map(product => <ProductThumbnail key={product.id} product={product}/>)}
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'products', 'products'),
  { loadProducts }
)(Home);
