import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import i18n from 'commons/utils/i18n';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { orders } = this.props;
    const { activeLocale, activeCurrency } = this.context;

    const renderOrder = () => {

      return orders.map((order) => {
        const getSummary = () => {
          const brands = new Set();
          let representitiveBrandName = '';
          let quantities = 0;
          for (let i = 0; i < order.orderProducts.length; i++) {
            const variant = order.orderProducts[i];
            const brandId = _.get(variant, 'brand.id');
            if (brandId) {
              if (!representitiveBrandName) {
                representitiveBrandName = _.get(variant, `brand.name.${activeLocale}`);
              }
              brands.add(brandId);
            }
            quantities += +(variant.quantity || 0);
          }
          const displayBrand = brands.size > 1 ?
            `${representitiveBrandName} 외 ${brands.size - 1}개 브랜드의` :
            `${representitiveBrandName}의`;
          return `${displayBrand} ${quantities}개 상품 구매내역`;
        };

        const status = order.status === 0 ?
          i18n.get(`enum.order.paymentStatus.${order.paymentStatus}`) :
          i18n.get(`enum.order.status.${order.status}`);
        return (
          <li className="myorder-listitem" key={order.id}>
            <div className="myorder-ymd">
              {order.createdAt.substr(0, 10)}
            </div>
            <Link to={`/myOrder/${order.id}`}>
              <div className="myorder-info">
                <div className="myorder-title">
                  {getSummary()}
                </div>
                <div className="myorder-status">
                  {status}
                </div>
                <span className="ms-arrow">
                  <span className="ms-icon icon-arrow-right"></span>
                </span>
              </div>
            </Link>
            <div className="myorder-price">
              {activeCurrency} {order[`total${activeCurrency}`]}
            </div>
          </li>
          );
      });
    };

    return (
      <section id="myorder-container">
        { /* <header>
          <div className="order-filter">
            All
          </div>
          <span className="expand-arrow"></span>
        </header> */ }
        <div className="myorder-list">
          <ul>
            {renderOrder()}
          </ul>
        </div>
      </section>
    );
  },
});
