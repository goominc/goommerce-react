// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="mobile-order-info-container-cn">
        <div className="radius_title">
          一站式服务流程
        </div>
        <div className="order-info-cn-img">
          <img src={`${constants.resourceRoot}/mobile/serviceinfo/order_info_cn_20160615.png`} />
        </div>
        <ul className="order-info-ul">
          <li>如一般网店购物同样的方式，进行愉快地采购就可以</li>

          <li>按照实际东大门商城及商铺分类商品，你可以迅速地访
          问你常去的商铺，如果还没有你想去的商铺，告诉
          Linkshops客服中心，我们尽快联系商铺入驻</li>

          <li>下午06:00前(韩国时间) 下单的商品是当天晚上进行取
          货，一旦开始取货,订单不能取消或退款</li>

          <li>按照商铺的情况，有可能发生缺货或断货，第二天上午，
          您可以在网站右侧上面“我的Linkshops-订单详情”里
          面确认取货结果</li>

          <li>一般情况下，取货率达到70~75%, 没库存的商品进行取
          消处理</li>

          <li>我们把被取消的商品移入到您的收藏夹里，您可以随时
          再次订购</li>

          <li>配送期间是发货后一般需要3~4天</li>

          <li>遇到自然灾害或意外，配送时间会发生延迟</li>

          <li>中国和香港是包通关物流，直接送到您指定的地点
          但台湾地区，报关后报关行通知您关税及运费多少，
          您需要支付该费用后能收货</li>
        </ul>
        <p className="mid_line"></p>
        <div className="radius_title">
          结账及退款内容
        </div>
        <ul className="order-info-ul">
          <li>结账时，总金额是包括商品价格、代购手续费以及运费</li>

          <li>商品金额与东大门线下批发市场完全同一</li>

          <li>代购手续费是商品金额的5%</li>

          <li>运输费用是因为每件商品的重量不同的原因，先支付商
          品金额的30%（台湾/香港：20%）</li>

          <li>实际运费是发货时实际称重后确定，先结账的费用与实
          际运费的差额，发货后进行退款处理</li>

          <li>运费是中国7,000韩币/kg, 台湾2,800韩币/kg,
          香港3,000韩币/kg,(台湾/香港需要箱子包装费)，
          运费是与市场价联动，会有轻微波动</li>

          <li>已结账的商品金额中，缺货或断货的原因被取消的商品
          金额和相关代购手续费也和运费的差额一并进行退款
          处理</li>
        </ul>
      </div>
    );
  },
});
