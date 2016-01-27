import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactScriptLoaderMixin } from 'react-script-loader';

import { inipay, loadOrder } from '../redux/actions';

const Checkout = React.createClass({
  propTypes: {
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object,
    inipay: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
  },
  mixins: [ReactScriptLoaderMixin],
  getInitialState() {
    return {
      scriptLoaded: false,
    };
  },
  componentDidMount() {
    this.props.loadOrder(this.props.orderId);
  },
  onScriptError() {
    // Show the user an error message.
  },
  onScriptLoaded() {
    this.setState({ scriptLoaded: true });
  },
  getScriptURL() {
    if (process.env.NODE_ENV === 'production') {
      return 'https://stdpay.inicis.com/stdjs/INIStdPay.js';
    }
    return 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js';
  },
  checkout() {
    const { orderId } = this.props;
    this.props.inipay(orderId).then(res => {
      this.refs.mid.value = res.mid;
      this.refs.oid.value = res.oid;
      this.refs.price.value = res.price;
      this.refs.timestamp.value = res.timestamp;
      this.refs.signature.value = res.signature;
      this.refs.returnUrl.value = res.returnUrl;
      this.refs.mKey.value = res.mKey;
      INIStdPay.pay('checkout');
    });
  },
  render() {
    const { order } = this.props;
    if (!order) {
      return (
        <div></div>
      );
    }

    return (
      <div className="row">
        <div>KRW {order.total.KRW}</div>
        <form id="checkout" method="POST">
          <select name="gopaymethod">
						<option value="">[ 결제방법 선택 ]</option>
						<option value="Card">신용카드 결제</option>
						<option value="DirectBank">실시간 은행계좌이체</option>
						<option value="VBank">무통장 입금</option>
						<option value="HPP">핸드폰 결제</option>
						<option value="PhoneBill">받는전화결제</option>
						<option value="OCBPoint">OK 캐쉬백포인트 결제</option>
						<option value="Culture">문화상품권 결제</option>
						<option value="TeenCash">틴캐시 결제</option>
						<option value="DGCL">스마트문화 상품권 결제</option>
						<option value="BCSH">도서문화 상품권 결제</option>
						<option value="YPAY">옐로페이 결제</option>
						<option value="KPAY">케이페이 결제</option>
						<option value="EasyPay">간편 결제</option>
						<option value="EWallet">전자지갑 결제</option>
						<option value="POINT">포인트 결제</option>
						<option value="GiftCard">상품권 결제</option>
          </select>
          <input type="hidden" name="version" value="1.0"/>
          <input type="hidden" name="mid" ref="mid"/>
          <input type="hidden" name="oid" ref="oid"/>
          <input type="hidden" name="goodname" value="키보드/마우스"/>
          <input type="hidden" name="price" ref="price"/>
          <input type="hidden" name="currency" value="WON"/>
          <input type="hidden" name="buyername" value="LINKSHOPS"/>
          <input type="hidden" name="buyertel" value="010-2000-1234"/>
          <input type="hidden" name="buyermail" value=""/>
          <input type="hidden" name="timestamp" ref="timestamp"/>
          <input type="hidden" name="signature" ref="signature"/>
          <input type="hidden" name="returnUrl" ref="returnUrl"/>
          <input type="hidden" name="mKey" ref="mKey"/>
          <button type="button" className="btn btn-default" onClick={this.checkout}>
            CHECKOUT
          </button>
        </form>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
  }),
  { inipay, loadOrder }
)(Checkout);
