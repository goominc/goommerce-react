import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { searchProducts } from '../redux/actions';
import ProductThumbnail from '../components/ProductThumbnail';

const Search = React.createClass({
  propTypes: {
    query: PropTypes.object,
    searchProducts: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.props.searchProducts(this.props.query).then(res => this.setState({
      products: res.products,
    }));
  },
  render() {
    const { products = [] } = this.state;
    return (
      <div className="row">
        {products.map(product => <ProductThumbnail key={product.id} product={product}/>)}
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({ query: ownProps.location.query }),
  { searchProducts }
)(Search);
