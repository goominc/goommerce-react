import _, { assign } from 'lodash';
import { combineReducers } from 'redux';
import CommonReducers from 'commons/redux/reducers';

function errorHandler(state = {}, action) {
  if (action.type === 'RESET_ERROR') {
    return assign({}, state, { error: {} });
  }
  return state;
}

function checkout(state = {}, action) {
  if (action.type === 'CHECKOUT_SET_STEP') {
    const nextState = assign({}, state);
    nextState.step = action.step;
    return nextState;
  }
  return state;
}

function menu(state = { showMenu: false }, action) {
  if (action.type === 'TOGGLE_MENU') {
    return assign({}, state, { showMenu: !state.showMenu });
  }
  return state;
}

function sign(state = { show: false, flag: 'sign' }, action) {
  if (action.type === 'TOGGLE_SIGN_REGISTER') {
    return assign({}, state, { show: action.show, flag: action.flag });
  }
  return state;
}

function headerSearch(state = { showSearch: false }, action) {
  if (action.type === 'TOGGLE_SEARCH') {
    return assign({}, state, { showSearch: !state.showSearch });
  }
  return state;
}

function menuAddon(state = { showLanguage: false, showCurrency: false }, action) {
  if (action.type === 'TOGGLE_LANGUAGE') {
    return assign({}, state, { showLanguage: !state.showLanguage });
  }
  if (action.type === 'TOGGLE_CURRENCY') {
    return assign({}, state, { showCurrency: !state.showCurrency });
  }
  return state;
}

function header(state = { showLogo: true, showSearch: true, showCart: true, titleText: '' }, action) {
  if (action.type === 'SET_HEADER') {
    return assign({}, action.option);
  }
  return state;
}

const productListInitialState = {
  viewType: { type: 'list-view', next: 'gallery-view', next2: 'bigPic-view' },
  showSort: false,
  showFilter: false,
  sorts: '-id',
};

function pageProductList(state = productListInitialState, action) {
  if (action.type === 'CHANGE_LIST_VIEW') {
    return assign({}, state, {
      viewType: { type: state.viewType.next, next: state.viewType.next2, next2: state.viewType.type },
    });
  }
  if (action.type === 'TOGGLE_PRODUCT_SORT') {
    return assign({}, state, { showSort: !state.showSort });
  }
  if (action.type === 'TOGGLE_PRODUCT_FILTER') {
    return assign({}, state, { showFilter: !state.showFilter });
  }
  if (action.type === 'SORT_PRODUCT') {
    return assign({}, state, { sorts: action.sorts });
  }
  if (action.type === 'FILTER_PRODUCT') {
    return assign({}, state, { filterPrice: action.price, filterBrand: action.brand });
  }

  return state;
}

const productDetailInitialState = {
  showCart: false,
  selectColor: null,
  selectSize: null,
  selectVariant: null,
};

function pageProductDetail(state = productDetailInitialState, action) {
  if (action.type === 'TOGGLE_PRODUCT_CART') {
    return assign({}, state, { showCart: !state.showCart });
  }
  if (action.type === 'PRODUCT_VARIANT_SET_COLOR') {
    if (action.color === state.selectColor) {
      return assign({}, state, { selectColor: null, selectVariant: null });
    }
    return assign({}, state, {
      selectColor: action.color,
      selectVariant: (action.color && state.selectSize) ? (`${action.color}-${state.selectSize}`) : null,
    });
  }
  if (action.type === 'PRODUCT_VARIANT_SET_SIZE') {
    if (action.size === state.selectSize) {
      return assign({}, state, { selectSize: null, selectVariant: null });
    }
    return assign({}, state, {
      selectSize: action.size,
      selectVariant: (state.selectColor && action.size) ? (`${state.selectColor}-${action.size}`) : null,
    });
  }
  return state;
}
function pageSignup(state = {}, action) {
  if (action.type === 'UPDATE_SIGNUP_PAGE_USER') {
    return _.merge({}, state, { user: action.user });
  } else if (action.type === 'CLEAR_SIGNUP_PAGE_USER') {
    return {};
  }
  return state;
}
function pageBrandPage(state = {}, action) {
  if (action.type === 'TOGGLE_BRAND_PAGE_MENU') {
    return Object.assign({}, state, { isOpenMenu: !state.isOpenMenu });
  }
  return state;
}

const rootReducer = combineReducers(
  Object.assign({}, CommonReducers.reducers, {
    errorHandler, checkout, menu, sign, headerSearch, menuAddon, header,
    pageProductList, pageProductDetail, pageSignup, pageBrandPage
  })
);

export default (state = {}, action) => {
  if (action.error) {
    return assign({}, state, { errorHandler: { error: action.error } });
  }
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
