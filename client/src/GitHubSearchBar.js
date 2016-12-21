import React, { Component, PropTypes } from 'react';
import axios from 'axios';

export default class GitHubSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      suggestions: []
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
      .then(res => this.setState({ suggestions: [res.data] }))
      .catch(err => console.log(err))
  }

  render () {
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
      </div>
    );
  }
}
