import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import configureStore from '../../configureStore';
import Home from '../home/Home';
import ProtectedRoute from './ProtectedRoute';
import Auth from '../Auth/Auth';

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route path="/signin" component={Home} />
        <ProtectedRoute path="/favourites" component={() => 'favourites!'} />
        <ProtectedRoute path="/chocolate" component={() => 'chocolate!'} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
