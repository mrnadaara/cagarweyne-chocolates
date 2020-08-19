import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import configureStore from '../../configureStore';
import Home from '../home/Home';
import ProtectedRoute from './ProtectedRoute';
import Auth from '../Auth/Auth';
import ChocDetail from '../ChocDetail/ChocDetail';
import Favourites from '../Favourites/Favourites';

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route path="/signin" component={Auth} />
        <ProtectedRoute path="/favourites" component={Favourites} />
        <ProtectedRoute path="/chocolate" component={ChocDetail} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
