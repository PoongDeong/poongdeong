import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import PomodoroPage from './pages/PomodoroPage';
import MyPage from './pages/MyPage';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/join" component={SignUpPage} />
      <Route path="/pomodoro" component={PomodoroPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/timeline" component={TimelinePage} />
    </Switch>
  );
}

export default App;
