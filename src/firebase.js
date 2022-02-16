import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAfKsiGz0Ip1oU5LQfdCqehWaVPQxpxIM4",
    authDomain: "blogger-clone.firebaseapp.com",
    databaseURL: "https://blogger-clone.firebaseio.com",
    projectId: "blogger-clone",
    storageBucket: "blogger-clone.appspot.com",
    messagingSenderId: "399793697750",
    appId: "1:399793697750:web:3a2cc4046dd166d083ea77",
    measurementId: "G-QG2RVFMGJV"
};

const app = initializeApp(firebaseConfig);
const store = getFirestore(app);


export default {
    "firestore": store,
    "app": app
}

