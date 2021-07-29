import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "routes/Chat";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Kakaotalk from "routes/Kakaotalk";
import Navigation from "components/Navigation";

const Router = ({ isLoggedin, setUserObj }) => {
  return (
    <BrowserRouter>
      {isLoggedin ? (
        <>
          <Navigation isLoggedin={isLoggedin} setUserObj={setUserObj} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route exact path="/profile" component={Profile} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Navigation isLoggedin={isLoggedin} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/callback/kakaotalk" component={Kakaotalk} />
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
