import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { ApiAction, setHeader } from 'redux/actions';
const { loadOrder } = ApiAction;

const OrderDone = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, 'Order Done');
    const { orderId } = this.props.params;
    this.props.loadOrder(orderId);
  },
  render() {
    const { order } = this.props;
    const { activeCurrency } = this.context;
    if (!order || !Object.keys(order).length) {
      return (
        <div className="am-message-sysError">
            <img src="https://i.alipayobjects.com/e/201402/274fwBdW0L.png" width="124" height="148" />
        </div>
        );
    }

    return (
      <div className="am-content">
        <div className="item-content am-ft-gray">
            <div className="payment-result">
                <div className="result-icon icon-success"></div>
                <h5 className="result-tit">Thank you for your purchase!</h5>
                <p>We have received your payment.</p>
                <p>Amount:
                  <span className="pay-money">{activeCurrency} {order[`total${activeCurrency}`]}</span>
                </p>
                <div></div>
            </div>
        </div>
        <div className="item-content payment_view item-gap-content">
            <div className="pay_card">
                <b className="card_icon">
                  { /* TODO card icon?? */ }
                  <img src="https://t.alipayobjects.com/images/T1QORfXeNcXXXXXXXX.png" height="24" /></b>
                <b className="card_no">****</b>
            </div>
            { /* save card - optional
            <form action="/directbindcard.htm" method="POST" className="payment_operat">
                <input type="hidden" name="_form_token" value="2DhulRgVCbsACMa9lsY0Fgo7E6bPprO5">
                <input type="hidden" name="type" value="bindcard">
                <input type="hidden" name="method" value="direct">
                <input type="hidden" name="sessionId" value="745ed62994dbb5e8b825651b612bf9ef">
                <button type="submit" href="/directbindcard.htm" className="aex-button">Save This Card</button>
            </form>
            <ul className="user_profit am-flexbox">
                <li className="am-flexbox-item profit_1_step">
                    <i className="profit_txt">PAYMENT</i>
                </li>
                <li className="am-flexbox-item profit_compen">
                    <i className="profit_txt">COMPENSTATION</i>
                </li>
                <li className="am-flexbox-item profit_fraud">
                    <i className="profit_txt">PROTECTION</i>
                </li>
            </ul>
            <div className="payment_desc" id="paymentDescView">
                <p>By saving this card, you agree on <u>Alipay Account Serivce Agreement</u> and <u>Alipay Privacy Policy</u>.</p>
            </div> */ }
        </div>
        <ul className="payment_support am-flexbox">
            <li className="am-flexbox-item">
              <img src="https://t.alipayobjects.com/images/rmsweb/T1oE0fXnVlXXXXXXXX.png" height="20" /></li>
            <li className="am-flexbox-item">
              <img src="https://t.alipayobjects.com/images/rmsweb/T1uVVgXc4XXXXXXXXX.png" height="20" /></li>
            <li className="am-flexbox-item">
              <img src="https://t.alipayobjects.com/images/rmsweb/T17FhgXoJgXXXXXXXX.png" height="20" /></li>
            <li className="am-flexbox-item">
              <img src="https://t.alipayobjects.com/images/rmsweb/T16.8fXo0iXXXXXXXX.png" height="20" /></li>
        </ul>
        { /* <div className="policy_mask" id="policyMask"></div>
        <div className="policy_wrap" id="policyWrap" >
            <div className="policy_tit" id="policyViewTit">
                <h3>Agreements</h3>
                <a href="javascript:;" id="hidePolicyView">Close</a>
            </div>
            <div className="policy_cont" id="policyViewCont">
                <iframe src="about:blank" frameborder="0" height="100%" width="100%" id="policyArticleFrame"></iframe>
            </div>
        </div> */ }
        <div className="aex-gap">
            <Link to="/myOrder" className="aex-button white-btn">My Orders</Link>
            <a href="/" className="aex-button white-btn">Home</a>
        </div>
    </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    order: state.entities.orders[ownProps.params.orderId],
  }),
  { loadOrder, setHeader }
)(OrderDone);
