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
          <img src={`${constants.resourceRoot}/mobile/serviceinfo/order_info_tw_20160622.png`} />
        </div>
        <ul className="order-info-ul">
          <li>如一般網店購物同樣的方式, 進行愉快地採購就可以</li>

          <li>按照實際東大門商城及商鋪分類商品, 你可以迅速地訪問你
            常去的商鋪, 如果還沒有你想去的商鋪, 告訴Linkshops
            客服中心, 我們盡快聯繫商鋪入駐</li>

          <li>下午06:00前(韓國時間) 下單的商品是當天晚上進行取
            貨, 一旦開始取貨, 訂單不能取消或退款</li>

          <li>按照商鋪的情況, 有可能發生缺貨或斷貨, 第二天上午
            , 您可以在網站右側上面“我的Linkshops-訂單詳情” 裡面確認
            取貨結果。</li>

          <li>一般情況下, 取貨率達到70~75%, 沒庫存的商品進行取消處理</li>

          <li>我們把被取消的商品移入到您的收藏夾里, 您可以隨時再次訂購</li>

          <li>配送期间是发货后一般需要3~4天</li>

          <li>遇到自然災害或意外, 配送時間會發生延遲。</li>

          <li>中國和香港是包通關物流, 直接送到您指定的地點 但台灣地
            區, 報關后報關行通知您關稅及運費多少, 您需要支付該
            費用后能收貨</li>
        </ul>
        <p className="mid_line"></p>
        <div className="radius_title">
          結賬及退款內容
        </div>
        <ul className="order-info-ul">
          <li>結賬時, 總金額是包括商品價格, 代購手續費以及運費</li>

          <li>商品金額與東大門線下批發市場完全同一</li>

          <li>代购手续费是商品金额的5%</li>

          <li>實際运费是因為每件商品的重量不同的原因，先支付商品金
            額的30%（台灣/香港：20%）</li>

          <li>實際運費是發貨時實際稱重后確定, 先結賬的費用與實
            際運費的差額, 發貨後進行退款處理</li>

          <li>運費是中國7,000韓幣/kg, 台灣2,800韓幣/kg, 香港
            3,000韓幣/kg,(台灣/香港需要箱子包裝費), 運費是與市場
            價聯動, 會有輕微波動。</li>

          <li>已結賬的商品金額中, 缺貨或斷貨的原因被取消的商品金額
            和相關代購手續費也和運輸費的差額一並進行退款處理</li>
        </ul>
      </div>
    );
  },
});
