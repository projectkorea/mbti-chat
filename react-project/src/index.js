import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "css/styles.css";
import "css/loader.css";
import "css/chat.css";
import "css/rank.css";
import "css/free.css";
import "css/font.css";
import "css/progressBar.css";
import firebase from "firebase";

if (window.location.hostname === "localhost") {
  firebase.functions().useEmulator("localhost", 5001);
}

ReactDOM.render(<App />, document.getElementById("root"));
