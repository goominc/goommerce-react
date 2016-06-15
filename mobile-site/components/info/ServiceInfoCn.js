// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="mobile-service-info-container-cn">
        <div className="wrap_service_intro">
          <div className="service_intro_top_banner">
            <div className="top_banner_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_top_banner_20160615.png`} />
            </div>
            <p className="top_banner_1">365天不打烊的</p>
            <p className="top_banner_2">东大门服装网</p>
            <p className="top_banner_3">你一旦下单, <br />我们从取货到配送提供一站式服务</p>
          </div>
        </div>
        <div className="service_summary">
          您来看看成百上千店铺每日上新的服装<br />
          很容易找到你想去的商城和商铺
        </div>
        <div className="service_why">
          你为什么要选择Linkshops服装网呢？
        </div>
        <div className="service_ul">
          <div className="service_li">
            <div className="service_img">
              <img className = "landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn1_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">可靠商品</p>
              <p className="service_sub_title">把东大门最时尚商品直接移入到网站</p>
              <p className="service_desc">与东大门商铺密切沟通联系</p>
              <p className="service_desc">保障与东大门批发市场同一价格</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className = "portrait" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn2_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">每日新品</p>
              <p className="service_sub_title">1,500多个入驻品牌每天上市新款</p>
              <p className="service_desc">其中还没有你想要的商品，</p>
              <p className="service_desc">只要告诉我们，就帮您搜索！</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape"src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn3_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">安全配送</p>
              <p className="service_sub_title">不管你在哪里，4~5天内就会收货</p>
              <p className="service_desc">全商品配送都用包通关的物流</p>
              <p className="service_desc">拥有自己的东大门专门物流队</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn4_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">支付便利</p>
              <p className="service_sub_title">有多种支付方式，您简便地结账</p>
              <p className="service_desc">您可以选择您方便的支付方式</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="portrait" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn5_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">商城分类</p>
              <p className="service_sub_title">直走到您常去的商城，不要迷路了</p>
              <p className="service_desc">我们按照东大门线下商城分类，</p>
              <p className="service_desc">您可以很快地找到常去的商铺</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn6_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">模特实拍</p>
              <p className="service_sub_title">摄影专家的模特实拍, 可放大5倍</p>
              <p className="service_desc">今后不要看随随便便挂着的衣服图片,</p>
              <p className="service_desc">欣赏模特实际穿上什么样子</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
