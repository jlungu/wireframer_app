import React, { Component } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import { removeWireframer } from "../../store/database/asynchHandler";

class DeleteWireframerModal extends Component {
  state = {
    deletedWf: false
  };
  componentDidMount() {
    M.Modal.init(this.Modal);
  }
  preventDefault = e => {
    e.preventDefault();
  };

  handleDelete = () => {
    this.setState({ deletedWf: true });
    this.props.deleteWireframer(this.props.id);
  };
  render() {
    if (this.state.deletedWf) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div
          onClick={this.preventDefault}
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4>Delete Wireframer</h4>
            <p>
              Are you sure you want to delete this Wireframer? This action
              cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <a className="modal-close btn blue waves-effect btn-flat white-text delete_wireframer_but">
              No I Dont!
            </a>
            <a
              className="modal-close btn waves-effect btn blue white-text btn-flat delete_wireframer_but"
              onClick={this.handleDelete}
            >
              Yes, Delete It!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteWireframer: id => dispatch(removeWireframer(id)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(DeleteWireframerModal);
