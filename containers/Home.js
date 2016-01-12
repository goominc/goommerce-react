import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../redux/actions';
import { loadEntities } from '../redux/util/loadEntities';

const Product = React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
  },
  render: function render() {
    const { data } = this.props.product;
    return (
      <div>{data.ko}</div>
    );
  },
});

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
      <div>
        {products.map(product => <Product key={product.id} product={product}/>)}
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'products', 'products'),
  { loadProducts }
)(Home);
