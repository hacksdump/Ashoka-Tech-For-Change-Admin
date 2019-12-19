import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Collapse, Button } from 'reactstrap';

export default class ComplaintCard extends Component {
  state = {
    isOpen: false,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !(this.state.isOpen) });
  }

  render() {
    const resolutionStatus = this.props.status === 1 ? "Not Resolved" : "Resolved";
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse}>
          <i className="fa fa-align-justify"></i><strong>{this.props.location}</strong>
        </CardHeader>
        <Collapse isOpen={this.state.isOpen} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
          <CardBody>
            <p>
              {this.props.description}
            </p>
            <p>
              {this.props.description}
            </p>
          </CardBody>
        </Collapse>
        <CardFooter>
          <hr />
          <h5>Current state: {resolutionStatus}</h5>
        </CardFooter>
      </Card>
    )
  }
}
