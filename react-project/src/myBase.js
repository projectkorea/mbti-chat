import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3C3sMgFqn9XWymW-7BSsyOt4pLZmrhmI",
  authDomain: "mbti-chat-cf115.firebaseapp.com",
  projectId: "mbti-chat-cf115",
  storageBucket: "mbti-chat-cf115.appspot.com",
  messagingSenderId: "315935660847",
  appId: "1:315935660847:web:72b8974d9f5bce6f0c5fda",
  measurementId: "G-80VGJDGCR0",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
