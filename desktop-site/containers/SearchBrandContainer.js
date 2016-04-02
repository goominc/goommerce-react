// Copyright (C) 2016 Goom Inc. All rights reserved.
/**
 * 2016. 03. 30. [heekyu]
 * This is currently used in Reorder
 * TODO for general case
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AutoComplete from 'components/snippet/AutoComplete';
import { setReorderBrand } from 'redux/actions';
import searchUtil from 'commons/utils/searchUtil';

const BrandSearch = React.createClass({
  propTypes: {
    searchResult: PropTypes.object,
    setReorderBrand: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
  },
  render() {
    const { searchResult } = this.props;
    const { ApiAction, activeLocale } = this.context;
    const boxClassName = 'brand-search-box';
    const resetDropdown = () => {
      ApiAction.resetSearchResult('brand');
    };
    const onSelectItem = (item) => {
      const brand = item.item;
      ApiAction.addBrandToCart(brand);
      resetDropdown();
      this.props.setReorderBrand(brand);
      $(`.${boxClassName} input`).val('');
    };
    const onChangeText = (text) => {
      if (!searchResult || text !== searchResult.text) {
        ApiAction.searchBrands(text, 0, 7);
      }
    };

    const items = searchUtil.getSearchItems(searchResult ? searchResult.brands : [], `data.name.${activeLocale}`);
    return (
      <AutoComplete
        boxClassName={boxClassName}
        items={items}
        onChangeText={onChangeText}
        onSelectItem={onSelectItem}
        placeholder="브랜드 추가"
        resetDropdown={resetDropdown}
        text={searchResult ? searchResult.text : ''}
      />
    );
  },
});

export default connect(
  (state) => ({
    searchResult: _.get(state, 'search.brand'),
  }),
  { setReorderBrand }
)(BrandSearch);
