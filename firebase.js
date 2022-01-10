const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA73rCHZuYL0Gp2pwPT96oBrzZa0bKGEOw",
  authDomain: "my-first-bot-ba743.firebaseapp.com",
  projectId: "my-first-bot-ba743",
  storageBucket: "my-first-bot-ba743.appspot.com",
  messagingSenderId: "113576149091",
  appId: "1:113576149091:web:66b96388bfd7dc3a737856",
  measurementId: "G-9ZM1CTKQ8J",
};

const app = initializeApp(firebaseConfig);
module.exports = {
  db: getFirestore(app),
};
