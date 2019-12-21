import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { MEDIATOR, OFFICIAL } from 'constants/user-roles';

const mapStateToProps = state => {
  const data = {
    user: {
      name: state.firebase.profile.name,
    },
  }
  if (state.firebase.profile.role === MEDIATOR) {
    data.user.role = MEDIATOR;
  }
  else if (state.firebase.profile.role === OFFICIAL) {
    data.user.role = OFFICIAL;
  }
  return data
};

function ConnectedUserDetails(props) {
  const role = props.user.role[0].toUpperCase() + props.user.role.slice(1);
  const name = props.user.name;
  return (
    <div style={{ margin: '2px' }}>
      <Button color="primary">{name} ({role})</Button>
    </div>
  )
}

const UserDetails = connect(mapStateToProps)(ConnectedUserDetails);

export default UserDetails;
