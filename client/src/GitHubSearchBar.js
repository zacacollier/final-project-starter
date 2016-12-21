import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Suggestion from './Suggestion.js'

export default class GitHubSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      results: []
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
            results: [res.data]
          })
        }
      }
      )
      .catch(err => console.log(err))
  }

  renderSuggestion() {
    return(
      <Suggestion results={this.state.results} />
    )
  }

  render() {
    const inputProps = {
      placeholder: 'Search for a Github username...',
      value: this.state.value,
      onChange: this.onChange
    };
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
