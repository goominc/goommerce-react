import React from 'react';

import AppHeader from '../components/AppHeader';
import CommonFooter from '../components/CommonFooter';

const App = React.createClass({
  componentDidMount() {
  },
  render() {
    return (
      <div id="">
        <AppHeader />
        {this.props.children}
        <CommonFooter />
      </div>
    );
  },
});

export default App;
