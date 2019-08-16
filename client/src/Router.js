import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import AppToolBar from './components/AppToolBar';
import Home from './views/Home';
import Analytics from './views/Analytics';

export default () => (
  <BrowserRouter>
    <AppToolBar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/analytics" exact component={Analytics} />
    </Switch>
  </BrowserRouter>
);
