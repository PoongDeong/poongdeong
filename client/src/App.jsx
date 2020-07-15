import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/signup" component={SignUpPage} />
    </Switch>
  );
}

export default App;
