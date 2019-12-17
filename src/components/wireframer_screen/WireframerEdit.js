import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import WireframerEditForm from "./WireframerEditForm";
import ContainerEditForm from "./ContainerEditForm";

import { handleWireframerUpdate } from "../../store/database/asynchHandler";
import { conditionalExpression } from "@babel/types";

class WireframerEdit extends Component {
  state = {
    selected: null,
    text: "",
    textSize: "",
    height: this.props.wireframer.height,
    width: this.props.wireframer.width,
    allowSave: false
  };

  findProperControl = () => {
    return this.props.wireframer.controls[this.props.selected];
  };

  updateLabel = event => {
    this.setState({ text: event.target.value });
  };

  updateTextSize = event => {
    this.setState({ textSize: event.target.value });
  };

  preventDeselect = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleWidthChange = e => {
    this.setState({ width: e.target.value });
    if (this.props.wireframer.width != e.target.value) {
      this.setState({ allowSave: true });
    } else {
      this.setState({ allowSave: false });
    }
  };

  handleHeightChange = e => {
    this.setState({ height: e.target.value });
    if (this.props.wireframer.height != e.target.value) {
      this.setState({ allowSave: true });
    } else {
      this.setState({ allowSave: false });
    }
  };

  handleDimensionChange = () => {
    if (
      this.state.height > 5000 ||
      this.state.height < 1 ||
      this.state.width < 1 ||
      this.state.width > 5000
    )
      return;

    let wireframer = {
      controls: this.props.wireframer.controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.state.width,
      height: this.state.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.setState({ allowSave: false });
    this.props.updateWireframer(wireframer);
  };

  render() {
    console.log(this.props.selected);
    let control = {};
    if (this.props.selected === -1)
      return (
        <div
          class="card green lighten-4 edit_card"
          onClick={this.preventDeselect}
        >
          <div class="card green lighten-1 center" id="preview_card_header">
            <div class="controls_title">Edit</div>
          </div>
          <div class="card-content black-text">
            <span id="modify_dimensions_label">MODIFY DIMENSIONS</span>
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="width"
                  type="text"
                  class="validate"
                  value={this.state.width}
                  onChange={this.handleWidthChange}
                ></input>
                <label for="width" class="active">
                  Width
                </label>
              </div>
              <div class="input-field col s6">
                <input
                  id="height"
                  type="text"
                  class="validate"
                  value={this.state.height}
                  onChange={this.handleHeightChange}
                ></input>
                <label for="height" class="active">
                  Height
                </label>
              </div>
              <div id="save_cancel_dimension_changes">
                {this.state.allowSave ? (
                  <a
                    class="waves-effect waves-light btn-small green save_close_but"
                    onClick={this.handleDimensionChange}
                  >
                    <i class="material-icons left">save</i>Save
                  </a>
                ) : (
                  <a
                    class="waves-effect waves-light btn-small green save_close_but"
                    disabled
                  >
                    <i class="material-icons left">save</i>
                    Save
                  </a>
                )}
                <a class="waves-effect waves-light btn-small green save_close_but">
                  <i class="material-icons right">close</i>Close
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    else if (
      this.props.wireframer.controls[this.props.selected].type === "Container"
    ) {
      control = this.findProperControl();
      return (
        <div
          class="card green lighten-4 edit_card"
          onClick={this.preventDeselect}
        >
          <div class="card green lighten-1 center" id="preview_card_header">
            <div class="controls_title">Edit</div>
          </div>
          <div class="card-content black-text">
            <ContainerEditForm control={control} />
          </div>
        </div>
      );
    } else {
      control = this.findProperControl();
      return (
        <div
          class="card green lighten-4 edit_card"
          onClick={this.preventDeselect}
        >
          <div class="card green lighten-1 center" id="preview_card_header">
            <div class="controls_title">Edit</div>
          </div>
          <div class="card-content black-text">
            <WireframerEditForm control={control} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    wireframers: state.firestore.ordered.wireframers,
    userId: state.firebase.auth.uid,
    selected: state.selectedControl,
    wireframer: state.wireframer
  };
};
const mapDispatchToProps = (dispatch, wireframer) => ({
  updateWireframer: wireframer => dispatch(handleWireframerUpdate(wireframer))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  WireframerEdit
);
