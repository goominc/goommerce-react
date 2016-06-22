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
            <p className="top_banner_1">365天不打烊的東大門</p>
            <p className="top_banner_2">東大門服裝網</p>
            <p className="top_banner_3">你一旦下單, <br />我們從取貨到配送提供一站試服務</p>
          </div>
        </div>
        <div className="service_summary">
          您來看看成百上千店鋪每日新的服裝<br />
          很容易找到你想去的商城和商鋪
        </div>
        <div className="service_why">
          你為什麼要選擇Linkshops服飾網呢？
        </div>
        <div className="service_ul">
          <div className="service_li">
            <div className="service_img">
              <img className = "landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn1_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">可靠商品</p>
              <p className="service_sub_title">把東大門最時尚商品直接移入到網站</p>
              <p className="service_desc">與東大門商鋪密切溝通聯繫</p>
              <p className="service_desc">保障與東大門批發市場同一價格</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className = "portrait" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn2_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">每日新品</p>
              <p className="service_sub_title">1,500多个入驻品牌每天上市新款</p>
              <p className="service_desc">其中還沒有你想要的商品，</p>
              <p className="service_desc">只要告訴我們, 就幫您搜索！</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape"src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn3_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">安全配送</p>
              <p className="service_sub_title">不管你在哪裡, 4~5天內就會收貨</p>
              <p className="service_desc">全商品配送都用包通關的物流</p>
              <p className="service_desc">擁有自己的東大門專門物流隊</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn4_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">支付便利</p>
              <p className="service_sub_title">有多種支付方式, 您簡便地結賬</p>
              <p className="service_desc">您可以選擇您方便的支付方式</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="portrait" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn5_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">商城分類</p>
              <p className="service_sub_title">直走到您常去的商城, 不要迷路了</p>
              <p className="service_desc">我們按照東大門线下商城分類,</p>
              <p className="service_desc">您可以很快地找到常去的商鋪</p>
            </div>
          </div>
          <div className="service_li">
            <div className="service_img">
              <img className="landscape" src={`${constants.resourceRoot}/mobile/serviceinfo/service_info_cn6_20160615.png`} />
            </div>
            <div className="service_text">
              <p className="service_title">模特實拍</p>
              <p className="service_sub_title">攝影專家的模特實拍, 可放大5倍</p>
              <p className="service_desc">今后不要看隨隨便便掛著的衣服圖片,</p>
              <p className="service_desc">欣賞模特實際穿上什麼樣子</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
