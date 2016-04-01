// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AutoComplete from 'components/snippet/AutoComplete';
import searchUtil from 'commons/utils/searchUtil';
import { setReorderProduct } from 'redux/actions';

const ProductSearch = React.createClass({
  propTypes: {
    searchResult: PropTypes.object,
    setReorderProduct: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  render() {
    const { searchResult } = this.props;
    const { ApiAction, activeLocale } = this.context;
    const boxClassName = 'product-search-box';
    const dataKey = `data.nickname.${activeLocale}`;
    const onSelectItem = (item) => {
      const product = item.item;
      this.props.setReorderProduct(product);
      ApiAction.resetSearchResult('product');
      $(`.${boxClassName} input`).val(_.get(product, dataKey));
    };
    const onChangeText = (text) => {
      if (!searchResult || text !== searchResult.text) {
        ApiAction.searchProducts(text, 0, 7);
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
        text={searchResult ? searchResult.text : ''}
      />
    );
  },
});

export default connect(
  (state) => ({
    searchResult: _.get(state, 'search.product'),
  }),
  { setReorderProduct }
)(ProductSearch);
