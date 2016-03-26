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
    params: PropTypes.object.isRequired,
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
    if (params.addressId !== 'add') {
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
              return;
            }
          }
        }
      });
    } else {
      this.props.setHeader(false, false, false, 'Add Address');
    }
  },
  handleSave() {
    const { params } = this.props;

    if (!this.state.countryCode || !this.state.countryCode.length) {
      $('#address-country .board-error').show();
      $('#address-country input').addClass('has-error');
      return;
    }
    if (!this.state.name || !this.state.name.length) {
      $('#address-contact .board-error').show();
      $('#address-contact input').addClass('has-error');
      return;
    }
    if (!this.state.city || !this.state.city.length) {
      $('#address-city .board-error').show();
      $('#address-city input').addClass('has-error');
      return;
    }
    if (!this.state.streetAddress || !this.state.streetAddress.length) {
      $('#address-street .board-error').show();
      $('#address-street input').addClass('has-error');
      return;
    }
    if (!this.state.postalCode || !this.state.postalCode.length) {
      $('#address-zip .board-error').show();
      $('#address-zip input').addClass('has-error');
      return;
    }
    if (!this.state.tel || !this.state.tel.length) {
      $('#address-tel .board-error').show();
      $('#address-tel input').addClass('has-error');
      return;
    }

    $('.address-form .board-error').hide();
    $('.address-form input').removeClass('has-error');

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
    this.props.saveAddress(address).then(() => {
      if (params.addressId !== 'add') {
        this.context.router.push(`/orders/${params.orderId}/address`);
      } else {
        this.context.router.push(`/orders/${params.orderId}`);
      }
    });
  },
  render() {
    return (
      <div className="wrap">
        <fieldset className="field-form address-form">
          <div className="field-item" id="address-contact">
            <input type="text" placeholder="Contact Name" valueLink={this.linkState('name')} />
            <div className="board-error">Please enter a Contact Person</div>
          </div>
          <div className="field-item" id="address-country">
            { /* <div className="panel-select">South Korea<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="Country/Region" valueLink={this.linkState('countryCode')} />
            <div className="board-error">Please enter a Country/Region</div>
          </div>
          <div className="field-item" id="address-street">
            <input type="text" placeholder="Street Address" valueLink={this.linkState('streetAddress')} />
            <div className="board-error">Please enter a Address</div>
          </div>
          <div className="field-item" id="address-city">
            { /* <div className="hidden panel-select">Jung-gu<i className="ms-icon icon-arrow-right"></i></div> */ }
            <input type="text" placeholder="City" valueLink={this.linkState('city')} />
            <div className="board-error">Please enter a City</div>
          </div>
          { /* <div className="field-item">
            <div className="panel-select">Seoul<i className="ms-icon icon-arrow-right"></i></div>
            <input type="text" placeholder="State" />
          </div> */ }
          <div className="field-item" id="address-zip">
            <input type="text" placeholder="Zip/Postal code" valueLink={this.linkState('postalCode')} />
            <div className="board-error">Please enter a Zip/Postal Code</div>
          </div>
          <div className="field-item tel" id="address-tel">
            <input type="tel" placeholder="Tel" valueLink={this.linkState('tel')} />
            <div className="board-error">Please enter a Tel Number</div>
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
