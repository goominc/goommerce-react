import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader, changeViewType, toggleProductSort, toggleProductFilter } from '../redux/actions';
const { searchProducts } = ApiAction;

import ProductListItem from '../components/ProductListItem';

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
  componentDidMount() {
    /* TODO set header title from params */
    this.props.setHeader(false, true, true, 'Dresses');
  },
  render() {
    const { viewType, showSort } = this.props;
    const spanNextClass = 'view-switching ' + viewType.next;

    let sortStyle = {};
    if (showSort) {
      sortStyle = { display: 'block' };
    }

    return (
      <section className="list-main">
        <header className="user-operation">
          <div className="clearfix">
            <span className={'sort-by ' + (showSort ? 'shrink-arrow clickable' : 'expand-arrow')} onClick={this.props.toggleProductSort}>Sort by</span>
            <span className="refine-filter">Filter</span>
            <span className="line_between"></span>
            <span className={spanNextClass} onClick={this.props.changeViewType}></span>
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
        <section className="sort-by-mask" id="j-sort-by-mask" style={sortStyle} onClick={this.props.toggleProductSort}></section>
        <ProductListItem viewType={viewType.type}/>
      </section>
      );
  },
});

export default connect(
  state => ({ viewType: state.pageProductList.viewType, showSort: state.pageProductList.showSort, showFilter: state.pageProductList.showFilter }),
  { searchProducts, setHeader, changeViewType, toggleProductSort, toggleProductFilter }
)(ProductList);
