import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import ProductThumbnail from '../components/ProductThumbnail';

import { ApiAction } from '../redux/actions';
const { searchProducts } = ApiAction;

const Search = React.createClass({
  propTypes: {
    query: PropTypes.object,
    searchProducts: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.doSearch(this.props);
  },
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.query, nextProps.query)) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    props.searchProducts(props.query).then(res => this.setState({
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
