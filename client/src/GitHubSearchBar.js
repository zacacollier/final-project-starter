import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Suggestion from './Suggestion.js'
import {
  FormGroup,
  InputGroup,
  FormControl,
  HelpBlock,
  Glyphicon,
  Badge,
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
      languages: null
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
        .then(res => this.handleFilterLanguageData(res.data))
        .catch(err => console.error(err))
      })
      .catch(err => {
        this.setState({ validation: 'error' })
        this.props.onSubmit(err);
      })
  }
  // filters messy incoming data from GitHub
  handleFilterLanguageData = (repos) => {
    const languages = repos.reduce((acc, prev) => {
      return acc.concat(prev.language).sort()
    }, []);
    let count = languages.map((lang) => {
      return _.countBy(languages, lang)
    })
    let sort = count.map((each) => {
      return Object.entries(each).filter((each) => !each.includes("undefined"))
    })
    let filter = _.flatten(sort.filter((each) => each.length > 1 )).filter((each) => !each.includes("null"))
    let filterDuplicatesRemoved = _.uniqWith(filter, _.isEqual)
    this.setState({
      languages: filterDuplicatesRemoved
    }, () => {
      this.props.passLanguages(this.state.languages)
    })
  }
  handleSuggestionSelect = (event, props) => {
    event.preventDefault();
    this.props.onSuggestionSubmit(event, props)
  }
  handleCloseSuggestion = (event) => {
    this.setState({ open: false });
  }
  renderLanguages = () => {
    return this.state.languages.map((each) => {
      (
        <div>
          <Badge>{each}</Badge>
        </div>
      )
    })
  }
  renderSuggestion = () => {
    return (
      <div>
        <Suggestion
        languages={this.state.languages}
        passLanguages={this.props.passLanguages}
        open={this.state.open}
        results={this.state.results}
        onClick={this.handleCloseSuggestion}
        onDropdownItemClick={this.props.onDropdownItemClick}
        onSuggestionSubmit={this.props.onSuggestionSubmit}
        onSuggestionSelect={this.handleSuggestionSelect}
       >
       </Suggestion>
      </div>
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
        { this.state.languages && this.renderSuggestion() }
      </div>
    );
  }
}

