import React, { Component } from 'react';
import { FaGithub, FaClose } from 'react-icons/lib/fa';
import { GoRepo } from 'react-icons/lib/go';
import { Col, Row,  ListGroup, Image, Fade, Well, SplitButton, Button, MenuItem, Badge } from 'react-bootstrap';
import BusinessName from './BusinessName.js';
import JobName from './JobName.js';

// TODO: map lists from state onto all of SplitButton's dropdown MenuItems

export default class Suggestion extends Component {
  render() {
    return(
      <div>
        <Row>
          <Col xs={6} xsOffset={3}>
            <ListGroup bsClass={"list-group"}>
              {
                this.props.results.map((result) => {
                  return(
                    <Fade in={!!this.props.results}>
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
                            <SplitButton
                              bsStyle={'info'}
                              title={'Add to '}
                              key={result.id}
                            >
                              <MenuItem eventKey={'1'}>...</MenuItem>
                            </SplitButton>
                            <Button bsStyle={'danger'}>
                              <FaClose />
                            </Button>
                          </Col>
                      </Row>
                    </Fade>
                  )
                })
              }
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
