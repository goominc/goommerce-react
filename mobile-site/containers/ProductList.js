import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual, pick } from 'lodash';

import { ApiAction, setHeader, changeViewType, toggleProductSort,
         sortProduct, filterProduct, toggleProductFilter } from '../redux/actions';
const { loadCategories } = ApiAction;
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';
import i18n from 'commons/utils/i18n';

import ProductListItem from 'components/ProductListItem';
import ProductListFilter from 'components/ProductListFilter';

const fetchSize = 10;

const ProductList = React.createClass({
  propTypes: {
    viewType: PropTypes.object.isRequired,
    showSort: PropTypes.bool.isRequired,
    sorts: PropTypes.string.isRequired,
    showFilter: PropTypes.bool.isRequired,
    categories: PropTypes.object,
    searchProducts: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    changeViewType: PropTypes.func.isRequired,
    toggleProductSort: PropTypes.func.isRequired,
    sortProduct: PropTypes.func.isRequired,
    filterProduct: PropTypes.func.isRequired,
    toggleProductFilter: PropTypes.func.isRequired,
    filterPrice: PropTypes.string,
    filterBrand: PropTypes.number,
    params: PropTypes.object,
  },
  getInitialState() {
    return { currentCount: 0, maxCount: 0 };
  },
  componentDidMount() {
    const { params } = this.props;
    this.props.setHeader({
      showLogo: false,
      showSearch: true,
      showCart: true,
      titleText: '',
    });
    this.doSearch(this.props);
    if (params.categoryId) {
      if (params.categoryId === 'all') {
        this.props.setHeader({
          showLogo: false,
          showSearch: true,
          showCart: true,
          titleText: '전체',
        });
      } else {
        this.props.loadCategories().then(() => {
          this.props.setHeader({
            showLogo: false,
            showSearch: true,
            showCart: true,
            titleI18NObj: this.props.categories[params.categoryId].name,
          });
        });
      }
    } else {
      this.props.setHeader({
        showLogo: false,
        showSearch: true,
        showCart: true,
        titleText: '검색 결과',
      });
    }

    $(window).scroll(() => {
      if ($(window).scrollTop() + window.innerHeight === $(document).height()) {
        this.doFetch();
      }
    });
  },
  componentWillReceiveProps(nextProps) {
    const props = ['params', 'filterPrice', 'filterBrand'];
    if (!isEqual(pick(this.props, props), pick(nextProps, props))) {
      // reset state for clear filter args
      if (!isEqual(pick(this.props, ['params']), pick(nextProps, ['params']))) {
        this.props.filterProduct();
      }
      this.setState({ currentCount: 0, maxCount: 0 });
      this.doSearch(nextProps);
    }
    if (!isEqual(this.props.sorts, nextProps.sorts)) {
      this.doSearch(nextProps);
    }
  },
  componentWillUnmount() {
    $(window).unbind('scroll');
  },
  setFilterPrice(key) {
    this.setState({ filterPrice: key });
  },
  setFilterBrand(key) {
    this.setState({ filterBrand: key });
  },
  resetFilter() {
    this.setState({ filterPrice: null, filterBrand: null });
  },
  applyFilter() {
    // TODO update URL and integrate filter props into params
    this.props.toggleProductFilter();
    this.props.filterProduct(this.state.filterPrice, this.state.filterBrand);
  },
  doSearch(props) {
    const { params, sorts, filterBrand } = props;
    this.props.searchProducts({
      q: params.query ? params.query : undefined,
      categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      brandId: filterBrand,
      offset: 0,
      limit: fetchSize,
      sorts,
      aggs: 'categories:50',
    }).then((res) => {
      this.setState({
        products: res.products,
        currentCount: res.products.length,
        maxCount: res.pagination.total,
        aggs: res.aggs,
      });
    });
  },
  doFetch() {
    const { params, sorts, filterBrand } = this.props;
    const { currentCount, maxCount } = this.state;
    if (currentCount === maxCount) {
      return;
    }
    $('.list-main .loading').show();
    this.props.searchProducts({
      q: params.query ? params.query : undefined,
      categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      brandId: filterBrand,
      offset: currentCount,
      limit: fetchSize,
      sorts,
    }).then((res) => {
      const mergeProducts = this.state.products.concat(res.products);
      this.setState({ products: mergeProducts, currentCount: mergeProducts.length });
      $('.list-main .loading').hide();
    });
  },
  render() {
    const { viewType, showSort, sorts, showFilter } = this.props;

    let sortStyle = {};
    if (showSort) {
      const xPos = $('.user-operation').position().top + $('.user-operation').height();
      sortStyle = { display: 'block', top: xPos };
    }
    const sortItems = [
      { name: i18n.get('pcMain.productList.sortLowPrice'), sorts: 'KRW.num' },
      { name: i18n.get('pcMain.productList.sortHighPrice'), sorts: '-KRW.num' },
      { name: i18n.get('pcMain.productList.sortLatest'), sorts: '-id' },
    ];
    const renderSort = () =>
      sortItems.map((item) =>
          <li className={sorts === item.sorts ? 'selected' : ''} key={item.sorts}
            onClick={() => this.props.sortProduct(item.sorts)}
          >
            {item.name}
          </li>
      );


    return (
      <section className="list-main">
        <header className="user-operation">
          <div className="clearfix">
            <span className={`sort-by ${(showSort ? 'shrink-arrow clickable' : 'expand-arrow')}`}
              onClick={this.props.toggleProductSort}
            >
              Sort by
            </span>
            <span className="refine-filter" onClick={this.props.toggleProductFilter}>
              Filter
            </span>
            <span className="line_between"></span>
            <span className={`view-switching ${viewType.next}`} onClick={this.props.changeViewType}></span>
          </div>
        </header>
        <section className="sort-by-list-wrapper" id="j-sortbar-new" style={sortStyle}>
          <ul className="sort-by-list">
            {renderSort()}
          </ul>
        </section>
        <section className="sort-by-mask" id="j-sort-by-mask" style={ { display: showSort ? 'block' : 'none' } }
          onClick={this.props.toggleProductSort}
        />
        <ProductListFilter show={showFilter} toggle={this.props.toggleProductFilter} aggs={this.state.aggs}
          filterPrice={this.state.filterPrice} filterBrand={this.state.filterBrand}
          setPrice={this.setFilterPrice} setBrand={this.setFilterBrand} reset={this.resetFilter}
          apply={this.applyFilter}
        />
        <ProductListItem viewType={viewType.type} products={this.state.products || []} />
        <div className="loading"></div>
      </section>
    );
  },
});

export default connect(
  (state) => ({
    viewType: state.pageProductList.viewType,
    showSort: state.pageProductList.showSort,
    showFilter: state.pageProductList.showFilter,
    sorts: state.pageProductList.sorts,
    filterPrice: state.pageProductList.filterPrice,
    filterBrand: state.pageProductList.filterBrand,
    categories: state.categories,
    searchProducts: (query) => ajaxReturnPromise(state.auth, 'get', `/api/v1/products/search?${$.param(query)}`),
  }),
  { loadCategories, setHeader, changeViewType, sortProduct, filterProduct,
    toggleProductSort, toggleProductFilter }
)(ProductList);
