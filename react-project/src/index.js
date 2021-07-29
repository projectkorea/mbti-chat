import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "styles.css";
import firebase from "firebase";

if (window.location.hostname === "localhost") {
  firebase.functions().useEmulator("localhost", 5001);
}

ReactDOM.render(<App />, document.getElementById("root"));
