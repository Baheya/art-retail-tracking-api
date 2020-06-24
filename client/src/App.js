import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/auth';
import Header from './components/Header';
import Divider from './components/Divider';
import Navigation from './components/Navigation';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Artworks from './components/Artworks';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Header />
        <Divider />
        <Navigation />
        <Divider />
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <PrivateRoute path="/home" component={Artworks} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
