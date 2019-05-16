import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import { createBrowserHistory } from 'history';

import CredentialsContext from '../context/credentials-context';
import LoginPage from '../components/LoginPage';
import App from '../components/App';
import LoadingPage from '../components/LoadingPage';
import NotFoundPage from '../components/NotFoundPage';

const history = createBrowserHistory();

const AppRouter = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [uid, setUid] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  // useEffect(() => {
  //
  //   // Confirm the link is a sign-in with email link.
  //   if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  //     // Additional state parameters can also be passed via URL.
  //     // This can be used to continue the user's intended action before triggering
  //     // the sign-in operation.
  //     // Get the email if available. This should be available if the user completes
  //     // the flow on the same device where they started it.
  //     var email = window.localStorage.getItem('emailForSignIn');
  //     if (!email) {
  //       // User opened the link on a different device. To prevent session fixation
  //       // attacks, ask the user to provide the associated email again. For example:
  //       email = window.prompt('Please provide your email for confirmation');
  //     }
  //     // The client SDK will parse the code from the link for you.
  //     firebase.auth().signInWithEmailLink(email, window.location.href)
  //       .then(function(result) {
  //         // Clear email from storage.
  //         window.localStorage.removeItem('emailForSignIn');
  //         // You can access the new user via result.user
  //         // Additional user info profile not available via:
  //         // result.additionalUserInfo.profile == null
  //         // You can check if the user is new or existing:
  //         // result.additionalUserInfo.isNewUser
  //       })
  //       .catch(function(error) {
  //         // Some error occurred, you can inspect the code: error.code
  //         // Common errors could be invalid email and invalid or expired OTPs.
  //       });
  //   }
  // });

  useEffect(() => {
    let subscribed = true;

    const renderApp = () => {
      if (!hasRendered) {
        setHasRendered(true);
      }
    };

    if (subscribed) {
      firebase.auth().onAuthStateChanged(user => {
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
      });
    }

    return () => {
      subscribed = false;
    };
  });

  return hasRendered ? (
    <Router history={history}>
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
    </Router>
  ) : (
    <LoadingPage />
  );
};

export { AppRouter as default };
