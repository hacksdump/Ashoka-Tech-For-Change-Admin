import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Collapse, Button } from 'reactstrap';
import { COMPLAINT_STATUS } from 'constants/states';

function SetStatusButton(props) {
  let bootstrapClass = "";
  let message = "";
  switch (props.status) {
    case COMPLAINT_STATUS.OPEN:
      bootstrapClass = "btn btn-danger";
      message = "Open"
      break;
    case COMPLAINT_STATUS.PROGRESS:
      bootstrapClass = "btn btn-warning";
      message = "Progress"
      break;
    case COMPLAINT_STATUS.RESOLVED:
      bootstrapClass = "btn btn-light";
      message = "Resolve"
      break;
    default:
      bootstrapClass = "btn";
      message = "Button";
  }
  return (
    <Button style={{ margin: '5px' }}
      onClick={(event) => { event.stopPropagation(); props.setComplaintStatus(props.status) }}
      className={bootstrapClass}>
      {message}
    </Button>
  )
}

export default class ComplaintCard extends Component {
  state = {
    isOpen: false,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !(this.state.isOpen) });
  }

  render() {
    let statusText = ""
    let statusStyleClass = "";
    let setStatusButtons = null;
    switch (this.props.status) {
      case COMPLAINT_STATUS.OPEN:
        statusText = "Open";
        statusStyleClass = "bg-danger";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.PROGRESS} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.RESOLVED} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      case COMPLAINT_STATUS.PROGRESS:
        statusText = "In Progress";
        statusStyleClass = "bg-warning";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.OPEN} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.RESOLVED} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      case COMPLAINT_STATUS.RESOLVED:
        statusText = "Resolved";
        statusStyleClass = "bg-light";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.PROGRESS} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.OPEN} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      default:
        statusText = "Unknown";
        statusStyleClass = "";
    }
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse} className={statusStyleClass}>
          <i className="fa fa-align-justify"></i><strong>{this.props.location}</strong>
          <p className="pull-right">{statusText}</p>
        </CardHeader>
        <Collapse isOpen={this.state.isOpen}>
          <CardBody>
            <p>
              {this.props.description}
            </p>
            <div>{setStatusButtons}</div>
          </CardBody>
        </Collapse>
        <CardFooter>
          {this.props.date}
        </CardFooter>
      </Card>
    )
  }
}
