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
        isAuthenticated: true,
        authenticate(cb) {
          this.isAuthenticated = true;
          setTimeout(cb, 100); // fake async
        },
        signout(cb) {
          this.isAuthenticated = false;
          setTimeout(cb, 100);
        }
      }
    }

    this.toggleAuth = this.toggleAuth.bind(this)
  }

  toggleAuth() {
    this.setState((prevState) => {
      return { auth: { isAuthenticated: !prevState.auth.isAuthenticated }}
    })
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
                  ? <PrivateNav toggleAuth={() => this.toggleAuth()} />
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
                isNotLoggedIn={!this.state.auth.isAuthenticated} />

              <GuestRoute 
                path="/signup/" 
                component={Signup} 
                isNotLoggedIn={!this.state.auth.isAuthenticated} />
            </main>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
