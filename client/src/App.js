import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';
import { Alert } from 'react-bootstrap';
import ReactTimeout from 'react-timeout';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import GitHubSearchBar from './GitHubSearchBar.js';
import Secret from './Secret';
import './App.css';


export default class App extends Component {
    constructor() {
        super()

        this.state = {
            signUpSignInError: '',
            signInSuccess: false,
            authenticated: localStorage.getItem('token')
        }
    }

    handleSignUp = (credentials) => {
        const { username, password, confirmPassword } = credentials

        if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
            this.setState({
                ...this.state,
                signUpSignInError: 'Must provide input for all fields.'
            })
        }
        else {
            axios.post('/api/signup', credentials)
            .then(resp => {
                const { token } = resp.data
                this.setState({
                    ...this.state,
                    signUpSignInError: '',
                    authenticated: token
                })
                localStorage.setItem('token', token)
            })
            .catch((err) => {
                let resp = Object.values(err)
                let error = resp[1].data.error
                this.setState({
                    signUpSignInError: error
                })
            })
        }
    }

    handleSignIn = (credentials) => {
      //TODO: add a nice spinner to verify auth success
        const { username, password } = credentials
        if (!username.trim() || !password.trim()) {
            this.setState({
                ...this.state,
                signUpSignInError: 'Must provide a valid input for all fields.'
            })
        }
        else {
            axios.post('/api/signin', {
                    username,
                    password,
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
                 .then(resp => {
                     const { token } = resp.data
                     localStorage.setItem('token', token)
                     this.setState({
                         ...this.state,
                         signUpSignInError: '',
                         signInSuccess: true,
                         authenticated: token
                     })
            })
        }
    }

    handleAlertClick = () => {
        this.setState({
            signUpSignInError: ''
        })
    }
    handleSignOut = (credentials) => {
        localStorage.removeItem('token')
        this.setState({
            signInSuccess: false,
            authenticated: false
        })
    }
    renderSignUpSignIn = () => {
        return (
          <SignUpSignIn
                   error={this.state.signUpSignInError}
                   isOpen={this.state.signInSuccess}
                   onSignUp={this.handleSignUp}
                   onSignIn={this.handleSignIn}
                   onAlertClick={this.handleAlertClick}
            />
    );
}

    renderApp() {
        return (
            <div>
                <Match
                    exactly
                    pattern="/"
                    render={() => {
                      return(
                        <div>
                          <Modal
                            isOpen={this.state.signInSuccess}
                            onAfterOpen={setTimeout(() => {
                              this.setState({
                              signInSuccess: false
                              })
                            }, 4000)
                            }
                            onRequestClose={this.props.onRequestClose}
                            closeTimeoutMS={3000}
                            contentLabel="Modal"
                          >
                            <Alert onClick={this.handleAlertClick} bsStyle="success">
                              <strong>Logged In Successfully!</strong>
                            </Alert>
                          </Modal>
                          <GitHubSearchBar />
                        </div>
                      )}
                      }
                />
                <Match
                    exactly
                    pattern="/secret"
                    component={Secret}
                />
                <Miss
                    render={() => <h1>Not Found...</h1>} />
            </div>
        );
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <TopNavbar
                        showNavItems={true}
                        onSignOut={this.handleSignOut}
                    />
                    {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
                </div>
            </BrowserRouter>
        );
    }
}

