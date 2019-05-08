import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import { createBrowserHistory } from 'history';

import CredentialsContext from '../context/credentials-context';
import NotFoundPage from '../components/NotFoundPage';
import LoadingPage from '../components/LoadingPage';

const LoginPage = lazy(() => import('../components/LoginPage'));
const App = lazy(() => import('../components/App'));

const history = createBrowserHistory();

const AppRouter = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [uid, setUid] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  const renderApp = () => {
    if (!hasRendered) {
      setHasRendered(true);
    }
  };

  useEffect(() => {
    let subscribed = true;

    firebase.auth().onAuthStateChanged(user => {
      if (subscribed) {
        if (user) {
          setUid(user.uid);
          setUserEmail(user.email);
          setUserAvatar(user.photoURL);
          setIsAuthenticated(true);
          history.push('/notes');
          renderApp();
          return <Redirect to='/notes' />;
        } else {
          setIsAuthenticated(false);
          history.push('/');
          renderApp();
          return <Redirect to='/' />;
        }
      }
    });

    return () => {
      subscribed = false;
    };
  });

  return hasRendered ? (
    <Router history={history}>
      <Suspense fallback={LoadingPage}>
        <CredentialsContext.Provider
          value={{ userEmail, userAvatar, uid, isAuthenticated }}
        >
          <div>
            <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route path='/notes' component={App} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </CredentialsContext.Provider>
      </Suspense>
    </Router>
  ) : (
    <LoadingPage />
  );
};

export { AppRouter as default };
