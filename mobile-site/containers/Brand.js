import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, toggleSignRegister, setHeader } from 'redux/actions';
const { addFavoriteBrand } = ApiAction;
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

import BrandPage from 'components/BrandPage';

const fetchSize = 10;

const Brand = React.createClass({
  propTypes: {
    setHeader: PropTypes.func.isRequired,
    searchProducts: PropTypes.func.isRequired,
    addFavoriteBrand: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    brandId: PropTypes.string.isRequired,
  },
  getInitialState() {
    return { currentCount: 0, maxCount: 0 };
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: false,
      showSearch: false,
      showCart: true,
      titleText: '브랜드',
    });
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
      this.setState({ aggs: res.aggs, brand: res.aggs.brands[0], pagination: res.pagination,
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
  wrapFavorite(id) {
    const { auth } = this.props;
    if (auth.bearer) {
      return this.props.addFavoriteBrand(id);
    }
    this.props.toggleSignRegister(true, 'sign');
    return null;
  },
  render() {
    const { brand, products } = this.state;
    if (!brand) {
      return (<div />);
    }
    return (
      <BrandPage brand={brand} products={products} addFavoriteBrand={this.wrapFavorite} />
      );
  },
});

export default connect(
  (state, ownProps) => ({
    auth: state.auth,
    brandId: ownProps.params.brandId,
    searchProducts: (query) => ajaxReturnPromise(state.auth, 'get', `/api/v1/products/search?${$.param(query)}`),
  }),
  { addFavoriteBrand, toggleSignRegister, setHeader }
)(Brand);
