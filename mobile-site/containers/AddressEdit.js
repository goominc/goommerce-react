import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import { execDaumPostcode } from 'commons/utils/addressUtil';

import { ApiAction, setHeader } from 'redux/actions';
const { loadAddresses } = ApiAction;

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
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    if (this.props.params.addressId === 'add' && this.props.auth) {
      return {
        name: this.props.auth.name || '',
        tel: _.get(this.props.auth, 'data.tel') || '',
      };
    }
    return {};
  },
  componentDidMount() {
    const { params } = this.props;
    const orderLink = `/orders/${params.orderId}/checkout`;
    if (params.addressId !== 'add') {
      this.props.loadAddresses().then((res) => {
        if (res && res.addresses && Object.keys(res.addresses).length) {
          for (const i in res.addresses) {
            if (res.addresses[i].id === parseInt(params.addressId, 10)) {
              const initialState = { id: params.addressId };
              const initField = (field) => {
                initialState[field.objKey] = _.get(res.addresses[i], field.key) || '';
              };
              this.addressFields1().forEach(initField);
              this.addressFields2().forEach(initField);
              this.setState(initialState);
              this.props.setHeader({
                showLogo: false,
                showSearch: false,
                showCart: false,
                titleText: '주소 변경',
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
        titleText: '주소 등록',
        link: orderLink,
      });
    }
  },
  addressFields1: () => [
    { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.alias'), placeholder: '주소 별명', errorMessage: '별명을 입력해 주세요' },
    { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.contactName'), placeholder: '이름', errorMessage: '받는 분 이름을 입력해 주세요' },
    { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678', errorMessage: '전화번호를 입력해 주세요' },
  ],
  addressFields2: () => [
    { key: 'detail.postalCode', objKey: 'postalCode', text: i18n.get('pcPayment.zipCode'), isReadOnly: true, placeholder: '00000', errorMessage: '우편번호 찾기로 주소를 찾아주세요' },
    { key: 'detail.address.base', objKey: 'address1', text: i18n.get('pcPayment.address'), isReadOnly: true, placeholder: '도로명주소' },
    { key: 'detail.address.detail', objKey: 'address2', text: '상세 주소', placeholder: '상세주소', errorMessage: '상세 주소를 입력해 주세요' },
  ],
  handleSave() {
    const { params, order } = this.props;
    const { ApiAction } = this.context;
    const addressFields = this.addressFields1().concat(this.addressFields2());

    const addressForSave = { countryCode: 'KR', id: this.state.id };
    for (let i = 0; i < addressFields.length; i++) {
      const field = addressFields[i];
      const val = this.state[field.objKey] || $(`#${field.objKey}`).val();
      if (val) {
        _.set(addressForSave, field.key, val);
      } else {
        $(`#${field.obj}`).addClass('has-error');
        $(`#${field.objKey} + .board-error`).show();
        return;
      }
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
    const addressFields1 = this.addressFields1();
    const addressFields2 = this.addressFields2();
    const onChange = (e, field) => {
      const nextState = {};
      nextState[field.objKey] = e.target.value;
      $('.address-form .board-error').hide();
      $('.address-form input').removeClass('has-error');
      this.setState(nextState);
    };
    const renderField = (field) => (
      <div key={field.objKey} className="field-item" id="address-contact">
        <input
          type="text"
          readOnly={field.isReadOnly}
          placeholder={field.placeholder}
          value={this.state[field.objKey]}
          onChange={(e) => onChange(e, field)}
          id={field.objKey}
        />
        <div className="board-error">{`${field.errorMessage}`}</div>
      </div>
    );
    const openPostalCodePopup = (e) => {
      e.preventDefault();
      execDaumPostcode($('#postalCode'), $('#address1'));
    };
    return (
      <div className="wrap">
        <fieldset className="field-form address-form">
          {addressFields1.map(renderField)}
          <button onClick={openPostalCodePopup}>우편번호 찾기</button>
          {addressFields2.map(renderField)}
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
