import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//request body parsing code
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//
app.use(express.static(path.join(__dirname, "react-project/build")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "react-project/build/index.html"));
});

app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "react-project/build/index.html"));
});

export default app;
