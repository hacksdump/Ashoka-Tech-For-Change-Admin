import React, { Component } from 'react';
import ComplaintCard from './ComplaintCard';
import { connect } from 'react-redux';
import { fetchComplaints, clearComplaints } from 'actions';

const mapStateToProps = state => {
  return {
    complaints: state.complaints
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComplaints: () => dispatch(fetchComplaints()),
    clearComplaints: () => dispatch(clearComplaints())
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
          <ComplaintCard key={complaintData.compID} {...complaintData} />
        ))}
      </div>
    )
  }
}

const Complaints = connect(mapStateToProps, mapDispatchToProps)(ConnectedComplaints);

export default Complaints;
