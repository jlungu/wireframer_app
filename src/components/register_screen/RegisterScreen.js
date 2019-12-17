import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { registerHandler } from "../../store/database/asynchHandler";

class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
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

    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    props.register(newUser, firebase);
  };

  handleReturnToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div class="row">
          <div class="card blue lighten-5 register_box">
            <div class="card blue white-text center register_wireframer">
              <span class="card-title">Wireframer App</span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div class="card-content black-text center">
                <h5 className="grey-text text-darken-3">Register</h5>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <button
                    type="submit"
                    className="btn blue lighten-1 z-depth-0 register_sign_but"
                  >
                    Sign Up
                  </button>
                  {authError ? (
                    <div className="red-text center">
                      <p>{authError}</p>
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="btn blue lighten-1 z-depth-0 register_login_but"
                    onClick={this.handleReturnToLogin}
                  >
                    Login
                  </button>
                  {authError ? (
                    <div className="red-text center">
                      <p>{authError}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase))
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterScreen);
