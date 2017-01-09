import React, { Component } from 'react';
import {
  FaGenderless,
  FaGithub } from 'react-icons/lib/fa';
import {
  Badge,
  Col,
  Label,
  ListGroup,
  ListGroupItem,
  PageHeader,
  Row
}      from 'react-bootstrap';
//onClick={() => this.props.onDropdownItemClick(this.props.results[0],
//               ↳ each[0])}>

export default class Lists extends Component {
  renderLists = (props) => {
    if (!this.props.lists.length) {
      return (
        <Col xs={12}>
          <PageHeader>
            <small>
              Search and add <FaGithub size={30}/> users to begin creating lists!
            </small>
          </PageHeader>
        </Col>
      )
    }
    else {
      return (
        this.props.lists.map((each) => {
          return (
          <Col xs={4}>
            <ListGroup bsClass={"list-group"}>
              <ListGroupItem
                bsSize={'large'}
              >
              <h2>
                <Label bsStyle={"info"}>
                  { each.title }
                </Label>
              <Badge>
                { each.items.length }
              </Badge>
              </h2>
              </ListGroupItem>
            </ ListGroup>
          </Col>
          )
        })
      )
    }
    }
  render() {
    return (
      <Row>
        { this.renderLists() }
      </Row>
    )
  }
}
