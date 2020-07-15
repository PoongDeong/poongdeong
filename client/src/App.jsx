import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import PomodoroPage from './pages/PomodoroPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/pomodoro" component={PomodoroPage} />
    </Switch>
  );
}

export default App;
