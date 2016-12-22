import React, { Component } from 'react';
import axios from 'axios';
import Suggestion from './Suggestion.js'
import {
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
  Button
  } from 'react-bootstrap';

export default class GitHubSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      results: [],
      validation: '',
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

  renderSuggestion = () => {
    return (
      <Suggestion open={this.state.open} results={this.state.results} />
    )
  }
  renderGlyph = () => {
    return (
      <Glyphicon glyph="search" />
    )
  }

  render() {
    return (
      <div>
        <FormGroup onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Search"
              bsSize="large"
              onChange={this.handleChange}
              validationState={this.state.validation}
            />
            <InputGroup.Button>
              <Button type="submit">
                <Glyphicon glyph="search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        { this.state.results && this.renderSuggestion() }
      </div>
    );
  }
}

