import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config is expected from environment variables (Vite)
// Define these in a .env file at project root (proyecto-react-1/.env):
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigValid = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app;
let dbInstance = null;

if (!isConfigValid) {
  console.error("Firebase config inválida o faltante. Revisa tu archivo .env.");
} else {
  app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app);
}

export const db = dbInstance;


