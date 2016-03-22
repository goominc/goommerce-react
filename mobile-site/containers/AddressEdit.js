import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';


import { ApiAction, setHeader } from 'redux/actions';
const { loadAddresses, saveAddress } = ApiAction;

const AddressEdit = React.createClass({
  propTypes: {
    setHeader: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    saveAddress: PropTypes.func.isRequired,
    params: PropTypes.object,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const { params } = this.props;
    if (params && params.addressId) {
      this.props.loadAddresses().then((res) => {
        if (res && res.addresses && Object.keys(res.addresses).length) {
          for (const i in res.addresses) {
            if (res.addresses[i].id === parseInt(params.addressId, 10)) {
              this.setState({
                id: params.addressId,
                name: res.addresses[i].detail.name,
                countryCode: res.addresses[i].countryCode,
                streetAddress: res.addresses[i].detail.streetAddress,
                city: res.addresses[i].detail.city,
                postalCode: res.addresses[i].detail.postalCode,
                tel: res.addresses[i].detail.tel,
              });
              this.props.setHeader(false, false, false, 'Edit Address');
            }
          }
        }
      });
    } else {
      this.props.setHeader(false, false, false, 'Add Address');
    }
  },
  handleSave() {
    const address = {
      id: this.state.id,
      countryCode: this.state.countryCode,
      detail: {
        name: this.state.name,
        city: this.state.city,
        streetAddress: this.state.streetAddress,
        postalCode: this.state.postalCode,
        tel: this.state.tel,
      },
    };
    this.props.saveAddress(address).then(() => this.context.router.push('/orders/address/select'));
  },
  render() {
    return (
      <div className="wrap">
        <fieldset className="field-form address-form">
          <div className="field-item">
            <input type="text" placeholder="Contact Name" valueLink={this.linkState('name')} />
          </div>
          <div className="field-item">
            { /* <div className="panel-select">South Korea<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="Country/Region" valueLink={this.linkState('countryCode')} />
          </div>
          <div className="field-item">
            <input type="text" placeholder="Street Address" valueLink={this.linkState('streetAddress')} />
          </div>
          <div className="field-item">
            { /* <div className="hidden panel-select">Jung-gu<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="City" valueLink={this.linkState('city')} />
          </div>
          { /* <div className="field-item">
            <div className="panel-select">Seoul<i className="ms-icon icon-arrow-right"></i></div>
            <input type="text" placeholder="State" />
          </div> */ }
          <div className="field-item">
            <input type="text" placeholder="Zip/Postal code" valueLink={this.linkState('postalCode')} />
          </div>
          <div className="field-item tel">
            <input type="tel" placeholder="Tel" valueLink={this.linkState('tel')} />
          </div>
          { /*
          <div className="field-item tel">
            <div>
              <input type="tel" style="width: 70px;" placeholder="Country code&nbsp;" id="country-code" />
              <input type="tel" style="width: 218px;" placeholder="Mobile Number&nbsp;" />
            </div>
          </div>
          */ }
          <div className="address-action">
            <input type="submit" value="Save"
              className="ui-button ui-button-main add" onClick={this.handleSave}
            />
          </div>
        </fieldset>
      </div>
      );
  },
});

export default connect(
  undefined,
  { setHeader, loadAddresses, saveAddress }
)(AddressEdit);
