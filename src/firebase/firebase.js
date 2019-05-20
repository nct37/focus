import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const database = firebase.database();

// Authenticate with Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Authenticate with email link settings
const actionCodeSettings = {
  // To set url based on development or production
  url: 'http://localhost:3000',
  handleCodeInApp: true,
};

export { firebase, database, googleAuthProvider, actionCodeSettings };
