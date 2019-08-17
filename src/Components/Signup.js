import React from 'react'


function Signup() {
  return (
    <div>
      <h2>Signup</h2>
      <div className="form">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input type="password" name="password_confirmation" id="password_confirmation"/>
        <input type="submit" value="Signup"/>
      </div>
    </div>
  );
}

export default Signup;
