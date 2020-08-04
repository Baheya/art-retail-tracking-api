import React, { useState, lazy, Suspense } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from './context/auth';

import './sass/main.scss';

import Header from './components/Header';
import Loading from './components/Loading';

const LoginComponent = lazy(() => import('./components/LoginComponent'));
const RegisterComponent = lazy(() => import('./components/RegisterComponent'));
const Artworks = lazy(() => import('./components/Artworks'));
const UploadPage = lazy(() => import('./components/UploadPage'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Artwork = lazy(() => import('./components/Artwork'));
const Sales = lazy(() => import('./components/Sales'));
const Profile = lazy(() => import('./components/Profile'));

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
        <Suspense fallback={<Loading text="Fetching Data" />}>
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <PrivateRoute path="/home" component={Artworks} />
            <PrivateRoute path="/upload" component={UploadPage} />
            <PrivateRoute path="/artworks/:id" component={Artwork} />
            <PrivateRoute path="/sales" component={Sales} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
