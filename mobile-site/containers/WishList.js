import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import WishListItems from 'components/WishListItems';
import WishListBrand from 'components/WishListBrand';

import { ApiAction, setHeader } from 'redux/actions';
const { loadWishlist, deleteWish, deleteFavoriteBrand } = ApiAction;

const WishList = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    wishes: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadWishlist: PropTypes.func.isRequired,
    deleteWish: PropTypes.func.isRequired,
    deleteFavoriteBrand: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return { tabIndex: 1 };
  },
  componentDidMount() {
    const { auth } = this.props;
    if (auth.bearer) {
      this.props.setHeader(false, true, true, 'Wish List');
      this.props.loadWishlist();
    } else {
      this.context.router.push('/');
    }
  },
  handleTab(index) {
    this.setState({ tabIndex: index });
  },
  render() {
    const { tabIndex } = this.state;
    const { auth, wishes } = this.props;
    const brand = auth.favoriteBrands || [];

    return (
      <div className="ms-tab">
        <ul className="tab-head">
          <li className={tabIndex === 1 ? 'tab-actived' : ''} onClick={() => this.handleTab(1)} >
            Wish List Items
          </li>
          <li className={tabIndex === 2 ? 'tab-actived' : ''} onClick={() => this.handleTab(2)} >
            Store
          </li>
        </ul>
        <div className="tab-body">
          <WishListItems show={tabIndex === 1} wishes={wishes} delete={this.props.deleteWish} />
          <WishListBrand show={tabIndex === 2} brand={brand} delete={this.props.deleteFavoriteBrand} />
        </div>
      </div>
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth, wishes: state.entities.wishes }),
  { setHeader, loadWishlist, deleteWish, deleteFavoriteBrand }
)(WishList);
