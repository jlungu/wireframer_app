import React, { Component } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import { removeWireframer } from "../../store/database/asynchHandler";

import {
  saveWireframer
} from "../../store/database/asynchHandler";

class SaveWireframerModal extends Component {
  state = {
    save: false
  };
  componentDidMount() {
    M.Modal.init(this.Modal);
  }
  preventDefault = e => {
    e.preventDefault();
  };

  handleCloseWithoutSaving = () => {
    this.setState({ save: true });
  };

  handleSaveAndClose = () => {
    this.props.saveWireframer(this.props.id, this.props.wireframer)
    this.setState({ save: true });
  }
  render() {
    if (this.state.save) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div
          onClick={this.preventDefault}
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"
        >
          <div className="modal-content">
            <h4>Close Without Saving?</h4>
            <p>
              You've made changes to your wireframer that have not been saved. Would you like to exit without saving?
            </p>
          </div>
          <div className="modal-footer">
            <a className="modal-close btn red waves-effect btn-flat white-text delete_wireframer_but"
            onClick={this.handleSaveAndClose}>
              Save and Close
            </a>
            <a
              className="modal-close btn waves-effect red white-text btn-flat delete_wireframer_but"
              onClick={this.handleCloseWithoutSaving}
            >
              Close Without Saving
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    wireframer: state.wireframer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteWireframer: id => dispatch(removeWireframer(id)),
  saveWireframer: (id, wireframer) => dispatch(saveWireframer(id, wireframer))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(SaveWireframerModal
  );
