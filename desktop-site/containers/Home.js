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
    /*
    $('.main-banner').owlCarousel({ autoPlay: 10000, items: 1 });
    $('.center-slide').owlCarousel({ autoPlay: 10000, items: 1 });
    */
  },
  render() {
    const { activeLocale } = this.props;
    const renderCategories = () => {
      if (!this.props.main_categories) {
        return (<div></div>);
      }
      const categories = this.props.main_categories;
      const renderCategory = (c, index) => {
        const onMouseEnter = () => {
          this.setState({ hoverCategory: c });
        };
        let className = 'item';
        const { cursor, hoverCategory } = this.state;
        if (cursor === 'categoryHover' && hoverCategory && c.id === hoverCategory.id) {
          className += ' active';
        }
        return (
          <Link key={`${c.id}-${index}`} to={`/categories/${c.id}`}>
            <div className={className}
              onMouseEnter={onMouseEnter}
            >
              {c.name[activeLocale]}
            </div>
          </Link>
        );
      };
      let categoryHoverBox = null;
      const hoverItems = [];
      if (this.state.hoverCategory) {
        (this.state.hoverCategory.children || []).forEach((child, index) => {
          if (index >= 2) {
            return;
          }
          hoverItems.push(
            <Link key={child.id} to={`/categories/${child.id}`}><div key={`depth1-${child.id}`} className="title-item">{child.name[activeLocale]}</div></Link> // eslint-disable-line
          );
          (child.children || []).forEach((child2, index2) => {
            if (index2 >= 3) {
              return;
            }
            hoverItems.push(
              <Link key={child2.id} to={`/categories/${child2.id}`}><div key={`depth2-${child2.id}`} className="sub-item">{child2.name[activeLocale]}</div></Link> // eslint-disable-line
            );
          });
        });
        categoryHoverBox = (
          <div className="category-hover-box"
            onMouseEnter={() => this.setState({ cursor: 'categoryHover' })}
            onMouseLeave={() => this.setState({ cursor: 'none' })}
          >
            {hoverItems}
          </div>
        );
      };
      return (
        <div className="category-frame">
          <div className="category-bar">
            {i18n.get('word.categories')}
            <Link to="/categories/all"><div className="category-all">{i18n.get('word.seeAll')}</div></Link>
          </div>
          <div className="category-main">
            {categories.map(renderCategory)}
          </div>
          {categoryHoverBox}
        </div>
      );
    };
    const trendPicks = [
      { img: `${constants.resourceRoot}/banner/trandpick1.jpg`, name: '엘루다 포스트 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick2.jpg`, name: '메르시 꽃무니 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick3.jpg`, name: '신화 핑크 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick4.jpg`, name: '신화 민트 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick5.jpg`, name: '파풀러 하늘색 브이넥', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick6.jpg`, name: '사치 미키 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick7.jpg`, name: '사치 인디언 맨투맨', price: 19800 },
      { img: `${constants.resourceRoot}/banner/trandpick8.jpg`, name: '네버비 일러스트 맨투맨', price: 19800 },
    ];
    const renderTrendPickItem = (trend, index) => {
      const className = index < 4 ? 'trend-top' : 'trend-bottom';
      return (
        <div key={trend.name} className={className}>
          <img src={trend.img} />
          <div className="product-name">
            {trend.name}<br />
            ￦<span className="price">{trend.price}</span>
          </div>
        </div>
      );
    };
    return (
      <div className="main-wide-container">
        <div className="container no-horizontal-padding">
          <div className="main-banner-wrap">
            {renderCategories()}
            <div className="main-banner">
              <img src={`${constants.resourceRoot}/banner/banner_intro_kor_20160408.jpg`} />
            </div>
            <div className="home-stylepick-banner">
              <strong>스타일 픽</strong>
              <span>스타일리스트의</span>
              <span>추천 스타일이</span>
              <span>곧 찾아옵니다</span>
            </div>
            <div className="right-banner">
              <img src={`${constants.resourceRoot}/banner/banner_event_20160408.jpg`} />
            </div>
          </div>
        </div>
        <div className="home-center-wrap">
          <div className="container no-horizontal-padding">
            <div className="home-building-title">
              <strong>상가별</strong> 매장정보
            </div>
            <div className="home-building-container">
              <div className="item item-top"><img src={`${constants.resourceRoot}/banner/build_apm.jpg`} /></div>
              <div className="item item-top"><img src={`${constants.resourceRoot}/banner/build_apmluxe.jpg`} /></div>
              <div className="item item-top"><img src={`${constants.resourceRoot}/banner/build_belpost.jpg`} /></div>
              <div className="item item-top"><img src={`${constants.resourceRoot}/banner/build_designerclub.jpg`} /></div>
              <div className="item item-top"><img src={`${constants.resourceRoot}/banner/build_theot.jpg`} /></div>
              <div className="item item-top-right"><img src={`${constants.resourceRoot}/banner/build_nuzzon.jpg`} /></div>
              <div className="item"><img src={`${constants.resourceRoot}/banner/build_techno.jpg`} /></div>
              <div className="item"><img src={`${constants.resourceRoot}/banner/build_cph.jpg`} /></div>
              <div className="item"><img src={`${constants.resourceRoot}/banner/build_uus.jpg`} /></div>
              <div className="item"><img src={`${constants.resourceRoot}/banner/build_queens.jpg`} /></div>
              <div className="item"><img src={`${constants.resourceRoot}/banner/build_shose.jpg`} /></div>
              <div className="item item-right">
                <div className="more-shops">
                  <div className="content">
                    <strong>시장별 상가</strong><br />
                    더보기
                  </div>
                  <img src={`${constants.resourceRoot}/main/ico_right4_w.gif`} />
                </div>
              </div>
            </div>
            <div className="home-building-title">
              <strong>트렌드</strong> 컬렉션
            </div>
            <div className="home-trend-container">
              <div className="left-big">
                <img src={`${constants.resourceRoot}/banner/trandpick.jpg`} />
                <div className="text-bar">
                  <strong>티셔츠 / 맨투맨</strong>
                  <span>간절기 데일리 아이템</span>
                </div>
              </div>
              <div className="trend-right">
                {trendPicks.map(renderTrendPickItem)}
              </div>
            </div>
          </div>
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
