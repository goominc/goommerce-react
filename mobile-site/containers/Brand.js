import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { addFavoriteBrand } = ApiAction;
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

import BrandPage from 'components/BrandPage';

const fetchSize = 10;

const Brand = React.createClass({
  propTypes: {
    setHeader: PropTypes.func.isRequired,
    searchProducts: PropTypes.func.isRequired,
    addFavoriteBrand: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    brandId: PropTypes.string.isRequired,
  },
  getInitialState() {
    return { currentCount: 0, maxCount: 0 };
  },
  componentDidMount() {
    this.props.setHeader(false, false, true, 'Store');
    this.doSearch(this.props);
    $(window).scroll(() => {
      if ($(window).scrollTop() + window.innerHeight === $(document).height()) {
        this.doFetch();
      }
    });
  },
  componentWillUnmount() {
    $(window).unbind('scroll');
  },
  doSearch(props) {
    const { brandId } = props;
    this.props.searchProducts({
      // q: query,
      // categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      brandId,
      offset: 0,
      fetchSize,
    }).then((res) => {
      this.setState({ aggs: res.aggs, brand: res.brand, pagination: res.pagination,
        products: res.products, currentCount: res.products.length, maxCount: res.pagination.total });
    });
  },
  doFetch() {
    const { brandId } = this.props;
    const { currentCount, maxCount } = this.state;
    if (currentCount === maxCount) {
      return;
    }
    this.props.searchProducts({
      // q: params.query ? params.query : undefined,
      // categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      brandId,
      offset: currentCount,
      limit: fetchSize,
    }).then((res) => {
      const mergeProducts = this.state.products.concat(res.products);
      this.setState({ products: mergeProducts, currentCount: mergeProducts.length });
    });
  },
  render() {
    const { brand, products } = this.state;
    if (!brand) {
      return (<div />);
    }
    return (
      <BrandPage brand={brand} products={products} addFavoriteBrand={this.props.addFavoriteBrand} />
      );
  },
});

export default connect(
  (state, ownProps) => ({
    brandId: ownProps.params.brandId,
    searchProducts: (query) => ajaxReturnPromise(state.auth, `/api/v1/products/search?${$.param(query)}`, 'get'),
  }),
  { addFavoriteBrand, setHeader }
)(Brand);
