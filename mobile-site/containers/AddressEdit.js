import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadAddresses, saveAddress } = ApiAction;

const AddressEdit = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    setHeader: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    saveAddress: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, 'Edit Address');
    this.props.loadAddresses();
  },
  render() {
    return (
      <div className="wrap">
        <fieldset className="field-form address-form">
          <div className="field-item">
            <input type="text" placeholder="Contact Name" />
          </div>
          <div className="field-item">
            { /* <div className="panel-select">South Korea<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="Country/Region" />
          </div>
          <div className="field-item">
            <input type="text" placeholder="Street Address" />
          </div>
          <div className="field-item">
            { /* <div className="hidden panel-select">Jung-gu<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="City" />
          </div>
          { /* <div className="field-item">
            <div className="panel-select">Seoul<i className="ms-icon icon-arrow-right"></i></div>
            <input type="text" placeholder="State" />
          </div> */ }
          <div className="field-item">
            <input type="text" placeholder="Zip/Postal code" />
          </div>
          <div className="field-item tel">
            <input type="tel" placeholder="Tel" />
          </div>
          { /*
          <div className="field-item tel">
            <div>
              <input type="tel" value="+82" name="_fmh.m._0.ph" style="width: 70px;" placeholder="Country code&nbsp;" id="country-code" />
              <input type="tel" value="01093310212" name="_fmh.m._0.m" style="width: 218px;" placeholder="Mobile Number&nbsp;" />
            </div>
          </div>
          */ }
          <div className="address-action">
            <input type="submit" value="Update" className="ui-button ui-button-main add" />
          </div>
        </fieldset>
      </div>
      );
  },
});

export default connect(
  (state) => ({ activeAddressId: state.auth.addressId, addresses: state.entities.addresses }),
  { setHeader, loadAddresses, saveAddress }
)(AddressEdit);
