import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setHeader } from 'redux/actions';

const AddressList = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    cart: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    setHeader: PropTypes.func.isRequired,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.context.ApiAction.loadOrder(this.props.params.orderId);
    this.context.ApiAction.loadAddresses();
    this.props.setHeader({
      showLogo: false,
      showSearch: false,
      showCart: false,
      titleText: '배송 주소',
      link: `/orders/${this.props.params.orderId}/checkout`,
    });
  },
  renderAddresses() {
    const { params, addresses, activeAddressId } = this.props;
    const { ApiAction } = this.context;
    if (addresses && Object.keys(addresses).length) {
      return $.map(addresses, (address) => {
        const handleSetAddress = () => {
          const promises = [
            ApiAction.setActiveAddressId(address.id),
            ApiAction.saveOrderAddress(params.orderId, address),
          ];
          Promise.all(promises).then(() => {
            // this.context.router.push(`/orders/${params.orderId}`);
            this.context.router.goBack();
          });
        };
        return (
          <li key={address.id}>
            <Link id="manageAddressHref" to={`/orders/${params.orderId}/address/${address.id}`}>
              <div className="name">{address.detail.alias}
                <span className="edit-address">Edit Address<i className="ms-icon icon-arrow-right"></i></span>
              </div>
            </Link>
            <div onClick={handleSetAddress}>
              <div className="address-info">{address.detail.streetAddress}</div>
              <div className="address-info">{address.detail.city}</div>
              <div className="address-info">{address.countryCode}</div>
              <div className="address-info">{address.detail.postalCode}</div>
              <div className="address-info">{address.detail.tel}</div>
              <div className={(activeAddressId === address.id ? 'default' : 'hide')}>
                <i className="ms-icon icon-check"></i>
              </div>
            </div>
          </li>
          );
      });
    }
    return null;
  },
  render() {
    const { params } = this.props;
    return (
      <div className="addressList">
        <ul>
          {this.renderAddresses()}
        </ul>
        <div className="add-address">
          <Link to={`/orders/${params.orderId}/address/add`}>
            <i className="ms-icon icon-add-circle"></i>Add Shipping Address
          </Link>
        </div>
      </div>
      );
  },
});

export default connect(
  (state, ownProps) => {
    const order = state.entities.orders[ownProps.params.orderId];
    return {
      activeAddressId: order ? _.get(order, 'address.id') || 0 : 0,
      addresses: state.entities.addresses,
      order,
    };
  },
  { setHeader }
)(AddressList);
