import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { searchProducts } = ApiAction;

import BrandPage from 'components/BrandPage';

const Brand = React.createClass({
  propTypes: {
    setHeader: PropTypes.func.isRequired,
    searchProducts: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    brandId: PropTypes.string.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.props.setHeader(false, false, true, 'Store');
    this.doSearch(this.props);
  },
  doSearch(props) {
    const { brandId } = props;
    const size = 30;
    this.props.searchProducts({
      //q: query,
      //categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      brandId,
      from: 0,
      size,
    }).then((res) => this.setState(res));
  },
  render() {
    const { brand, products } = this.state;
    if (!brand) {
      return (<div />);
    }
    return (
      <BrandPage brand={brand} products={products} />
      );
  },
});

export default connect(
  (state, ownProps) => ({
    brandId: ownProps.params.brandId,
  }),
  { searchProducts, setHeader }
)(Brand);
