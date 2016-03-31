// Copyright (C) 2016 Goom Inc. All rights reserved.
/**
 * 2016. 03. 30. [heekyu]
 * This is currently used in Reorder
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AutoComplete from 'components/snippet/AutoComplete';

const BrandSearch = React.createClass({
  propTypes: {
    searchResult: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  render() {
    const { searchResult } = this.props;
    const { ApiAction, activeLocale } = this.context;
    const boxClassName = 'brand-search-box';
    const getItems = () => {
      const res = [];
      if (!searchResult) {
        return res;
      }
      const count = Math.min((searchResult.brands || []).length, 10);
      for (let i = 0; i < count; i++) {
        const brand = searchResult.brands[i];
        res.push({ text: _.get(brand, `data.name.${activeLocale}`), brand });
      }
      return res;
    };
    const onSelectItem = (item) => {
      const brand = item.brand;
      ApiAction.addBrandToCart(brand);
      ApiAction.resetSearchResult('brand');
      $(`${boxClassName} input`).val('');
    };
    const onChangeText = (text) => {
      if (!searchResult || text !== searchResult.text) {
        ApiAction.searchBrands(text, 0, 7);
      }
    };

    return (
      <AutoComplete
        boxClassName={boxClassName}
        items={getItems()}
        onChangeText={onChangeText}
        onSelectItem={onSelectItem}
        placeholder="브랜드 추가"
        text={searchResult ? searchResult.text : ''}
      />
    );
  },
});

export default connect(
  (state) => ({
    searchResult: _.get(state, 'search.brand'),
  })
)(BrandSearch);
