// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import roleUtil from 'commons/utils/roleUtil';

import { setHeader } from 'redux/actions';
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

import loadEntities from 'commons/redux/util/loadEntities';

import MainBanner from 'components/MainBanner';
import MainRecommendList from 'components/MainRecommendList';

const Home = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    activeLocale: PropTypes.string,
    mobile_main_banner: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: true,
      showSearch: true,
      showCart: true,
    });
    ajaxReturnPromise(null, 'get', '/api/v1/products/hot').then((res) => {
      this.setState(res);
    });
    this.context.ApiAction.loadCMSData('mobile_main_banner');
  },
  render() {
    const renderProducts = () => {
      if (!this.state.products) {
        return null;
      }
      return <MainRecommendList products={this.state.products} />;
    };

    const renderBrandLink = () => {
      const { auth } = this.props;
      const brandId = roleUtil.getBrandIdIfSeller(auth);
      if (brandId) {
        return <Link className="home-to-brand-button" to={`/brands/${brandId}`}>상품 조회</Link>;
      }
      return null;
    };

    return (
      <div className="main-container">
        <MainBanner items={_.get(this.props, `mobile_main_banner.${this.props.activeLocale}.rows`)} />
        <div className="promotion">
          {renderBrandLink()}
          <section className="promotion-block categories">
            <header>
              <Link to="/categoryList">
                {i18n.get('word.allCategories')}
              </Link>
            </header>
            <article>
              <ul className="flex-box">
                <li className="women">
                  <Link to="/categoryList/4">{i18n.get('mHome.categoryWomen')}</Link>
                </li>
                <li className="men">
                  <Link to="/categoryList/179">{i18n.get('mHome.categoryMen')}</Link>
                </li>
                <li className="shoes">
                  <Link to="/categoryList/51">{i18n.get('mHome.categoryShoes')}</Link>
                </li>
              </ul>
            </article>
          </section>
          <section className="promotion-block top-spread">
            <article>
              <ul className="flex-box top-spread-2">
                <li onClick={() => this.context.router.push('/service/info/service_info')}>
                  <span className="evt-icon evt-icon-1" />
                  <div className="evt-desc">
                    <p className="evt-title">{i18n.get('pcServiceInfo.infoTitle')}</p>
                    {i18n.get('pcServiceInfo.infoDesc1')}<br />
                    {i18n.get('pcServiceInfo.infoDesc2')}
                  </div>
                </li>
                <li onClick={() => this.context.router.push('/service/info/signup_info')}>
                  <span className="evt-icon evt-icon-2" />
                  <div className="evt-desc">
                    <p className="evt-title">{i18n.get('pcServiceInfo.signupTitle')}</p>
                    {i18n.get('pcServiceInfo.signupDesc1')}<br />
                    {i18n.get('pcServiceInfo.signupDesc2')}
                  </div>
                </li>
              </ul>
              <ul className="flex-box top-spread-2">
                <li onClick={() => this.context.router.push('/service/info/order_info')}>
                  <span className="evt-icon evt-icon-3" />
                  <div className="evt-desc">
                    <p className="evt-title">{i18n.get('pcServiceInfo.orderTitle')}</p>
                    {i18n.get('pcServiceInfo.orderDesc1')}<br />
                    {i18n.get('pcServiceInfo.orderDesc2')}
                  </div>
                </li>
                <li onClick={() => this.context.router.push('/service/info/customer_center')}>
                  <span className="evt-icon evt-icon-4" />
                  <div className="evt-desc">
                    <p className="evt-title">{i18n.get('pcServiceInfo.customerCenterTitle')}</p>
                    {i18n.get('pcServiceInfo.customerCenterDesc1')}<br />
                    {i18n.get('pcServiceInfo.customerCenterDesc2')}
                  </div>
                </li>
              </ul>
            </article>
          </section>
          {renderProducts()}
        </div>

        <div className="info-area">
        </div>
      </div>
    );
  },
});

export default connect(
  (state) => ({
    auth: state.auth,
    activeLocale: state.i18n.activeLocale,
    ...loadEntities(state, 'hotProducts', 'hotProducts'),
    mobile_main_banner: state.cms.mobile_main_banner,
  }),
  { setHeader }
)(Home);
