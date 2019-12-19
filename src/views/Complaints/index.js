import React, { Component } from 'react';
import ComplaintCard from './ComplaintCard';
import { connect } from 'react-redux';
import { fetchComplaints, clearComplaints, setComplaintStatus } from 'actions';

const mapStateToProps = state => {
  return {
    complaints: state.complaints
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComplaints: () => dispatch(fetchComplaints()),
    clearComplaints: () => dispatch(clearComplaints()),
    setComplaintStatus: (complaintID, status) => dispatch(setComplaintStatus(complaintID, status)),
  }
}

class ConnectedComplaints extends Component {
  componentDidMount() {
    this.props.clearComplaints();
    this.props.fetchComplaints();
  }
  render() {
    return (
      <div>
        {this.props.complaints.map(complaintData => (
          <ComplaintCard
            key={complaintData.compID}
            {...complaintData}
            setComplaintStatus={(status) => this.props.setComplaintStatus(complaintData.compID, status)}
          />
        ))}
      </div>
    )
  }
}

const Complaints = connect(mapStateToProps, mapDispatchToProps)(ConnectedComplaints);

export default Complaints;
