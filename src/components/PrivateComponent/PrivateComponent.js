import React from 'react';
import firebase from 'firebase';
import Login from '../../views/Login'

//This function receives the Component that only some user should access
function RequireAdmin(ComposedComponent) {

    class Authenticated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isLogin: false
            }
        }

        componentWillMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (user != null) {
                    this.setState({ isLogin: true }, () => {this.routing()});
                } else {
                    this.setState({ isLogin: false }, () => {this.routing()});
                };
            });
        }

        routing() {
            if (!this.state.isLogin && ComposedComponent != Login) {
                window.location.href = '/login';
            }
        }

        render() {
            
            return <ComposedComponent />;
        }
    }

    //Return the new Component that requires authorization
    return Authenticated;
}

export default RequireAdmin