// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBrzWDJyDQL4ggb_pKOPkrnJ5KgQAJgqA',
  authDomain: 'thrillerfiend-3970b.firebaseapp.com',
  projectId: 'thrillerfiend-3970b',
  storageBucket: 'thrillerfiend-3970b.appspot.com',
  messagingSenderId: '874057646648',
  appId: '1:874057646648:web:9bf01233f00c8e8ea3dccd',
  measurementId: 'G-5CJWFSC5NH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
