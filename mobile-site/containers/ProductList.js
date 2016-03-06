import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { get, isEqual, pick, range } from 'lodash';

import { ApiAction, setHeader, changeViewType, toggleProductSort, toggleProductFilter } from '../redux/actions';
const { searchProducts } = ApiAction;

import ProductListItem from 'components/ProductListItem';

const ProductList = React.createClass({
  propTypes: {
    viewType: PropTypes.object.isRequired,
    showSort: PropTypes.bool.isRequired,
    searchProducts: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    changeViewType: PropTypes.func.isRequired,
    toggleProductSort: PropTypes.func.isRequired,
    toggleProductFilter: PropTypes.func.isRequired,
    params: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    /* TODO set header title from params */
    this.props.setHeader(false, true, true, 'Dresses');
    this.doSearch(this.props);
  },
  componentWillReceiveProps(nextProps) {
    const props = ['categoryId', 'pageNum'];
    if (!isEqual(pick(this.props, props), pick(nextProps, props))) {
      this.doSearch(nextProps);
    }
  },
  doSearch(props) {
    //const { query, categoryId, brandId, pageNum } = props;
    const { params } = props;
    const size = 30;
    this.props.searchProducts({
      //q: query,
      categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      //brandId,
      from: 0,
      size,
    }).then(res => this.setState(res));
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
            <span className={'sort-by ' + (showSort ? 'shrink-arrow clickable' : 'expand-arrow')} onClick={this.props.toggleProductSort}>Sort by</span>
            <span className="refine-filter">Filter</span>
            <span className="line_between"></span>
            <span className={'view-switching ' + viewType.next} onClick={this.props.changeViewType}></span>
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
        <section className="sort-by-mask" id="j-sort-by-mask" style={ { display: showSort ? 'block' : 'none' } } onClick={this.props.toggleProductSort}></section>
        <ProductListItem viewType={viewType.type} products={this.state.products || []}/>
      </section>
      );
  },
});

export default connect(
  state => ({ viewType: state.pageProductList.viewType, showSort: state.pageProductList.showSort, showFilter: state.pageProductList.showFilter }),
  { searchProducts, setHeader, changeViewType, toggleProductSort, toggleProductFilter }
)(ProductList);
