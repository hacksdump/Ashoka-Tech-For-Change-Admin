import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Collapse, Button, Input, Badge } from 'reactstrap';
import { COMPLAINT_STATUS } from 'constants/states';
import ReactPlayer from 'react-player';

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
      bootstrapClass = "btn btn-success";
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
    officerComment: this.props.officerComment,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !(this.state.isOpen) });
  }

  handleChange = (e) => {
    this.setState({
      officerComment: e.target.value
    })
    this.props.updateComment(e.target.value)
  }

  render() {
    const likes = this.props.Like ? Object.keys(this.props.Like).length : 0;
    const tags = this.props.tags ? this.props.tags.split(' ') : [];
    let statusText = ""
    let statusStyleClass = "";
    let tagPillColor = "";
    let setStatusButtons = null;
    switch (this.props.status) {
      case COMPLAINT_STATUS.OPEN:
        statusText = "Open";
        statusStyleClass = "bg-danger";
        tagPillColor = "danger";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.PROGRESS} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.RESOLVED} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      case COMPLAINT_STATUS.PROGRESS:
        statusText = "In Progress";
        statusStyleClass = "bg-warning";
        tagPillColor = "warning";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.OPEN} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.RESOLVED} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      case COMPLAINT_STATUS.RESOLVED:
        statusText = "Resolved";
        statusStyleClass = "bg-success";
        tagPillColor = "success";
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
            <ReactPlayer controls={true} url={this.props.videoUrl} playing={this.state.isOpen} width="100%" />
            <div>
              <p style={{ padding: '10px', margin: '10px' }}>
                {this.props.description}
              </p>
            </div>
            <div>{setStatusButtons}</div>
            <div style={{ margin: '10px' }}>
              Your Comment
              <Input value={this.state.officerComment} onChange={this.handleChange} />
            </div>
          </CardBody>
        </Collapse>
        <CardFooter>
          <span>
            <span>Complaint issued by {this.props.name} at </span>
            <span>{this.props.date} </span>
            <span>{this.props.time}</span>
          </span>
          <span>
            {tags.map(tag => (
              <Badge key={tag} style={{ margin: '5px' }} pill color={tagPillColor}>{tag}</Badge>
            ))}
          </span>
          <div className="float-right">
            <span style={{ margin: "5px" }}> Likes</span>
            <Badge pill color="success">{likes}</Badge>
          </div>
        </CardFooter>
      </Card>
    )
  }
}
