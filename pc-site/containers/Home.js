import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loadEntities from '../../commons/redux/util/loadEntities';

import ProductListItems from '../components/ProductListItems';
import ProductThumbnail from '../components/ProductThumbnail';

import { ApiAction } from '../redux/actions';
const { loadProducts } = ApiAction;

const Home = React.createClass({
  propTypes: {
    products: PropTypes.array,
    loadProducts: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProducts();
    $('.main-banner').owlCarousel({ autoPlay:10000, items:1 });
    $('.center-slide').owlCarousel({ autoPlay:10000, items:1 });
  },
  render() {
    const { products = [] } = this.props;
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
      const renderItem = (item) => {
        return (
          <a href={item.link} key={item.text} className={`left-category-item item-color-${item.colorNum}`}>
            {item.text}
          </a>
        )
      };
      const slideItems = [
        { img: 'https://img.alicdn.com/tps/TB1Lqf1LFXXXXbVXpXXXXXXXXXX-480-550.jpg' },
        { img: 'http://img.alicdn.com/tps/i2/TB1UHPPLFXXXXc0XpXXL2TJPFXX-480-550.jpg' },
        { img: 'http://img.alicdn.com/tps/i3/TB19sDBLFXXXXaOaXXXL2TJPFXX-480-550.jpg' },
      ];
      const renderSlideItem = (item) => {
        return (
          <a key={item.img} href="/products">
            <div className="img-wrap">
              <img src={item.img} />
            </div>
          </a>
        );
      };
      const smallBanners = [
        { title: 'New in 2016 Spring', subTitle: 'For Her', img: 'https://img.alicdn.com/tps/TB1oh4kLFXXXXcqXXXXXXXXXXXX-180-195.png' },
        { title: 'New in 2016 April', subTitle: 'Vintage Style', img: 'https://img.alicdn.com/tps/TB1gdcLLpXXXXbpXpXXXXXXXXXX-180-195.jpg' },
        { title: 'New in 2015 Spring', subTitle: 'For You', img: 'https://img.alicdn.com/tps/TB1n15zKXXXXXcLXVXXXXXXXXXX-180-195.jpg' },
        { title: 'New in 2014 Spring', subTitle: 'For Me', img: 'https://img.alicdn.com/tps/TB1LYMJLpXXXXbxXpXXXXXXXXXX-180-195.jpg' },
      ];
      const renderSmallBanner = (item) => {
        return (
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
      };
      return (
        <div className="curation-topic-box">
          <div className="left-category">
            <div className="left-category-title hover-highlight">WOMEN'S CLOTHING</div>
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
    return (
      <div className="main-wide-container">
        <div className="container no-horizontal-padding">
          <div className="main-banner-wrap">
            <div className="category-dropdown-box">
              <div className="category-title">
                Categories
              </div>
              <div className="category-dropdown-item">
                Shirts
              </div>
              <div className="category-dropdown-item">
                Shoes
              </div>
              <div className="category-dropdown-item">
                Women's
              </div>
              <div className="category-dropdown-item">
                Men's
              </div>
            </div>
            <div className="main-banner">
              <img src="http://img.alicdn.com/tps/i3/TB1Gh.zLpXXXXXMXVXXVpvE2pXX-750-400.jpg"/>
              <img src="https://img.alicdn.com/tps/TB12FmSLFXXXXXeapXXXXXXXXXX-750-400.jpg"/>
              <img src="https://img.alicdn.com/tps/TB10vWZLFXXXXcpXFXXXXXXXXXX-750-400.jpg"/>
            </div>
            <div className="right-banner">
              <img src="http://img.alicdn.com/tps/i1/TB1o1laLFXXXXb7aXXXJTjSZVXX-320-400.jpg"/>
            </div>
          </div>
          {renderCurationTopic()}
          <ProductListItems products={products} />
        </div>
      </div>
    );
  },
});

export default connect(
  state => loadEntities(state, 'products', 'products'),
  { loadProducts }
)(Home);
