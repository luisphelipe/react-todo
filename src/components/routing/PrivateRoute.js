import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        rest.isAuth ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login/", state: { from: rest.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
