import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { loginHandler } from '../../store/database/asynchHandler'

class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    // As we use react-redux-firebas-v3 we need to pass firebase object to
    // authActions to be authorized by using firebse.auth method
    const { props, state } = this;
    const { firebase } = props;
    const credentials = { ...state };
    const authData = {
      firebase,
      credentials
    };

    props.login(authData);
  };

  handleRegister = () => {
    this.props.history.push("/register")
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s5 white">
            <div class="row">
              <div class="card blue lighten-5 login_div">
                <div class="card blue white-text center">
                  <span class="card-title">Wireframer App</span>
                </div>
                <div class="card-content black-text center">
                  <span class="card-title">Login</span>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input
                      className="active"
                      type="email"
                      name="email"
                      id="email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                      className="active"
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <button
                      type="submit"
                      className="btn blue lighten-1 z-depth-0"
                    >
                      Login
                    </button>
                    <button
                      type="submit"
                      className="btn blue lighten-1 z-depth-0 register_but"
                      onClick={this.handleRegister}
                    >
                      Register
                    </button>
                    {authError ? (
                      <div className="red-text center">
                        <p>{authError}</p>
                      </div>
                    ) : null}
                  </div>
                </div> 
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(loginHandler(authData)),
});

// We need firebaseConnect function to provide to this component
// firebase object with auth method.
// You can find more information on the link below
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginScreen);