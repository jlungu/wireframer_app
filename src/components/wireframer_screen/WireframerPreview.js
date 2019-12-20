import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Container from "./controls/Container";
import Label from "./controls/Label";
import Button from "./controls/Button";
import TextField from "./controls/TextField";

import { handleWireframerUpdate } from "../../store/database/asynchHandler";

class WireframerPreview extends Component {
  state = {
    name: this.props.wf.name
  };

  updateWfName = e => {
    if (e.target.value === "") return;
    let controls = this.props.wf.controls;
    let wireframer = {
      controls: controls,
      name: e.target.value,
      userID: this.props.wf.userID,
      width: this.props.wf.width,
      height: this.props.wf.height,
      lastModified: this.props.wf.lastModified,
    };
    this.props.updateWireframer(wireframer);
  };
  render() {
    let cardStyle = {
      width: this.props.wf.width.toString() + "px",
      height: this.props.wf.height.toString() + "px"
    };
    return (
      <div class="card grey lighten-4" style={cardStyle}>
        <div class="card grey lighten-1 center" id="preview_card_header">
          <div class="col s12 wireframer_label">
            Wireframer Name:
            <div class="input-field inline name_input">
              <input
                id="name_inline"
                type="text"
                class="validate"
                defaultValue={this.props.wf.name}
                onBlur={this.updateWfName}
              ></input>
            </div>
          </div>
        </div>
        <div class="card-content">
          {this.props.wf.controls &&
            this.props.wf.controls.map(control =>
              control.type === "Label" ? (
                <Label control={control} />
              ) : control.type === "TextButton" ? (
                <Button control={control} />
              ) : control.type === "TextField" ? (
                <TextField control={control} />
              ) : control.type === "Container" ? (
                <Container control={control} />
              ) : null
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    wireframers: state.firestore.ordered.wireframers,
    userId: state.firebase.auth.uid,
    wf: state.wireframer,
    selected: state.selectedControl
  };
};

const mapDispatchToProps = (dispatch, control) => ({
  updateWireframer: wireframer => dispatch(handleWireframerUpdate(wireframer)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(WireframerPreview);
