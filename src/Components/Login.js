import React from 'react'


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  submitLogin(event) {
    event.preventDefault();

    this.props.submitLogin(this.state.email, this.state.password)
  }

  updateEmail(event) {
    this.setState({ email: event.target.value })
  }

  updatePassword(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className="form">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            name="email" 
            id="email"
            onChange={(event) => this.updateEmail(event)} />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            onChange={(event) => this.updatePassword(event)} />

          <input 
            type="submit" 
            value="Login"
            onClick={event => this.submitLogin(event)} />
        </div>
      </div>
    );
  }
}

export default Login;
