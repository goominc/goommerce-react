import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader } from 'redux/actions';
const { loadCategories } = ApiAction;

import CategoryList from 'components/CategoryList';

const Category = React.createClass({
  propTypes: {
    categories: PropTypes.object,
    loadCategories: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    params: PropTypes.object,
  },
  componentDidMount() {
  },
  componentWillReceiveProps(nextProps) {
    const { params, categories } = nextProps;
    if (params && params.categoryId && categories[params.categoryId]) {
      this.props.setHeader(false, true, true, categories[params.categoryId].name.en);
    }
  },
  render() {
    const { params, categories } = this.props;
    let currentCategory;
    if (params && params.categoryId && categories[params.categoryId]) {
      currentCategory = categories[params.categoryId];
    } else {
      currentCategory = categories.tree;
    }
    currentCategory = currentCategory || {};
    return (
      <CategoryList categories={categories} currentCategory={currentCategory} />
    );
  },
});

export default connect(
  (state) => ({ categories: state.categories }),
  { loadCategories, setHeader }
)(Category);
