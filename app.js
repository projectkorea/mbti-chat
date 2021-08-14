"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express.default)();
app.use((0, _morgan.default)("dev"));
app.use(
  (0, _helmet.default)({
    contentSecurityPolicy: false,
  })
); //request body parsing code

app.use(
  _express.default.urlencoded({
    extended: false,
  })
);
app.use(_express.default.json());
app.use(
  _express.default.static(_path.default.join(__dirname, "react-project/build"))
);
app.get("/", function (req, res, next) {
  res.sendFile(_path.default.join(__dirname, "react-project/build/index.html"));
});
app.get("*", function (req, res, next) {
  res.sendFile(_path.default.join(__dirname, "react-project/build/index.html"));
});
var _default = app;
exports.default = _default;

// import express from "express";
// import path from "path";
// import helmet from "helmet";
// import morgan from "morgan";

// const app = express();
// app.use(morgan("dev"));
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
// //request body parsing code
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "react-project/build")));

// app.get("/", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "react-project/build/index.html"));
// });

// app.get("*", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "react-project/build/index.html"));
// });

// export default app;
