import React from 'react'


class Signup extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  submitSignup = (event) => {
    event.preventDefault()

    this.props.submitSignup(this.state.email, this.state.password, this.state.passwordConfirmation)
  }

  updateEmail(event) {
    this.setState({ email: event.target.value })
  }

  updatePassword(event) {
    this.setState({ password: event.target.value })
  }

  updatePasswordConfirmation(event) {
    this.setState({ passwordConfirmation: event.target.value })
  }
  
  render() {
    return (
      <div>
        <h2>Signup</h2>
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

          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input 
            type="password" 
            name="password_confirmation" 
            id="password_confirmation" 
            onChange={(event) => this.updatePasswordConfirmation(event)} />

          <input 
            type="submit" 
            value="Signup" 
            onClick={event => this.submitSignup(event)} />
        </div>
      </div>
    )
  }
}

export default Signup;
