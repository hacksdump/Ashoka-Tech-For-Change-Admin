import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Collapse,
  Button,
  Input,
  Badge,
  Form,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { COMPLAINT_STATUS } from 'constants/states';
import ReactPlayer from 'react-player';
import { OFFICIAL, MEDIATOR } from 'constants/user-roles';

function SetStatusButton(props) {
  let bootstrapClass = "";
  let message = "";
  switch (props.status) {
    case COMPLAINT_STATUS.OPEN:
      bootstrapClass = "btn btn-danger";
      message = "Pending"
      break;
    case COMPLAINT_STATUS.PROGRESS:
      bootstrapClass = "btn btn-warning";
      message = "In Process"
      break;
    case COMPLAINT_STATUS.RESOLVED:
      bootstrapClass = "btn btn-success";
      message = "Resolved"
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
    selectedDepartment: null,
    departmentDropdownIsOpen: false,
    officialDropdownIsOpen: false,
    officials: [],
  }

  toggleDropdown = (type) => {
    if (type === 'department') {
      this.setState({ departmentDropdownIsOpen: !this.state.departmentDropdownIsOpen })
    }
    else if (type === 'official') {
      this.setState({ officialDropdownIsOpen: !this.state.officialDropdownIsOpen })

    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !(this.state.isOpen) });
  }

  handleSelectDepartment = (index) => {
    const officials = Object.keys(this.props.departments[index].value).map(key => ({ uid: key, name: this.props.departments[index].value[key], department: this.props.departments[index].key }))
    this.setState({ departmentDropdownIsOpen: false, selectedDepartment: this.props.departments[index].key, officials: officials })
  }

  handleSelectOfficial = (index) => {
    const officialID = this.state.officials[index].uid;
    const officialName = this.state.officials[index].name;
    const department = this.state.officials[index].department;
    this.props.assignComplaint(officialID, officialName, department)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.assignComplaint(this.state.officialName, this.state.department);
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
        statusText = "Pending";
        statusStyleClass = "bg-danger";
        tagPillColor = "danger";
        setStatusButtons =
          <div>
            <SetStatusButton status={COMPLAINT_STATUS.PROGRESS} setComplaintStatus={this.props.setComplaintStatus} />
            <SetStatusButton status={COMPLAINT_STATUS.RESOLVED} setComplaintStatus={this.props.setComplaintStatus} />
          </div>
        break;
      case COMPLAINT_STATUS.PROGRESS:
        statusText = "In Process";
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
    const departments = this.props.departments ? this.props.departments.map(department => department.key) : [];
    const officials = this.state.officials;
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
            {
              (this.props.role === OFFICIAL) ?
                (
                  <div>
                    <div>{setStatusButtons}</div>
                    <div style={{ margin: '10px' }}>
                      Your Comment
              <Input value={this.state.officerComment} onChange={this.handleChange} />
                    </div>
                  </div>
                )
                : (this.props.role === MEDIATOR) ?
                  (
                    <div>
                      <Form onSubmit={this.handleSubmit}>
                        <Dropdown isOpen={this.state.departmentDropdownIsOpen} toggle={() => this.toggleDropdown('department')}>
                          <DropdownToggle caret>
                            {this.state.selectedDepartment ? this.state.selectedDepartment : "Select Department"}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>Department</DropdownItem>
                            {departments.map((department, index) => (
                              <DropdownItem key={index} onClick={() => this.handleSelectDepartment(index)}>{department} </DropdownItem>
                            )
                            )}
                          </DropdownMenu>
                        </Dropdown>

                        {
                          this.state.selectedDepartment ?
                            <Dropdown isOpen={this.state.officialDropdownIsOpen} toggle={() => this.toggleDropdown('official')}>
                              <DropdownToggle caret>
                                {this.state.selectedOfficial ? this.state.selectedOfficial : "Select Ofiicial"}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem header>Official</DropdownItem>
                                {officials.map((official, index) => (
                                  <DropdownItem key={index} onClick={() => this.handleSelectOfficial(index)}>{official.name}</DropdownItem>
                                )
                                )}
                              </DropdownMenu>
                            </Dropdown>
                            : null
                        }
                      </Form>
                    </div>
                  ) :
                  <></>
            }
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
      </Card >
    )
  }
}
