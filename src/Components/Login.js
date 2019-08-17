import React from 'react'


function Login() {
  return (
    <div>
      <h2>Login</h2>
      <div className="form">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
        <input type="submit" value="Login"/>
      </div>
    </div>
  );
}

export default Login;
