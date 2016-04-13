// Copyright (C) 2016 Goom Inc. All rights reserved.
/**
 * 2016. 04. 01. [heekyu]
 * This is currently used in Reorder
 * TODO for general case
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AutoComplete from 'components/snippet/AutoComplete';
import searchUtil from 'commons/utils/searchUtil';
import { setReorderProduct } from 'redux/actions';

const ProductSearch = React.createClass({
  propTypes: {
    brand: PropTypes.object,
    cart: PropTypes.object,
    merchandise: PropTypes.object,
    searchResult: PropTypes.object,
    setReorderProduct: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  componentDidMount() {
    this.context.ApiAction.loadMerchandiseProducts();
  },
  render() {
    const { brand, merchandise, searchResult } = this.props;
    const { ApiAction, activeLocale } = this.context;
    const boxClassName = 'product-search-box';
    const dataKey = `name.${activeLocale}`;
    const resetDropdown = () => {
      ApiAction.resetSearchResult('product');
    };
    const onSelectItem = (item) => {
      const product = item.item;
      this.props.setReorderProduct(product);
      resetDropdown();
      $(`.${boxClassName} input`).val(_.get(product, dataKey));
    };
    const onChangeText = (text) => {
      // 2016. 04. 06. [heekyu] TODO do not call API if same brand and same text
      const query = { q: text };
      if (brand) {
        query.brandId = brand.id;
      }
      const limit = 50;
      ApiAction.searchProducts(query, 0, limit);
    };
    const fnGetText = (item) => _.get(item, dataKey);

    if (brand && searchResult) {
      const productsInMerchandise = searchUtil.getProductsFromMerchandise(brand.id, merchandise, searchResult.text);
      if (productsInMerchandise) {
        searchResult.products = productsInMerchandise.concat((searchResult.products || []));
      }
    }
    const items = searchUtil.getSearchItems(searchResult ? searchResult.products : [], fnGetText);
    return (
      <AutoComplete
        boxClassName={boxClassName}
        items={items}
        onChangeText={onChangeText}
        onSelectItem={onSelectItem}
        placeholder="상품 추가"
        resetDropdown={resetDropdown}
        text={searchResult ? searchResult.text : ''}
      />
    );
  },
});

export default connect(
  (state) => ({
    brand: _.get(state, 'reorder.brand'),
    cart: state.cart,
    merchandise: state.merchandise,
    searchResult: _.get(state, 'search.product'),
  }),
  { setReorderProduct }
)(ProductSearch);
