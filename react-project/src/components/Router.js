import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "routes/Chat";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Kakaotalk from "routes/Kakaotalk";
import Naver from "routes/Naver";
import Navigation from "components/Navigation";
import SignUp from "routes/SignUp";

const Router = ({ isLoggedin, setUserObj, userObj, mbtiArray, typeInit }) => {
  return (
    <BrowserRouter>
      {isLoggedin ? (
        <>
          <Navigation isLoggedin={isLoggedin} setUserObj={setUserObj} />
          <Switch>
            <Route exact path="/">
              <Home mbtiArray={mbtiArray} />
            </Route>
            <Route path="/chat">
              <Chat userObj={userObj} />
            </Route>
            <Route path="/profile">
              <Profile userObj={userObj} typeInit={typeInit} />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Navigation isLoggedin={isLoggedin} />
          <Switch>
            <Route exact path="/">
              <Home mbtiArray={mbtiArray} />
            </Route>
            <Route path="/chat" component={Chat} userObj={userObj} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/signup" component={SignUp} />
            <Route exact path="/callback/kakaotalk">
              <Kakaotalk />
            </Route>
            <Route exact path="/callback/naver">
              <Naver />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
