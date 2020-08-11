import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import configureStore from '../../configureStore';
import Home from '../home/Home';

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
