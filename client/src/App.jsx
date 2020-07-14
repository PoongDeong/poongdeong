import React from 'react';

import { Route, Switch } from "react-router-dom";

import MainPage from "./pages/MainPage";
import MatchingPage from "./pages/MatchingPage";

function App() {
  return (
    <Switch>
      <Route path="/" component={MatchingPage} />
      {/*<Route path="/" component={MainPage} />*/}
    </Switch>
  );
}

export default App;
