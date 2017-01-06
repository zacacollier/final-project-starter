import React, { Component } from 'react';
import { FaGithub, FaClose, FaGenderless } from 'react-icons/lib/fa';
import { GoRepo } from 'react-icons/lib/go';
import { Col, Row,  ListGroup, ListGroupItem, Image, Fade, Well, DropdownButton, Button, MenuItem, Badge } from 'react-bootstrap';
import BusinessName from './BusinessName.js';
import JobName from './JobName.js';

// TODO: map lists from state onto all of SplitButton's dropdown MenuItems

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    }
  }
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    this.setState({ languages: nextProps.languages }, () => this.renderLanguages(this.state.languages))
  }
  handleSuggestionClick = (event) => {
    event.preventDefault();
    this.props.onSuggestionSelect(event, this.props);
  }
  renderGenerateJob = () => {
      return(
        <div>
          <JobName /> at <BusinessName />
        </div>
      )
  }
  renderLanguageLists = () => {
    if (this.state.languages.length > 0) {
      return this.state.languages.map((each) => {
        return (
          <MenuItem onClick={() => this.props.onDropdownItemClick(this.props.results[0], each[0])}>
            <Badge >{each[0]} <FaGenderless /> {each[1]}</Badge>
          </MenuItem>
      )
    })
  }
}
renderLanguages = () => {
  if (this.state.languages.length > 0) {
    return this.state.languages.map((each) => {
      return (
        <ListGroupItem
          onClick={this.handleSuggestionClick}
          bsSize={'large'}
          type="submit"
        >
          {each[0]}
          <Badge pullRight>{each[1]}</Badge>
        </ListGroupItem>
        )
      })
    }
  }
  render() {
    return(
      <div>
        <Row>
          <Col xs={6} xsOffset={3}>
            <Fade in={!!this.props.results}>
              <ListGroup bsClass={"list-group"}>
                {
                  this.props.results.map((result) => {
                    return(
                      <form onSubmit={this.props.onSuggestionSubmit}>
                        <Row>
                            <Col xs={3}>
                              <Image circle responsive src={result.avatar_url} />
                            </Col>
                            <Col xs={8}>
                              <Well>
                                <h1>{result.name}</h1>
                                <h4>
                                { result.company ? result.company : this.renderGenerateJob()}
                                </h4>
                                <span>
                                  <FaGithub />
                                  <a href={result.html_url}>
                                    {result.login}
                                  </a>
                                </span>
                                <br />
                                <span>
                                  <a href={result.repos_url}>
                                    <GoRepo />
                                    <Badge>
                                      {result.public_repos}
                                    </Badge>
                                  </a>
                                </span>
                                <ListGroup>
                                { this.renderLanguages() }
                                </ListGroup>
                              </Well>
                              <DropdownButton
                                bsStyle={'info'}
                                title={'Add to '}
                                bsSize={'large'}
                                key={result.id}
                                id={result.id}
                                type="submit"
                                onClick={(event) => { event.preventDefault() }}
                              >
                                {this.renderLanguageLists()}
                              </DropdownButton>
                              <br />
                                <Button
                                  pullRight
                                  bsStyle={'danger'}
                                  bsSize={'xs'}
                                  onClick={this.props.onClick}
                                  style={{borderRadius: 12 + 'px'}}
                                >
                                  <FaClose />
                                </Button>
                            </Col>
                        </Row>
                      </form>
                    )
                  })
                }
              </ListGroup>
            </Fade>
          </Col>
        </Row>
      </div>
    )
  }
}
