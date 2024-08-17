// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
   firebaseConfig : {
    apiKey: "AIzaSyAzGUQnD_5WnZPcK6FR7TImWZKLL0HaTIE",
    authDomain: "gestionsalarie-99393.firebaseapp.com",
    projectId: "gestionsalarie-99393",
    storageBucket: "gestionsalarie-99393.appspot.com",
    messagingSenderId: "554474783045",
    appId: "1:554474783045:web:7313f2ee63ba5cd5debe2c",
    measurementId: "G-26S60SLS3X"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
