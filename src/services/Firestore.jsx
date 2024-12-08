
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /* Substituir pelo seu projeto */
  apiKey: "AIzaSyDFDvNvXNTzJ_ZpUa8ZzjT7xf_PecyL5W4",
  authDomain: "fir-projeto-911d4.firebaseapp.com",
  databaseURL: "https://fir-projeto-911d4-default-rtdb.firebaseio.com",
  projectId: "fir-projeto-911d4",
  storageBucket: "fir-projeto-911d4.firebasestorage.app",
  messagingSenderId: "516212639475",
  appId: "1:516212639475:web:ba02a059ad45ac185dd986"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;