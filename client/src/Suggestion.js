import React, { Component } from 'react';
import { FaGithub, FaClose } from 'react-icons/lib/fa';
import { GoRepo } from 'react-icons/lib/go';
import { Col, Row,  ListGroup, Image, Fade, Well, DropdownButton, Button, MenuItem, Badge } from 'react-bootstrap';
import BusinessName from './BusinessName.js';
import JobName from './JobName.js';

// TODO: map lists from state onto all of SplitButton's dropdown MenuItems

export default class Suggestion extends Component {
  handleSuggestionClick = (event) => {
    event.preventDefault();
    this.props.onSuggestionSelect(event, this.props)
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
                                <h4><JobName /> at <BusinessName /></h4>
                                <span>
                                  <FaGithub />
                                  <a href={result.url}>
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
                              </Well>
                              <DropdownButton
                                bsStyle={'info'}
                                title={'Add to '}
                                bsSize={'large'}
                                key={result.id}
                                id={result.id}
                                type="submit"
                                onClick={this.handleSuggestionClick}
                              >
                                <MenuItem
                                  onClick={this.handleSuggestionClick}
                                  id={result.id}
                                  bsSize={'large'}
                                  eventKey={this.props.results[result]}
                                  type="submit"
                                >...
                                </MenuItem>
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
