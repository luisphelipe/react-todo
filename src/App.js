import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import APIRequests from "./requests/api.requests";

import TodoList from "./components/todo/TodoList";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import PrivateNav from "./components/routing/PrivateNav";
import PublicNav from "./components/routing/PublicNav";
import PrivateRoute from "./components/routing/PrivateRoute";
import GuestRoute from "./components/routing/GuestRoute";

function App() {
  const [isAuth, setIsAuth] = useState(false),
    [token, setToken] = useState("");

  useEffect(() => {
    if (token) setIsAuth(true);
    else setIsAuth(false);

    console.log(token);
  }, [token]);

  useEffect(() => {
    APIRequests().wakeHerokuServer();
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          {isAuth ? (
            <PrivateNav
              handleLogout={() => {
                setIsAuth(false);
                setToken("");
              }}
            />
          ) : (
            <PublicNav />
          )}
        </nav>

        <PrivateRoute
          path="/"
          exact
          component={TodoList}
          isAuth={isAuth}
          authToken={token}
        />

        <GuestRoute
          path="/login/"
          component={Login}
          isAuth={isAuth}
          setToken={setToken}
        />

        <GuestRoute
          path="/signup/"
          component={Signup}
          isAuth={isAuth}
          setToken={setToken}
        />
      </Router>
    </div>
  );
}

export default App;
