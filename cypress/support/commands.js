// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

var admin = require("firebase-admin");

var serviceAccount = require("");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const fbConfig = {
    apiKey: "AIzaSyDGFVVi_t8NMc2gemQW7oLPbaarjIPSCEE",
    authDomain: "webdex-3008e.firebaseapp.com",
    projectId: "webdex-3008e",
    storageBucket: "webdex-3008e.appspot.com",
    messagingSenderId: "1092449272417",
    appId: "1:1092449272417:web:fad23950a2091ce06be020",
  };

  firebase.initializeApp(fbConfig);

  attachCustomCommands({Cypress, cy, firebase});