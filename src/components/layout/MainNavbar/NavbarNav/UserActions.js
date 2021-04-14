import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import firebase from 'firebase';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userPhoto: "",
      visible: false
    };
    this.onSignOut = this.onSignOut.bind(this);
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({
          userName: user.displayName,
          userPhoto: user.photoURL
        })
      }
      else {
        window.location.href = '/login';
      }
    })
  }

  onSignOut(e) {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href = "/login"
    }).catch((error) => {
      console.log(`Fail to signout! Error: ${error}`);
    });
    
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={this.state.userPhoto}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{(this.state.userName == "") ? "Admin" : this.state.userName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/" onClick={this.onSignOut} className="text-danger">
            <i className="material-icons text-danger" onClick={this.onSignOut}>&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
