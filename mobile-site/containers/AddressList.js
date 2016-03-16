import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadAddresses, setActiveAddressId } = ApiAction;

const AddressList = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    setHeader: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    setActiveAddressId: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, 'Shipping Address');
    this.props.loadAddresses();
  },
  renderAddresses() {
    const { addresses, activeAddressId } = this.props;
    if (addresses && Object.keys(addresses).length) {
      return $.map(addresses, (address) => {
        const handleSetAddress = () => {
          this.props.setActiveAddressId(address.id);
        };
        return (
          <li key={address.id}>
            <Link id="manageAddressHref" to={`/orders/address/change/${address.id}`}>
              <div className="name">{address.detail.name}
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
    return (
      <div className="addressList">
        <ul>
          {this.renderAddresses()}
        </ul>
        <div className="add-address">
          <Link to="/orders/address/add">
            <i className="ms-icon icon-add-circle"></i>Add Shipping Address
          </Link>
        </div>
      </div>
      );
  },
});

export default connect(
  (state) => ({ activeAddressId: state.auth.addressId, addresses: state.entities.addresses }),
  { setHeader, loadAddresses, setActiveAddressId }
)(AddressList);
