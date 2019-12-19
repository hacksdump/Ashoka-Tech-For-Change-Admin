import React from 'react';
import ComplaintCard from './ComplaintCard';
import { connect, useSelector } from 'react-redux';
import { setComplaintStatus } from 'actions';
import { useFirebaseConnect } from 'react-redux-firebase';
import { MEDIATOR, OFFICIAL } from 'constants/user-roles';

const mapStateToProps = state => {
  const data = {
    user: {
      name: state.firebase.profile.name
    }
  }
  if (state.firebase.profile.role === MEDIATOR) {
    data.user.role = MEDIATOR;
  }
  else if (state.firebase.profile.role === OFFICIAL) {
    data.user.role = OFFICIAL;
  }
  return data
};

const mapDispatchToProps = dispatch => {
  return {
    setComplaintStatus: (complaintID, status) => dispatch(setComplaintStatus(complaintID, status)),
  }
}

function ConnectedComplaints(props) {
  useFirebaseConnect([
    {
      path: 'complaints',
      queryParams: ['orderByChild=officerName', `equalTo=${props.user.name}`]
    },
  ]);
  const complaints = useSelector(state => state.firebase.ordered.complaints);
  return (
    <div>
      {complaints ? complaints.map(data => {
        const complaintData = data.value;
        return (
          <ComplaintCard
            key={complaintData.compID}
            {...complaintData}
            setComplaintStatus={(status) => props.setComplaintStatus(complaintData.compID, status)}
          />
        )
      })
        : <div>No complaints</div>}
    </div>
  )
}


const Complaints = connect(mapStateToProps, mapDispatchToProps)(ConnectedComplaints);

export default Complaints;
