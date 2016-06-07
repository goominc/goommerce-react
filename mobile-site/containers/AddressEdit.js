import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import { execDaumPostcode } from 'commons/utils/addressUtil';

import { ApiAction, setHeader } from 'redux/actions';
const { loadAddresses } = ApiAction;

// 2016. 06. 07. [heekyu] 'KR' is not oversea country code
const countryCodes = ['CN', 'TW', 'HK', 'MO', 'ETC'];

const AddressEdit = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    order: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    if (this.props.params.addressId === 'add') {
      const localeToCountryCode = {
        ko: 'KR',
        // en: '',
        'zh-cn': 'CN',
        'zh-tw': 'TW',
      };
      return {
        name: this.props.auth.name || '',
        tel: _.get(this.props.auth, 'data.tel') || '',
        countryCode: localeToCountryCode[this.context.activeLocale] || 'ETC',
      };
    }

    return {};
  },
  componentDidMount() {
    const { params, order } = this.props;
    if (!order) {
      // 2016. 06. 07. [heekyu] order is not loaded
      this.context.ApiAction.loadOrder(this.props.params.orderId);
    }
    const orderLink = `/orders/${params.orderId}/checkout`;
    if (params.addressId !== 'add') {
      this.props.loadAddresses().then((res) => {
        if (res && res.addresses && Object.keys(res.addresses).length) {
          for (const i in res.addresses) {
            if (res.addresses[i].id === parseInt(params.addressId, 10)) {
              const initialState = { id: params.addressId, countryCode: res.addresses[i].countryCode };
              const initField = (field) => {
                _.set(initialState, field.key, _.get(res.addresses[i], field.key) || '');
              };
              if (initialState.countryCode === 'KR') {
                this.addressFields1().forEach(initField);
                this.addressFields2().forEach(initField);
              } else {
                this.addressFieldsOversea().forEach(initField);
              }
              this.setState(initialState);
              this.props.setHeader({
                showLogo: false,
                showSearch: false,
                showCart: false,
                titleI18NKey: 'mOrder.changeAddressTitle',
                link: orderLink,
              });
              return;
            }
          }
        }
      });
    } else {
      this.props.setHeader({
        showLogo: false,
        showSearch: false,
        showCart: false,
        titleI18NKey: 'mOrder.addAddress',
        link: orderLink,
      });
    }
  },
  addressFields1: () => [
    { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.alias'), placeholder: i18n.get('mOrder.addressAliasPlaceHolder'), errorMessage: i18n.get('mOrder.warnAddressAlias') },
    { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.contactName'), placeholder: i18n.get('word.name'), errorMessage: i18n.get('mOrder.warnAddressContactName') },
    { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678', errorMessage: i18n.get('mOrder.warnAddressTel') },
  ],
  addressFields2: () => [
    { key: 'detail.postalCode', objKey: 'postalCode', text: i18n.get('pcPayment.zipCode'), isReadOnly: true, placeholder: '00000', errorMessage: i18n.get('mOrder.warnAddressFindPostalCode') },
    { key: 'detail.address.base', objKey: 'address1', text: i18n.get('pcPayment.address'), isReadOnly: true, placeholder: i18n.get('mOrder.addressRoadPlaceHolder') },
    { key: 'detail.address.detail', objKey: 'address2', text: '상세 주소', placeholder: i18n.get('mOrder.addressDetailPlaceHolder'), errorMessage: i18n.get('mOrder.warnAddressDetail') },
  ],
  addressFieldsOversea: () => [
    { key: 'countryCode', objKey: 'countryCode', text: 'country code', placeholder: '', enums: countryCodes },
    { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.alias'), placeholder: i18n.get('mOrder.addressAliasPlaceHolder'), errorMessage: i18n.get('mOrder.warnAddressAlias') },
    { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.contactName'), placeholder: i18n.get('word.name'), errorMessage: i18n.get('mOrder.warnAddressContactName') },
    { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678', errorMessage: i18n.get('mOrder.warnAddressTel') },
    { key: 'detail.address.base', objKey: 'address1', text: 'address1', placeholder: 'address1', errorMessage: i18n.get('mOrder.warnAddress1') },
    { key: 'detail.address.detail', objKey: 'address2', text: 'address2', placeholder: 'address2', errorMessage: i18n.get('mOrder.warnAddress2') },
    { key: 'detail.address.city', objKey: 'city', text: 'city', placeholder: 'city', errorMessage: i18n.get('mOrder.warnAddressCity') },
    { key: 'detail.postalCode', objKey: 'postalCode', text: 'zip code', placeholder: 'zip code', errorMessage: i18n.get('mOrder.warnAddressZipCode') },
  ],
  handleSave() {
    const { params, order } = this.props;
    const { ApiAction } = this.context;
    let addressFields;
    if (this.state.countryCode === 'KR') {
      addressFields = this.addressFields1().concat(this.addressFields2());
    } else {
      addressFields = this.addressFieldsOversea();
    }

    const addressForSave = { countryCode: this.state.countryCode, id: this.state.id };
    for (let i = 0; i < addressFields.length; i++) {
      const field = addressFields[i];
      const val = _.get(this.state, field.key) || $(`#${field.objKey}`).val();
      if (!val) {
        $(`#${field.obj}`).addClass('has-error');
        $(`#${field.objKey} + .board-error`).show();
        return;
      }
      _.set(addressForSave, field.key, val);
    }

    $('.address-form .board-error').hide();
    $('.address-form input').removeClass('has-error');

    ApiAction.saveAddressAndThen(order, addressForSave).then(() => {
      if (params.addressId !== 'add') {
        this.context.router.push(`/orders/${params.orderId}/address`);
      } else {
        this.context.router.push(`/orders/${params.orderId}/checkout`);
      }
    });
  },
  render() {
    const { countryCode } = this.state;
    const addressForEdit = this.state;

    const addressFields1 = this.addressFields1();
    const addressFields2 = this.addressFields2();
    const onChange = (e, field) => {
      const nextState = this.state;
      _.set(nextState, field.key, e.target.value);
      $('.address-form .board-error').hide();
      $('.address-form input').removeClass('has-error');
      this.setState(_.merge({}, this.state, nextState));
    };
    const renderField = (field) => (
      <div key={field.objKey} className="field-item" id="address-contact">
        {field.enums ?
          <select onChange={(e) => onChange(e, field)} value={_.get(addressForEdit, field.key) || field.enums[0]}>
            {field.enums.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          :
          <input
            type="text"
            readOnly={field.isReadOnly}
            placeholder={field.placeholder}
            value={_.get(this.state, field.key) || ''}
            onChange={(e) => onChange(e, field)}
            id={field.objKey}
          />
        }
        <div className="board-error">{`${field.errorMessage}`}</div>
      </div>
    );
    const renderGlobal = () => {
      return this.addressFieldsOversea().map(renderField);
    };
    const openPostalCodePopup = (e) => {
      e.preventDefault();
      execDaumPostcode($('#postalCode'), $('#address1'));
    };
    const changeCountryCode = (code) => {
      if (addressForEdit.id) {
        // 2016. 05. 30. [heekyu] when modifing, cannot change KR -> OTHER or OTHER -> KR
        if (addressForEdit.countryCode === 'KR' && code !== 'KR') {
          window.alert(i18n.get('mOrder.denyDomesticToOverseas'));
          return;
        }
        if (addressForEdit.countryCode !== 'KR' && code === 'KR') {
          window.alert(i18n.get('mOrder.denyOverseasToDomestic'));
          return;
        }
      }
      if (code !== countryCode) {
        this.setState({ countryCode: code });
      }
    };
    const renderAllFields = () => {
      if (countryCode === 'KR') {
        return addressFields1.map(renderField)
          .concat(<button key="postal-code-button" onClick={openPostalCodePopup}>{i18n.get('mOrder.findPostalCode')}</button>)
          .concat(addressFields2.map(renderField));
      }
      return renderGlobal();
    };
    const isDefaultCountryCode = countryCode !== 'KR';
    return (
      <div className="wrap">
        <div className="tab-line">
          <div
            className={`item ${countryCode === 'KR' ? 'active' : ''}`}
            onClick={() => (countryCode !== 'KR' ? changeCountryCode('KR') : null)}
          >
            {i18n.get('word.domestic')}
          </div>
          <div
            className={`item ${isDefaultCountryCode ? 'active' : ''}`}
            onClick={() => (!isDefaultCountryCode ? changeCountryCode('ETC') : null)}
          >
            {i18n.get('word.overseas')}
          </div>
        </div>
        <fieldset className="field-form address-form">
          {renderAllFields()}
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
  (state, ownProps) => ({ auth: state.auth, order: state.entities.orders[ownProps.params.orderId] }),
  { setHeader, loadAddresses }
)(AddressEdit);
