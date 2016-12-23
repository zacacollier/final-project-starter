import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';
import _ from 'lodash';
import { Alert } from 'react-bootstrap';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import GitHubSearchBar from './GitHubSearchBar.js';
import Secret from './Secret';
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signUpSignInError: '',
            githubSearchStatus: '',
            signInSuccess: false,
            authenticated: localStorage.getItem('token'),
            userID: [],
            username: '',
            lists: [],
            languages: []
        }
    }
// Fetch User Profile and Lists from Mongo API
    componentWillMount = () => {
      axios.get('/api/lists', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then((res) => this.setState({
        lists: [res.data],
        userID: res.data._id,
        username: res.data.title
      }))
      .catch(err => console.error(`Axios - could not GET from ${URL}: ${err}`))
    }

    mapLanguagesToState = (languages) => {
      this.setState({ languages: languages })
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
  handleGithubSearchSubmit = (event, res) => {
    if (event) { this.setState({ githubSearchStatus: 'error' }) }
  }

  handleDropdownItemClick = (result, language) => {
//    console.log(result, language)
//    .then((res, result) => {
      let targetList = this.state.lists.filter((list) => {
        return _.includes(this.state.lists, result.title)
      })
      if (_.includes(...this.state.lists, result.title)) {
        axios.post('/api/items',  {
            username: result.login,
            realname: result.name,
            avatar: result.avatar_url,
            githubID: result.id,
            repos: result.repos_url,
            user: this.state.userId,
            list: targetList
          },
          { headers: {
              authorization: localStorage.getItem('token')
            },
          })
        .then(res => console.log(res))
        .catch(err => console.error(`${err}`))
        }
      else {
        axios.post('/api/lists', {
          title: language,
          user: this.state.userID,
        },
          { headers: {
            authorization: localStorage.getItem('token')
          },
        })
        .then((res, result) => {
          axios.post('/api/items',  {
              username: result.login,
              realname: result.name,
              avatar: result.avatar_url,
              githubID: result.id,
              repos: result.repos_url,
              user: this.state.userId,
              list: targetList
            },
            { headers: {
                authorization: localStorage.getItem('token')
              },
            })
            .then(res => this.setState({ lists: res.data }))
            .catch(err => console.error(`err`))
        })
        .catch(err => console.error('err'))
        }
    }
  renderSearchBar = () => {
    if (!this.state.signInSuccess) {
    return(
      <GitHubSearchBar
        passLanguages={this.mapLanguagesToState}
        onSubmit={this.handleGithubSearchSubmit}
                            onSuggestionSubmit={this.handleSuggestionSubmit}
                            onDropdownItemClick={this.handleDropdownItemClick}
                            validationState={this.state.githubSearchStatus}
                          />
    )
    }
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
                            onRequestClose={this.props.onRequestClose}
                            closeTimeoutMS={3000}
                            contentLabel="Modal"
                            onAfterOpen={setTimeout(() => {
                              this.setState({
                              signInSuccess: false
                              })
                            }, 4000)
                            }
                          >
                            <Alert onClick={this.handleAlertClick} bsStyle="success">
                              <strong>Logged In Successfully!</strong>
                            </Alert>
                          </Modal>
                          { this.renderSearchBar() }
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

