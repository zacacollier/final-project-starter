import React, { Component } from 'react';
import axios from 'axios';
import Suggestion from './Suggestion.js'

export default class GitHubSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      results: [],
      open: false
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target
    this.setState({
      value: value
    })
    console.log(this.state.value)
  }

  handleSubmit = (event) => {
    const URL = `https://api.github.com/users/${this.state.value}`;
    event.preventDefault();
    axios.get(URL)
      .then(res => {
        if (res.statusCode !== 404) {
          this.setState({
            results: [res.data],
            open: true
          })
        }
      }
      )
      .catch(err => console.log(err))
  }

  renderSuggestion() {
    return(
      <Suggestion open={this.state.open} results={this.state.results} />
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        { this.state.results && this.renderSuggestion() }
      </div>
    );
  }
}

