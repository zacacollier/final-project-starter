import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';



export default class Suggestion extends Component {
  render() {
    return(
      <Row>
        <Col xs={6} xsOffset={3}>
          <ListGroup bsClass={"list-group"}>
            {
              this.props.results.map((result) => {
                return(
                  <ListGroupItem bsClass={"list-group-item"}>
                    <h1>{result.name}</h1>
                    <Thumbnail src={result.avatar_url} />
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </Col>
      </Row>
    )
  }
}
