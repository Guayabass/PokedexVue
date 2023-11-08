const { defineConfig } = require("cypress");
// const cypressFirebasePlugin = require('cypress-firebase').plugin;
//const admin = require('firebase-admin');

module.exports = defineConfig({
  e2e: {
      baseUrl: 'http://localhost:5173',
      viewportWidth: 1200,
      viewportHeight: 1200,
      setupNodeEvents(on, config) {
        // e2e testing node events setup code
        // return cypressFirebasePlugin(on, config, admin,{
        //     // Here is where you can pass special options. 
        //     // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        //     //    projectId: 'some-project',
        //     // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        //     //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
        // });
      },
  },
});
