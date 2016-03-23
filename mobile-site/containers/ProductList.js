import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual, pick } from 'lodash';

import { ApiAction, setHeader, changeViewType, toggleProductSort,
         toggleProductFilter } from '../redux/actions';
const { searchProducts, loadCategories } = ApiAction;

import ProductListItem from 'components/ProductListItem';

const fetchSize = 10;

const ProductList = React.createClass({
  propTypes: {
    viewType: PropTypes.object.isRequired,
    showSort: PropTypes.bool.isRequired,
    showFilter: PropTypes.bool,
    categories: PropTypes.object,
    searchProducts: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    changeViewType: PropTypes.func.isRequired,
    toggleProductSort: PropTypes.func.isRequired,
    toggleProductFilter: PropTypes.func.isRequired,
    params: PropTypes.object,
  },
  getInitialState() {
    return { currentCount: 0, maxCount: 0 };
  },
  componentDidMount() {
    const { params } = this.props;
    this.props.setHeader(false, true, true, '');
    this.doSearch(this.props);
    if (params.categoryId) {
      if (params.categoryId === 'all') {
        this.props.setHeader(false, true, true, 'All');
      } else {
        this.props.loadCategories().then(() => {
          this.props.setHeader(false, true, true, this.props.categories[params.categoryId].name.en);
        });
      }
    } else {
      this.props.setHeader(false, true, true, 'Search Result');
    }

    $(window).scroll(() => {
      if ($(window).scrollTop() + window.innerHeight === $(document).height()) {
        this.doFetch();
      }
    });
  },
  componentWillReceiveProps(nextProps) {
    const props = ['params'];
    if (!isEqual(pick(this.props, props), pick(nextProps, props))) {
      this.doSearch(nextProps);
    }
  },
  componentWillUnmount() {
    $(window).unbind('scroll');
  },
  doSearch(props) {
    const { params } = props;
    this.props.searchProducts({
      q: params.query ? params.query : undefined,
      categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      offset: 0,
      limit: fetchSize,
    }).then((res) => {
      this.setState({ products: res.products, currentCount: res.products.length, maxCount: res.pagination.total });
    });
  },
  doFetch() {
    const { params } = this.props;
    const { currentCount, maxCount } = this.state;
    if (currentCount === maxCount) {
      return;
    }
    this.props.searchProducts({
      q: params.query ? params.query : undefined,
      categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      offset: currentCount,
      limit: fetchSize,
    }).then((res) => {
      const mergeProducts = this.state.products.concat(res.products);
      this.setState({ products: mergeProducts, currentCount: mergeProducts.length });
    });
  },
  render() {
    const { viewType, showSort } = this.props;

    let sortStyle = {};
    if (showSort) {
      const xPos = $('.user-operation').position().top + $('.user-operation').height();
      sortStyle = { display: 'block', top: xPos };
    }

    return (
      <section className="list-main">
        <header className="user-operation">
          <div className="clearfix">
            <span className={`sort-by ${(showSort ? 'shrink-arrow clickable' : 'expand-arrow')}`}
              onClick={this.props.toggleProductSort}
            >
              Sort by
            </span>
            <span className="refine-filter">Filter</span>
            <span className="line_between"></span>
            <span className={`view-switching ${viewType.next}`} onClick={this.props.changeViewType}></span>
          </div>
        </header>
        <section className="sort-by-list-wrapper" id="j-sortbar-new" style={sortStyle}>
          <ul className="sort-by-list">
            <li data-type="MAIN" className="selected">Best Match&nbsp;</li>
            <li data-type="PP_A">Lowest Price First</li>
            <li data-type="PP_D">Highest Price First</li>
            <li data-type="TC_D">No. of orders</li>
            <li data-type="SC_D">Seller Rating&nbsp;</li>
          </ul>
        </section>
        <section className="sort-by-mask" id="j-sort-by-mask" style={ { display: showSort ? 'block' : 'none' } }
          onClick={this.props.toggleProductSort}
        />
        <ProductListItem viewType={viewType.type} products={this.state.products || []} />
      </section>
      );
  },
});

export default connect(
  (state) => ({
    viewType: state.pageProductList.viewType,
    showSort: state.pageProductList.showSort,
    showFilter: state.pageProductList.showFilter,
    categories: state.categories }),
  { searchProducts, loadCategories, setHeader, changeViewType, toggleProductSort, toggleProductFilter }
)(ProductList);
