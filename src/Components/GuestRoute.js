import React from 'react'
import { Redirect, Route } from "react-router-dom";


const GuestRoute = ({ component: Component, ...rest }) => {
  const isNotLoggedIn = rest.isNotLoggedIn

  return (
    <Route
      {...rest}
      render={props =>
        isNotLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default GuestRoute;
