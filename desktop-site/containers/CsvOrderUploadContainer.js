// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import csvParse from 'csv-parse';

import CartProduct from 'components/CartProduct';

const CsvOrderUploadContainer = React.createClass({
  propTypes: {
    csvCarts: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  getInitialState() {
    return { brands: {}, activeBrand: null, summary: {} };
  },
  render() {
    const { ApiAction } = this.context;
    const { csvCarts } = this.props;
    const onSelectFile = (e) => {
      this.setState({ activeBrand: null, brands: {} });
      const r = new FileReader();
      // const bizImageName = e.target.files[0].name;
      r.onload = (event) => {
        csvParse(event.target.result, (err, result) => {
          if (err) {
            window.alert('CSV 파일 읽기에 실패하였습니다. 파일을 확인해 주세요');
            return;
          }
          if (result.length < 2) {
            window.alert('주문 데이터가 없습니다.');
            return;
          }
          const brands = {};
          for (let i = 1; i < result.length; i++) {
            const row = result[i];
            const brand = row[1];
            if (!brands[brand]) {
              brands[brand] = { rows: [] };
            }
            brands[brand].rows.push(row);
          }
          const summary = {
            brandsCount: Object.keys(brands).length,
            productsCount: result.length - 1,
          };
          this.setState({ brands, activeBrand: Object.keys(brands)[0], summary });
          // ApiAction.createCartFromCsv(result.slice(1, 10));
        });
      };
      r.readAsText(e.target.files[0]);
    };
    const { brands, activeBrand, summary } = this.state;
    const renderCart = () => {
      if (!csvCarts) {
        return null;
      }
      return <CartProduct brands={csvCarts.brands} />;
    };
    const renderRow = (row) => {
      let className = 'before-load';
      if (row.product) {
        className = '';
      }
      return (
        <tr className={className}>
          <td>{row[1]}</td>
          <td>{row[3]}</td>
          <td>{row[5].split(',')[0]}</td>
          <td>{row[5].split(',')[1]}</td>
          <td>{row[6]}</td>
          <td>{row[7]}</td>
        </tr>
      );
    };
    const brandNames = Object.keys(brands);
    const renderTable = () => {
      if (!activeBrand) {
        return null;
      }
      return (
        <table>
          <thead>
          <tr>
            <th>브랜드</th>
            <th>상품</th>
            <th>색깔</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>수량</th>
            <th>상태</th>
          </tr>
          </thead>
          <tbody>
          {brands[activeBrand].rows.map(renderRow)}
          </tbody>
        </table>
      );
    };
    const renderSummary = () => {
      if (!Object.keys(brands).length) {
        return null;
      }
    };
    return (
      <div className="csv-upload-container">
        <input type="file" onChange={onSelectFile} /><br />
        <p>
          브랜드:
          <select onChange={(e) => this.setState({ activeBrand: e.target.value })} value={activeBrand}>
            {brandNames.map((b) => <option value={b}>{b}</option>)}
          </select>
        </p>
        {renderTable()}
      </div>
    );
  },
});

export default connect(
  (state) => ({
    csvCart: state.csvCart,
  })
)(CsvOrderUploadContainer);
