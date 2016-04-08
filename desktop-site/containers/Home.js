// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';
import loadEntities from 'commons/redux/util/loadEntities';
import i18n from 'commons/utils/i18n';

const Home = React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
    categories: PropTypes.object.isRequired,
    main_categories: PropTypes.array,
    products: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    $('.main-banner').owlCarousel({ autoPlay: 10000, items: 1 });
    $('.center-slide').owlCarousel({ autoPlay: 10000, items: 1 });
  },
  render() {
    const { activeLocale } = this.props;
    const renderCurationTopic = () => {
      const linkItems = [
        { link: '/products', text: 'Fall Dresses', colorNum: 0 },
        { link: '/products', text: 'Casual Dresses', colorNum: 1 },
        { link: '/products', text: 'Cardigans', colorNum: 0 },
        { link: '/products', text: 'Summer Dresses', colorNum: 1 },
        { link: '/products', text: 'Blazers', colorNum: 0 },
        { link: '/products', text: 'Jumpsuits', colorNum: 0 },
        { link: '/products', text: 'Blouses & Shirts', colorNum: 1 },
        { link: '/products', text: 'T-Shirts', colorNum: 0 },
        { link: '/products', text: 'Sunglasses', colorNum: 1 },
        { link: '/products', text: 'Scarves', colorNum: 0 },
        { link: '/products', text: 'Hair Accessories', colorNum: 0 },
      ];
      const renderItem = (item) => (
        <a href={item.link} key={item.text} className={`left-category-item item-color-${item.colorNum}`}>
          {item.text}
        </a>
      );
      const slideItems = [
        { img: 'https://img.alicdn.com/tps/TB1Lqf1LFXXXXbVXpXXXXXXXXXX-480-550.jpg' },
        { img: 'http://img.alicdn.com/tps/i2/TB1UHPPLFXXXXc0XpXXL2TJPFXX-480-550.jpg' },
        { img: 'http://img.alicdn.com/tps/i3/TB19sDBLFXXXXaOaXXXL2TJPFXX-480-550.jpg' },
      ];
      const renderSlideItem = (item) => (
        <a key={item.img} href="/products">
          <div className="img-wrap">
            <img src={item.img} />
          </div>
        </a>
      );
      const smallBanners = [
        {
          title: 'New in 2016 Spring',
          subTitle: 'For Her',
          img: 'https://img.alicdn.com/tps/TB1oh4kLFXXXXcqXXXXXXXXXXXX-180-195.png',
        },
        {
          title: 'New in 2016 April',
          subTitle: 'Vintage Style',
          img: 'https://img.alicdn.com/tps/TB1gdcLLpXXXXbpXpXXXXXXXXXX-180-195.jpg',
        },
        {
          title: 'New in 2015 Spring',
          subTitle: 'For You',
          img: 'https://img.alicdn.com/tps/TB1n15zKXXXXXcLXVXXXXXXXXXX-180-195.jpg',
        },
        {
          title: 'New in 2014 Spring',
          subTitle: 'For Me',
          img: 'https://img.alicdn.com/tps/TB1LYMJLpXXXXbxXpXXXXXXXXXX-180-195.jpg',
        },
      ];
      const renderSmallBanner = (item) => (
        <a key={item.title} href="/products">
          <div className="small-banner hover-highlight">
            <div className="title">{item.title}</div>
            <div className="sub-title">{item.subTitle}</div>
            <div className="img-wrap">
              <img src={item.img} />
            </div>
          </div>
        </a>
      );
      return (
        <div className="curation-topic-box">
          <div className="left-category">
            <div className="left-category-title hover-highlight">WOMENS CLOTHING</div>
            {linkItems.map((item) => renderItem(item))}
          </div>
          <div className="center-slide hover-highlight">
            {slideItems.map((item) => renderSlideItem(item))}
          </div>
          <div className="right-banner">
            <a href="/products">
              <div className="large-banner hover-highlight">
                <img src="http://img.alicdn.com/tps/i4/TB1QaHJLFXXXXXhXVXXxLrJSXXX-380-255.jpg" />
              </div>
            </a>
            {smallBanners.map((item) => renderSmallBanner(item))}
          </div>
        </div>
      );
    };
    const renderCategories = () => {
      const { main_categories } = this.props;
      if (!main_categories) {
        return (<div></div>);
      }
      const renderHoverCategory = () => {
        const { hoverCategory } = this.state;
        if (hoverCategory) {
          const children = hoverCategory.children || [];
          // FIXME
          return (
            <div className="category-hover-box">
              {children.map((c, i) => (
                <div className="child-box" key={i}>
                  <Link to={`/categories/${c.id}`}>
                    <div className="child-item"><b>{c.name[activeLocale]}</b></div>
                  </Link>
                  <div className="separator"></div>
                  {(c.children || []).map((gc, gi) => (
                    <Link key={gi} to={`/categories/${gc.id}`}>
                      <div className="child-item">{gc.name[activeLocale]}</div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          );
        }
        return '';
      };
      const topCategories = main_categories;
      const renderCategoryItem = (c, i) => {
        let className = 'category-dropdown-item';
        if (i === 0) {
          className += ' top-item';
        } else if (i === topCategories.length - 1) {
          className += ' bottom-item';
        }
        const handleMouseEnter = (e) => {
          $('.category-dropdown-item').removeClass('active');
          $(e.target).addClass('active');
          this.setState({ hoverCategory: c });
        };
        return (
          <Link key={i} to={`/categories/${c.id}`}>
            <div
              className={className}
              onMouseEnter={handleMouseEnter}
            >{c.name[activeLocale]}</div>
          </Link>
        );
      };
      return (
        <div className="category-dropdown-box">
          {topCategories.map(renderCategoryItem)}
          {renderHoverCategory()}
        </div>
      );
    };
    return (
      <div className="main-wide-container">
        <div className="main-menu-bar">
          <div className="container no-horizontal-padding">
            <div className="category-title">{i18n.get('word.categories')}
              <a href="/products">{i18n.get('word.seeAll')}</a>
            </div>
            <div className="menu-box">
              <div className="menu-item">Super Deals</div>
              <div className="menu-item">Super Market</div>
              <div className="menu-item">Featured Brands</div>
              <div className="menu-item">Best Selling</div>
              <div className="menu-item">IT Company</div>
            </div>
          </div>
        </div>
        <div className="container no-horizontal-padding">
          <div className="main-banner-wrap">
            {renderCategories()}
            <div className="main-banner">
              <img src="http://img.alicdn.com/tps/i3/TB1Gh.zLpXXXXXMXVXXVpvE2pXX-750-400.jpg" />
              <img src="https://img.alicdn.com/tps/TB12FmSLFXXXXXeapXXXXXXXXXX-750-400.jpg" />
              <img src="https://img.alicdn.com/tps/TB10vWZLFXXXXcpXFXXXXXXXXXX-750-400.jpg" />
            </div>
            <div className="right-banner">
              <img src="http://img.alicdn.com/tps/i1/TB1o1laLFXXXXb7aXXXJTjSZVXX-320-400.jpg" />
            </div>
          </div>
          {renderCurationTopic()}
        </div>
        <div className="footer-slogan">
          <div className="container no-padding slogan-container">
            <div className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico01.png`} />
              </div>
              <div className="text-box">
                <div className="title">서비스 소개</div>
                <div className="content">
                  믿고 거래하는<br />
                  No.1 온라인 도매시장
                </div>
              </div>
            </div>
            <div className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico02.png`} />
              </div>
              <div className="text-box">
                <div className="title">회원가입 안내</div>
                <div className="content">
                  고객 우선 원칙<br />
                  회원 시스템
                </div>
              </div>
            </div>
            <div className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico03.png`} />
              </div>
              <div className="text-box">
                <div className="title">주문 배송</div>
                <div className="content">
                  원하는 브랜드 및 상품<br />
                  사입 요청 가능
                </div>
              </div>
            </div>
            <div className="slogan-item">
              <div className="icon">
                <img src={`${constants.resourceRoot}/footer/main/keyword_ico04.png`} />
              </div>
              <div className="text-box">
                <div className="title">고객지원 센터</div>
                <div className="content">
                  편리한 소통을 위한<br />
                  언어별 고객지원 센터
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slogan-link-wide-container">
          <div className="container no-padding slogan-link-container">
            <div className="slogan-link-item">회사소개</div>
            <div className="slogan-link-item">이용약관</div>
            <div className="slogan-link-item">개인정보 취급방침</div>
            <div className="slogan-link-item">제휴안내</div>
          </div>
        </div>
      </div>
    );
  },
});

export default connect((state) => ({
  categories: state.categories,
  activeLocale: state.i18n.activeLocale,
  main_categories: state.cms.main_categories,
  ...loadEntities(state, 'products', 'products'),
}))(Home);
