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
import Rank from "routes/Rank";
import Type from "routes/Type";
import Free from "routes/Free";
import Footer from "./Footer";
import Qna from "./Qna";

const Router = ({
  isLoggedin,
  setUserObj,
  userObj,
  mbtiArray,
  typeChoose,
  setTypeChoose,
  canMakeRoom,
  setCanMakeRoom,
  isSignInEmail,
}) => {
  return (
    <BrowserRouter>
      <Navigation isLoggedin={isLoggedin} />
      {isLoggedin ? (
        <>
          <Switch>
            <Route exact path="/">
              <Home userObj={userObj} typeChoose={typeChoose} />
            </Route>
            <Route exact path="/type">
              <Type mbtiArray={mbtiArray} />
            </Route>
            <Route exact path="/rank">
              <Rank mbtiArray={mbtiArray} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userObj={userObj}
                setUserObj={setUserObj}
                typeChoose={typeChoose}
                setTypeChoose={setTypeChoose}
                isSignInEmail={isSignInEmail}
              />
            </Route>
            <Route path="/free">
              <Free
                userObj={userObj}
                typeChoose={typeChoose}
                canMakeRoom={canMakeRoom}
                setCanMakeRoom={setCanMakeRoom}
                isSignInEmail={isSignInEmail}
              />
            </Route>
            <Route path="/room">
              <Chat userObj={userObj} typeChoose={typeChoose} />
            </Route>
            <Route path="/chat">
              <Chat
                userObj={userObj}
                typeChoose={typeChoose}
                isSignInEmail={isSignInEmail}
              />
            </Route>
            <Route path="/qna">
              {" "}
              <Qna />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      ) : (
        //   로그인 안함
        <>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/type">
              <Type mbtiArray={mbtiArray} />
            </Route>
            <Route exact path="/rank">
              <Rank mbtiArray={mbtiArray} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/login/signup">
              <SignUp />
            </Route>
            <Route exact path="/callback/kakaotalk">
              <Kakaotalk />
            </Route>
            <Route exact path="/callback/naver">
              <Naver />
            </Route>
            <Route path="/free">
              <Free />
            </Route>
            <Route path="/room">
              <Chat />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/qna">
              <Qna />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      )}
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
