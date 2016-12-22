import React, { Component } from 'react';
import axios from 'axios';
import Suggestion from './Suggestion.js'
import {
  FormGroup,
  InputGroup,
  FormControl,
  HelpBlock,
  Glyphicon,
  Button
  } from 'react-bootstrap';
//TODO: fix set timeout so it doesn't trigger the name generator
export default class GitHubSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      results: [],
      validation: null,
      open: false,
      repos_url: '',
      repos: null
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target
    this.setState({
      validation: null,
      value: value
    })
    console.log(this.state.value)
  }

  handleClick = (event) => {
    event.preventDefault();
    this.state.validation === 'error' ? this.setState({ validation: '' }) : null
  }
  handleCloseSuggestion = (event) => {
    this.setState({ open: false });
  }
  handleSubmit = (event) => {
    const URL = `https://api.github.com/users/${this.state.value}`;
    event.preventDefault();
    axios.get(URL)
      .then(res => {
          this.setState({
            value: '',
            results: [res.data],
            repos_url: res.data.repos_url,
            open: true
          })
      }
      )
      .then(() => {
        let getRepos = this.state.repos_url;
        axios.get(getRepos)
        .then(res => this.setState({ repos: res.data }))
        .catch(err => console.error(err))
      })
      .catch(err => {
        this.setState({ validation: 'error' })
        this.props.onSubmit(err);
      })
  }
  handleSuggestionSelect = (event, props) => {
    event.preventDefault();
    this.props.onSuggestionSubmit(event, props)
  }
  handleCloseSuggestion = (event) => {
    this.setState({ open: false });
  }
  renderSuggestion = () => {
    return (
      <Suggestion
        open={this.state.open}
        results={this.state.results}
        onClick={this.handleCloseSuggestion}
        onSuggestionSubmit={this.props.onSuggestionSubmit}
        onSuggestionSelect={this.handleSuggestionSelect}
       />
    )
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            role="form"
            validationState={this.state.validation}
          >
            <InputGroup>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Search"
                bsSize="large"
                onChange={this.handleChange}
                onClick={this.handleClick}
              />
              <FormControl.Feedback />
              <InputGroup.Button>
                <Button
                  bsStyle={
                    this.state.validation === 'error' ? 'danger' : null}
                  type="submit"
                >
                  <Glyphicon glyph="search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <HelpBlock>{this.state.validation === 'error' ? "This is not the user you're looking for..." : null}
            </HelpBlock>
          </FormGroup>
        </form>
        { this.state.open && this.renderSuggestion() }
      </div>
    );
  }
}

