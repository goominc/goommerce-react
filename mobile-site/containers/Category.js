import React from 'react';

import CategoryList from '../components/CategoryList';

const Category = React.createClass({
  /* TODO: query categories , connect
  console.log(this.props.params.categoryId);
  */
  render() {
    return (
      <CategoryList />
    );
  },
});

export default Category;
