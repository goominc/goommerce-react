import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader, changeViewType } from '../redux/actions';
const { loadProducts } = ApiAction;

import ProductListItem from '../components/ProductListItem';

const ProductList = React.createClass({
  propTypes: {
    viewType: PropTypes.object,
    loadProducts: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    changeViewType: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.setHeader(false, true, true, 'Dresses');
  },
  // TODO : manage states(view-type, sort, filter, etc)
  render() {
    const { viewType, changeViewType } = this.props;
    const spanClassName = 'view-switching ' + viewType.next;
    return (
      <section className="list-main">
        <header className="user-operation">
          <div className="clearfix">
            <span className="sort-by expand-arrow">Sort by</span>
            <span className="refine-filter">Filter</span>
            <span className="line_between"></span>
            <span className={spanClassName} onClick={changeViewType}></span>
          </div>
        </header>
        <section className="sort-by-list-wrapper" id="j-sortbar-new">
          <ul className="sort-by-list">
            <li data-type="MAIN" className="selected">Best Match&nbsp;</li>
            <li data-type="PP_A">Lowest Price First</li>
            <li data-type="PP_D">Highest Price First</li>
            <li data-type="TC_D">No. of orders</li>
            <li data-type="SC_D">Seller Rating&nbsp;</li>
          </ul>
        </section>
        <section className="sort-by-mask" id="j-sort-by-mask"></section>
        <ProductListItem viewType={viewType.type}/>
      </section>
      );
  },
});

export default connect(
  state => ({ viewType: state.pageProductList }),
  { loadProducts, setHeader, changeViewType }
)(ProductList);
