import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag'

import './App.css';

import Todo from './Components/Todo'
import Login from './Components/Login'
import Signup from './Components/Signup'

import PrivateNav from './Components/PrivateNav'
import PublicNav from './Components/PublicNav'

import PrivateRoute from './Components/PrivateRoute'
import GuestRoute from './Components/GuestRoute'


const apolloClient = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  uri: 'https://rails-graphql-todo.herokuapp.com/graphql',
});

const MUTATION_SIGNUP = gql`
  mutation userSignup(
    $clientId: String!, 
    $clientSecret: String!, 
    $email: String!, 
    $password: String!, 
    $passwordConfirmation: String!) {

    userSignup(
      clientId: $clientId, 
      clientSecret: $clientSecret, 
      email: $email, 
      password: $password, 
      passwordConfirmation: $passwordConfirmation) {

        user {
          id
          email
        }

        token
        errors
    }
  }
`

const MUTATION_LOGIN = gql`
  mutation userLogin(
    $clientId: String!, 
    $clientSecret: String!, 
    $email: String!, 
    $password: String!) {

    userLogin(
      clientId: $clientId, 
      clientSecret: $clientSecret, 
      email: $email, 
      password: $password) { 

        user {
          id
          email
        }

        token
        errors
    }
  }
`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      doorkeeper: {
        clientId: "S7aN6PMOUhrdFxWTS4ke2hif4C6o4H3nFqAV6uciCss",  
        clientSecret: "pSURYFc4sr6HnQ_bt2Yqevhy8VGNb8xyrUZDE2w6gjM",
      },
      auth: {
        isAuthenticated: false,
        token: "",
      },
      errors: []
    }

    this.submitSignup = this.submitSignup.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.submitLogout = this.submitLogout.bind(this)
  }


  submitSignup(email="email", password="password", passwordConfirmation="confirmation") {
    console.log("submitting signup")
    console.log(email, password, passwordConfirmation)

    const params = {
      "clientId": this.state.doorkeeper.clientId,  
      "clientSecret": this.state.doorkeeper.clientSecret,
      "email": email,
      "password": password,
      "passwordConfirmation": passwordConfirmation
    }

    apolloClient.mutate({mutation: MUTATION_SIGNUP, variables: params}).then(res => {
      let errors = res['data']['userSignup']['errors']

      if (errors) {
        this.setState({
          errors
        })

        return;
      }

      let token = res['data']['userSignup']['token']

      this.setState({auth: {
        isAuthenticated: true,
        token
      }})
    })
  }

  submitLogin(email="email", password="password") {
    console.log("submitting login")
    console.log(email, password)

    const params = {
      "clientId": this.state.doorkeeper.clientId,  
      "clientSecret": this.state.doorkeeper.clientSecret,
      "email": email,
      "password": password,
    }

    apolloClient.mutate({mutation: MUTATION_LOGIN, variables: params}).then(res => {
      let errors = res['data']['userLogin']['errors']

      if (errors) {
        this.setState({
          errors
        })

        return;
      }

      let token = res['data']['userLogin']['token']

      this.setState({auth: {
        isAuthenticated: true,
        token
      }})
    })
  }

  submitLogout() {
    this.setState({
      auth: {
        isAuthenticated: false,
        token: ''
      }
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
                  ? <PrivateNav submitLogout={() => this.submitLogout()} />
                  : <PublicNav />
                )
              }
            </nav>

            <main>

              <PrivateRoute 
                path='/' exact 
                component={Todo} 
                isLoggedIn={this.state.auth.isAuthenticated} 
                authToken={this.state.auth.token} 
                />

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
                
              {
                this.state.errors.length > 0 ? 
                <div id="errors">
                  <h3>ERRO(s):</h3> 
                  {
                    this.state.errors.map((erro) => {
                      return <p>{erro}</p>
                    })
                  }
                </div> :
                ''
              }
            </main>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
