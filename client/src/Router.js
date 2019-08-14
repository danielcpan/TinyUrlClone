import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import Home from './views/Home';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/analytics" exact component={Login} /> */}
    </Switch>
  </BrowserRouter>
);
