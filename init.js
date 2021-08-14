"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:3000`);

_app.default.listen(3000, handleListening);

// import app from "./app";

// const handleListening = () =>
//   console.log(`✅Listening on: http://localhost:3000`);

// app.listen(3000, handleListening);
