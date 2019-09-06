import {
  firebase,
  googleAuthProvider,
  actionCodeSettings,
} from '../firebase/firebase';

export const loginWithGoogle = () =>
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase.auth().signInWithPopup(googleAuthProvider);
    })
    .catch(error => {
      console.log(error.code, error.message);
    });

export const sendLoginWithEmailLink = email => {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(error => {
      console.log(error);
    });
};

export const loginWithEmailLink = () => {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }
  firebase
    .auth()
    .signInWithEmailLink(email, window.location.href)
    .then(() => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    })
    .then(() => {
      window.localStorage.removeItem('emailForSignIn');
    })
    .catch(error => {
      console.log(error);
    });
};

export const startLogout = () =>
  setTimeout(() => {
    firebase.auth().signOut();
  }, 500);
