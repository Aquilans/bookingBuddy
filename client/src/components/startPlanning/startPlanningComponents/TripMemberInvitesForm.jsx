import React, { Component } from 'react';
import {tripData} from '../../tripRoom/data/tripRoomDynamicData';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const InvitedMember = ({name, email}) => (
  <tr>
    <td>{name}</td>
    <td>{email}</td>
  </tr>
);

const InvitedMemberList = ({invitedMembers}) => {

  var invitedMembers = invitedMembers.map( (memberObj, index) => {
    return (
      <InvitedMember name={memberObj.name} email={memberObj.email} key={index}/>
    );
  });

  return (
    <table className="highlight responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {invitedMembers}
      </tbody>
    </table>
  );
};

class TripMemberInvitesForm extends Component {

  constructor(props) {
    super(props);
    this.changeBuddyName = this.changeBuddyName.bind(this);
    this.changeBuddyEmail = this.changeBuddyEmail.bind(this);
    this.addBuddy = this.addBuddy.bind(this);
    this.state = {
      buddyName: '',
      buddyEmail: '',
      invitedMembers: []
    };
  }

  addTripName() {
    tripData.tripNameArray.push(tripData.tripName);
  }

  render() {

    return (
    <div>
      <div className="row">
        <form className="col s12" onSubmit={this.addBuddy }>
          <div className="row">
            <h3>Invite Your Buddies:</h3>
            <InvitedMemberList invitedMembers={this.state.invitedMembers}/>
            <div className="col s6">
              <input placeholder="name" onChange={this.changeBuddyName} value={this.state.buddyName} /> <br />
            </div>
            <div className="col s6">
              <input type="email" placeholder="email" onChange={this.changeBuddyEmail} value={this.state.buddyEmail} /> <br />
            </div>
          </div>
          <button className="orange btn" >Invite Friend(s)</button>
        </form>
      </div>
      <div>
       <Link className="orange btn" onClick={this.addTripName()} to="/start-planning/trip-preferences"> Continue </Link>
      </div>
    </div>
    );
  }


  changeBuddyName (e) {
    this.setState({
      buddyName: e.target.value
    });
  }

  changeBuddyEmail (e) {
    this.setState({
      buddyEmail: e.target.value
    });
  }

  addBuddy (e) {
    e.preventDefault();
    var buddy = {
      name: this.state.buddyName,
      email: this.state.buddyEmail
    };
    tripData.buddyData.push(buddy);
    console.log(tripData);
    this.setState((prevState) => ({
      invitedMembers: prevState.invitedMembers.concat(buddy),
      buddyName: '',
      buddyEmail: ''
    }));
  }
}



export default TripMemberInvitesForm;