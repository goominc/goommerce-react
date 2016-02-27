import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from '../redux/actions';
const { loadProduct } = ApiAction;

import ProductDetailPage from '../components/ProductDetailPage';

const ProductDetail = React.createClass({
  componentDidMount() {
    this.props.setHeader(false, true, true, 'Detail');
  },
  render() {
    return (
      <ProductDetailPage />
      );
  },
});

export default connect(
  undefined,
  { loadProduct, setHeader }
)(ProductDetail);
