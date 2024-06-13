// firebaseConfig.js
import { initializeApp } from "./firebase-app.js";
import { getAnalytics } from "./firebase-analytics.js";
import { getAuth } from "./firebase-auth.js";
import { getStorage } from "./firebase-storage.js";
import { getDatabase } from "./firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDtR9e2E5rPzTw6KH18JbFZWI44nfbFeZk",
    authDomain: "agroboumediene.firebaseapp.com",
    projectId: "agroboumediene",
    storageBucket: "agroboumediene.appspot.com",
    messagingSenderId: "327726045113",
    appId: "1:327726045113:web:a988ee175852a46d730868",
    measurementId: "G-T3H0541NDK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, storage, database };
