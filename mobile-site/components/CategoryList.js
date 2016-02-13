import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    const cates = [
      {'id' : 1, 'name' : 'Apparel & Accessories', 'className' : 'icon-topcat-10001', 'link' : '/', },
      {'id' : 2, 'name' : 'Beauty & Health', 'className' : 'icon-topcat-10004', 'link' : '/', },
    ];

    const cateDivs = cates.map((cat) => {
      return (
        <li key={cat.id}>
          <span className={cat.className}></span>
          <Link to={cat.link} rel="nofollow">{cat.name}</Link>
        </li>
        );
    });

    return (
      <article className="category-container">
        <ul className="cate-list clearfix">
          {cateDivs}          
        </ul>
      </article>
    );
  },
});
