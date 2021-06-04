import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyBgbT9G-GrnMfCfa61zgXsD4Md4oNXhOyM",
	authDomain: "fyp1234567-e68ed.firebaseapp.com",
	projectId: "fyp1234567-e68ed",
	storageBucket: "fyp1234567-e68ed.appspot.com",
	messagingSenderId: "792440741877",
	appId: "1:792440741877:web:a6a51871e795be618d8abc",
	measurementId: "G-Y0VBP7EYFV"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) :'';
  
export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();