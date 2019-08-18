import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

import Todo from './Components/Todo'
import Login from './Components/Login'
import Signup from './Components/Signup'

import PrivateNav from './Components/PrivateNav'
import PublicNav from './Components/PublicNav'

import PrivateRoute from './Components/PrivateRoute'
import GuestRoute from './Components/GuestRoute'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {
        isAuthenticated: true
      }
    }

    this.toggleAuth = this.toggleAuth.bind(this)
    this.submitSignup = this.submitSignup.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.submitLogout = this.submitLogout.bind(this)
  }

  toggleAuth() {
    this.setState((prevState) => {
      return { auth: { isAuthenticated: !prevState.auth.isAuthenticated }}
    })
  }

  submitSignup(email="email", password="password", passwordConfirmation="confirmation") {
    console.log("submitting login")
    console.log(email, password, passwordConfirmation)
    this.toggleAuth();
  }

  submitLogin(email="email", password="password") {
    console.log("submitting login")
    console.log(email, password)
    this.toggleAuth();
  }

  submitLogout() {
    console.log("submitting logout")
    this.toggleAuth();
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              {
                (
                  this.state.auth.isAuthenticated
                  ? <PrivateNav submitLogout={() => this.submitLogout()} />
                  : <PublicNav />
                )
              }
            </nav>

            <main>
              <PrivateRoute 
                path='/' exact 
                component={Todo} 
                isLoggedIn={this.state.auth.isAuthenticated} />

              <GuestRoute 
                path="/login/" 
                component={Login} 
                isNotLoggedIn={!this.state.auth.isAuthenticated} 
                submitLogin={this.submitLogin} />

              <GuestRoute 
                path="/signup/" 
                component={Signup} 
                isNotLoggedIn={!this.state.auth.isAuthenticated} 
                submitSignup={this.submitSignup} />
            </main>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
