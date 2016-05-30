// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import OwlCarousel from 'react-owl-carousel';

import ProductListItems from 'components/product/ProductListItems';

import { constants } from 'commons/utils/constants';
import { getProductMainImage } from 'commons/utils/productUtil';
import loadEntities from 'commons/redux/util/loadEntities';
import i18n from 'commons/utils/i18n';

const Home = React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
    categories: PropTypes.object.isRequired,
    hotProducts: PropTypes.array,
    desktop_main_banner: PropTypes.object,
    desktop_right_bannerrightBanner: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.context.ApiAction.loadCMSData('desktop_main_banner');
    this.context.ApiAction.loadCMSData('desktop_right_banner');
    // this.context.ApiAction.loadCMSData('desktop_right_banner');
    /*
    $('.main-banner').owlCarousel({ autoPlay: 10000, items: 1 });
    $('.center-slide').owlCarousel({ autoPlay: 10000, items: 1 });
    */
    this.context.ApiAction.loadHotProducts();
  },
  render() {
    const { activeLocale, hotProducts } = this.props;
    const { desktop_main_banner = { en: {}, ko: {}, 'zh-cn': {}, 'zh-tw': {} } } = this.props; //eslint-disable-line
    const { desktop_right_banner = { en: {}, ko: {}, 'zh-cn': {}, 'zh-tw': {} } } = this.props; //eslint-disable-line
    const currentMainBanner = desktop_main_banner[activeLocale];
    const currentRightBanner = desktop_right_banner[activeLocale];
    const categories = JSON.parse(JSON.stringify(this.props.categories));
    const renderCategories = () => {
      if (!categories || Object.keys(categories).length < 1) {
        return (<div className="category-frame"></div>);
      }
      categories[4].children = [categories[11], categories[12], categories[13], categories[41]];
      categories[179].children = [categories[180], categories[181], categories[183]];
      const topCategories = [categories[4], categories[179]];
      if (categories[262] && categories[51] && categories[177]) {
        categories[51].children = [];
        categories[177].children = [];
        categories[262].children = [categories[51], categories[177]];
        topCategories.push(categories[262]);
      }
      const renderCategory = (c, index) => {
        const renderHoverCategory = (child, index2) => (
          <Link key={`${child.id}-${index2}`} to={`/categories/${child.id}`}>
            <div className="sub-item">{child.name[activeLocale]}</div>
          </Link>
        );
        const renderHover = () => {
          if (c.children && c.children.length > 0) {
            return (
              <div className="category-hover-box">
                {c.children.map(renderHoverCategory)}
              </div>
            );
          }
          return null;
        };
        return (
          <div key={`child-${c.id}`} className={`item ${c.children && c.children.length > 0 ? 'has-child' : ''}`}>
            <Link key={`${c.id}-${index}`} to={`/categories/${c.id}`} style={({ display: 'inline-block', width: '100%' })}>
              {c.name[activeLocale]}
            </Link>
            {renderHover()}
          </div>
        );
      };
      const renderTopCategory = (category) => {
        if (!category) {
          return (<div></div>);
        }
        return (
          <Link to={`/categories/${category.id}`} key={`home-top-category-${category.id}`}>
            <div className="category-main">
              <div className="item-title">{category.name[activeLocale]}</div>
              {category.children.map(renderCategory)}
            </div>
          </Link>
        );
      };
      return (
        <div className="category-frame">
          <div className="category-bar">
            {i18n.get('word.categories')}
            <Link to="/categories/4"><div className="category-all">{i18n.get('word.seeAll')}</div></Link>
          </div>
          {renderTopCategory(topCategories[0])}
          <div className="category-divider"></div>
          {renderTopCategory(topCategories[1])}
          <div className="category-divider"></div>
          {renderTopCategory(topCategories[2])}
        </div>
      );
    };
    hotProducts.forEach((product) => {
      if (!product.mainImage) {
        product.mainImage = getProductMainImage(product);
      }
    });
    const renderBanner = (row) => {
      if (!row) {
        return null;
      }
      if (row.link) {
        return <Link key={row.image.url} to={row.link}><img src={row.image.url} /></Link>;
      }
      return <img key={row.image.url} src={row.image.url} />;
    };
    const settings = {
      slideSpeed: 300,
      autoPlay: 10000,
      singleItem: true,
      scrollPerPage: true,
    };
    return (
      <div className="main-wide-container">
        <div className="container no-horizontal-padding">
          <div className="main-banner-wrap">
            {renderCategories()}
            <div className="main-banner">
              <OwlCarousel {...settings}>
                {(currentMainBanner.rows || []).map(renderBanner)}
              </OwlCarousel>
            </div>
            {/*
            <div className="home-stylepick-banner">
              <strong>스타일 픽</strong>
              <span>COMING</span>
              <span>SOON</span>
            </div>
             */}
            {renderBanner(_.get(currentRightBanner, 'rows[0]'))}
          </div>
        </div>
        <div className="home-center-wrap">
          <div className="container no-horizontal-padding">
            <div className="home-building-title">
              <strong>{i18n.get('pcFooter.dongdaemun')}</strong> {i18n.get('pcFooter.byBuilding')}
            </div>
            <div className="home-building-container">
              <Link to="/shops/buildings/5" className="item item-top"><div className="build_apm">에이피엠</div></Link>
              <Link to="/shops/buildings/16" className="item item-top"><div className="build_apmluxe">에이피엠 럭스</div></Link>
              <Link to="/shops/buildings/17" className="item item-top"><div className="build_belpost">벨포스트</div></Link>
              <Link to="/shops/buildings/18" className="item item-top"><div className="build_designerclub">디자이너 크럽</div></Link>
              <Link to="/shops/buildings/3" className="item item-top"><div className="build_theot">디오뜨</div></Link>
              <Link to="/shops/buildings/9" className="item item-top-right"><div className="build_nuzzon">누죤</div></Link>
              <Link to="/shops/buildings/7" className="item"><div className="build_techno">테크노</div></Link>
              <Link to="/shops/buildings/2" className="item"><div className="build_cph">청평화</div></Link>
              <Link to="/shops/buildings/15" className="item"><div className="build_uus">유어스</div></Link>
              <Link to="/shops/buildings/6" className="item"><div className="build_queens">퀸스 스퀘어</div></Link>
              <Link to="/shops/buildings/11" className="item"><div className="build_shose">신발상가</div></Link>
              <div className="item item-right">
                <Link to="/shops/buildings">
                  <div className="more-shops">
                    <div className="content">
                      <strong>전체 상가</strong><br />
                      더보기
                    </div>
                    <img src={`${constants.resourceRoot}/main/ico_right4_w.gif`} />
                  </div>
                </Link>
              </div>
            </div>
            <div className="home-building-title">
              {i18n.get('pcFooter.hot')} <strong>{i18n.get('pcFooter.items')}</strong>
            </div>
            <div className="home-hotpick-container">
              <ProductListItems
                products={hotProducts}
                rowSize={5}
                isShowInfo={false}
              />
            </div>
            {/*
            <div className="home-building-title">
              <strong>트렌드</strong> 톡
            </div>
            <div className="home-trend-container">
              <div className="left-big">
                <img src={`${constants.resourceRoot}/banner/trandpick.jpg`} />
              </div>
              <div className="trend-right">
                {trendPicks.map(renderTrendPickItem)}
              </div>
            </div>
             */}
          </div>
        </div>
        <div className="footer-slogan">
          <div className="container no-padding slogan-container">
            <Link to="/service/info/service_info" className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico01.png`} />
              </div>
              <div className="text-box">
                <div className="title">{i18n.get('pcServiceInfo.infoTitle')}</div>
                <div className="content">
                  {i18n.get('pcServiceInfo.infoDesc1')}<br />
                  {i18n.get('pcServiceInfo.infoDesc2')}
                </div>
              </div>
            </Link>
            <Link to="/service/info/signup_info" className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico02.png`} />
              </div>
              <div className="text-box">
                <div className="title">{i18n.get('pcServiceInfo.signupTitle')}</div>
                <div className="content">
                  {i18n.get('pcServiceInfo.signupDesc1')}<br />
                  {i18n.get('pcServiceInfo.signupDesc2')}
                </div>
              </div>
            </Link>
            <Link to="/service/info/order_info" className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico03.png`} />
              </div>
              <div className="text-box">
                <div className="title">{i18n.get('pcServiceInfo.orderTitle')}</div>
                <div className="content">
                  {i18n.get('pcServiceInfo.orderDesc1')}<br />
                  {i18n.get('pcServiceInfo.orderDesc2')}
                </div>
              </div>
            </Link>
            <Link to="/service/info/customer_center" className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico04.png`} />
              </div>
              <div className="text-box">
                <div className="title">{i18n.get('pcServiceInfo.customerCenterTitle')}</div>
                <div className="content">
                  {i18n.get('pcServiceInfo.customerCenterDesc1')}<br />
                  {i18n.get('pcServiceInfo.customerCenterDesc2')}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  },
});

export default connect((state) => ({
  categories: state.categories,
  activeLocale: state.i18n.activeLocale,
  desktop_main_banner: state.cms.desktop_main_banner,
  desktop_right_banner: state.cms.desktop_right_banner,
  ...loadEntities(state, 'hotProducts', 'hotProducts'),
}))(Home);
