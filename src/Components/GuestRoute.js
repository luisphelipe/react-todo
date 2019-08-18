import React from 'react'
import { Redirect, Route } from "react-router-dom";


const GuestRoute = ({ component: Component, ...rest }) => {
  const isNotLoggedIn = rest.isNotLoggedIn

  return (
    <Route
      {...rest}
      render={() =>
        isNotLoggedIn ? (
          <Component {...rest} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
        )
      }
    />
  )
}

export default GuestRoute;
