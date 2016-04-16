import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import i18n from 'commons/utils/i18n';

import { setHeader } from 'redux/actions';
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

import loadEntities from 'commons/redux/util/loadEntities';

import MainBanner from 'components/MainBanner';
import MainRecommendList from 'components/MainRecommendList';

const Home = React.createClass({
  propTypes: {
    searchProducts: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.props.setHeader(true, true, true, '');
    /* TODO replace with recommend products */
    this.props.searchProducts({
      // q: query,
      // categoryId: params.categoryId === 'all' ? undefined : params.categoryId,
      // brandId,
      offset: 0,
      limit: 30,
    }).then((res) => {
      // console.log(res);
      this.setState(res);
    });
  },
  render() {
    const renderProducts = () => {
      if (!this.state.products) {
        return null;
      }
      return <MainRecommendList products={this.state.products} />;
    };

    return (
      <div className="main-container">
        <MainBanner />
        <div className="promotion">
          <section className="promotion-block categories">
            <header>
              <Link to="/categoryList">
                {i18n.get('word.allCategories')}
              </Link>
            </header>
            <article>
              <ul className="flex-box">
                <li className="women">
                  <Link to="/categoryList/4">여성복</Link>
                </li>
                <li className="men">
                  <Link to="/categoryList/179">남성복</Link>
                </li>
                <li className="shoes">
                  <Link to="/categoryList/51">신발</Link>
                </li>
              </ul>
            </article>
          </section>
          <section className="promotion-block top-spread">
            <article>
              <ul className="flex-box top-spread-2">
                <li>
                  <span className="evt-icon evt-icon-1" />
                  <p className="evt-title">서비스 소개</p>
                  <p className="evt-desc">
                    믿고 거래하는<br />
                    No.1 온라인 도매시장
                  </p>
                </li>
                <li>
                  <span className="evt-icon evt-icon-2" />
                  <p className="evt-title">회원가입 안내</p>
                  <p className="evt-desc">
                    고객 우선 원칙<br />
                    회원 시스템
                  </p>
                </li>
              </ul>
              <ul className="flex-box top-spread-2">
                <li>
                  <span className="evt-icon evt-icon-3" />
                  <p className="evt-title">주문배송</p>
                  <p className="evt-desc">
                    원하는 브랜드 및 상품<br />
                    사입 요청 가능
                  </p>
                </li>
                <li>
                  <span className="evt-icon evt-icon-4" />
                  <p className="evt-title">고객지원 센터</p>
                  <p className="evt-desc">
                    편리한 소통을 위한<br />
                    언어별 고객지원센터
                  </p>
                </li>

              </ul>
            </article>
          </section>

        </div>
        {renderProducts()}

        <div className="info-area">
        </div>
      </div>
    );
  },
});

export default connect(
  (state) => ({
    ...loadEntities(state, 'products', 'products'),
    searchProducts: (query) => ajaxReturnPromise(state.auth, 'get', `/api/v1/products/search?${$.param(query)}`),
  }),
  { setHeader }
)(Home);
