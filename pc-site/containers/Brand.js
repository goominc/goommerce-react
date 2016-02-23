import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual, pick } from 'lodash';

import ProductThumbnail from '../components/ProductThumbnail';

import { ApiAction } from '../redux/actions';
const { searchProducts } = ApiAction;

const Brand = React.createClass({
  propTypes: {
    brandId: PropTypes.string.isRequired,
    searchProducts: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.doSearch(this.props);
  },
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.brandId, nextProps.brandId)) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    props.searchProducts(pick(this.props, 'brandId')).then(res => this.setState({
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
  (state, ownProps) => ({ brandId: ownProps.params.brandId }),
  { searchProducts }
)(Brand);
