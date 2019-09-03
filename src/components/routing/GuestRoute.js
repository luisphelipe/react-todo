import React from "react";
import { Redirect, Route } from "react-router-dom";

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        !rest.isAuth ? (
          <Component {...rest} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
        )
      }
    />
  );
};

export default GuestRoute;
