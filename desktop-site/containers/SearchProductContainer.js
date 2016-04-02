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
    searchResult: PropTypes.object,
    setReorderProduct: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  render() {
    const { brand, searchResult } = this.props;
    const { ApiAction, activeLocale } = this.context;
    const boxClassName = 'product-search-box';
    const dataKey = `data.nickname.${activeLocale}`;
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
      if (!searchResult || text !== searchResult.text) {
        const query = { q: text };
        if (brand) {
          query.brandId = brand.id;
        }
        ApiAction.searchProducts(query, 0, 7);
      }
    };
    const items = searchUtil.getSearchItems(searchResult ? searchResult.products : [], dataKey);
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
    searchResult: _.get(state, 'search.product'),
    brand: _.get(state, 'reorder.brand'),
  }),
  { setReorderProduct }
)(ProductSearch);
