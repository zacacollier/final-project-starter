import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import axios from 'axios';

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            signUpSignInError: '',
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
        }
    }

    handleSignIn = (credentials) => {
        axios.post('/api/signin', credentials)
        .then(resp => {
            const { token } = resp.data
            this.setState({
                ...this.state,
                renderSignUpSignIn: '',
                authenticated: token
            })
        })
    }

    handleSignOut = (credentials) => {
        localStorage.removeItem('token')
        this.setState({
            authenticated: false
        })
    }
    renderSignUpSignIn = () => {
        return <SignUpSignIn error={this.state.signUpSignInError} onSignUp={this.handleSignUp} />
    }

    renderApp() {
        return (
            <div>
                <Match
                    exactly
                    pattern="/"
                    render={() => <h1>I am protected!</h1>}
                />
                <Match
                    exactly
                    pattern="/secret"
                    component={Secret}
                />
                <Miss 
                    render={() => <h1>Not Found...</h1>} />
            </div>
        )
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
        )
    }
}

