import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAowOSKAjafoK8Gcl2UhxmyxG5rNqLcuk",
  authDomain: "home-doctor-a0797.firebaseapp.com",
  projectId: "home-doctor-a0797",
  storageBucket: "home-doctor-a0797.appspot.com",
  messagingSenderId: "530897027733",
  appId: "1:530897027733:web:a1a048a4b9be4726b2119c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)