import React, { Component } from 'react';
import { FaGenderless } from 'react-icons/lib/fa';
import axios from 'axios';
import {
  Badge,
  ListGroup,
  ListGroupItem
}      from 'react-bootstrap';
//onClick={() => this.props.onDropdownItemClick(this.props.results[0],
//               ↳ each[0])}>

export default class Lists extends Component {
  render() {
          return (
            <ListGroup>
              <ListGroupItem
                bsSize={'large'}
              >
                <FaGenderless />
              </ListGroupItem>
            </ ListGroup>
        )
  }
}
