import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import text_input from "../../images/input_text.png";
import container from "../../images/container.png";

import SaveWireframerModal from "../modals/SaveWireframerModal";

import {
  handleWireframerUpdate,
  handleInitialWireframerUpdate
} from "../../store/database/asynchHandler";
import {
  handleSelectUpdate,
  saveWireframer
} from "../../store/database/asynchHandler";
import { tsImportEqualsDeclaration } from "@babel/types";

class WireframerControls extends React.Component {
  state = {
    showSize: false,
    id: this.props.wireframer.id,
    zoom: 100,
    close: false
  };

  addContainer = event => {
    event.preventDefault();
    event.stopPropagation();
    let newControl = {
      key: this.props.wireframer.controls.length,
      type: "Container",
      height: 100,
      width: 100,
      borderRadius: 10,
      borderColor: "#000000",
      borderThickness: 2,
      backgroundColor: "#ffffff",
      x: 0,
      y: 0
    };

    let controls = this.props.wireframer.controls;
    controls.push(newControl);
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.props.updateSelectedControl(this.props.wireframer.controls.length - 1);
  };

  addNewLabel = event => {
    event.preventDefault();
    event.stopPropagation();
    let newControl = {
      key: this.props.wireframer.controls.length,
      type: "Label",
      borderStyle: "none",
      text: "Text",
      height: 20,
      width: 70,
      textColor: "#000000",
      textSize: 20,
      borderRadius: 0,
      borderColor: "#000000",
      borderThickness: 0,
      color: "#ffffff",
      backgroundColor: "",
      x: 0,
      y: 0
    };

    let controls = this.props.wireframer.controls;
    controls.push(newControl);
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.props.updateSelectedControl(this.props.wireframer.controls.length - 1);
  };

  addNewTextButton = event => {
    event.preventDefault();
    event.stopPropagation();
    let newControl = {
      key: this.props.wireframer.controls.length,
      type: "TextButton",
      text: "TextButton",
      height: 40,
      width: 120,
      textSize: 20,
      borderRadius: 3,
      borderColor: "#000000",
      borderThickness: 0,
      borderStyle: "none",
      textColor: "#ffffff",
      backgroundColor: "#000000",
      x: 0,
      y: 0
    };

    let controls = this.props.wireframer.controls;
    controls.push(newControl);
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.props.updateSelectedControl(this.props.wireframer.controls.length - 1);
  };

  addNewTextBox = event => {
    event.preventDefault();
    event.stopPropagation();
    let newControl = {
      key: this.props.wireframer.controls.length,
      type: "TextField",
      text: "TextField",
      height: 20,
      width: 100,
      color: "#ffffff",
      textColor: "#000000",
      textSize: 20,
      borderColor: "#DC143C",
      borderRadius: 2,
      borderThickness: 0,
      backgroundColor: "#ffffff",
      x: 0,
      y: 0
    };

    let controls = this.props.wireframer.controls;
    controls.push(newControl);
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.props.updateSelectedControl(this.props.wireframer.controls.length - 1);
  };

  handleZoomIn = () => {
    let controls = this.props.wireframer.controls;

    for (let i = 0; i < controls.length; i++) {
      controls[i].height *= 2;
      controls[i].width *= 2;
    }

    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width * 2,
      height: this.props.wireframer.height * 2,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.setState({ zoom: this.state.zoom * 2 });
  };

  handleZoomOut = () => {
    let controls = this.props.wireframer.controls;

    for (let i = 0; i < controls.length; i++) {
      controls[i].height *= 0.5;
      controls[i].width *= 0.5;
    }

    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width * 0.5,
      height: this.props.wireframer.height * 0.5,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.setState({ zoom: this.state.zoom / 2 });
  };

  handleSaveWork = () => {
    this.props.saveWireframer(this.state.id, this.props.wireframer);
  };

  madeChanges = () => {
    let initial = this.props.initial;
    let wf = this.props.wireframer;
    if (initial.controls.length != wf.controls.length) return false;
    if (initial.name != wf.name) return false;
    if (initial.width != wf.width) return false;
    if (initial.height != wf.height) return false;
    for (let i = 0; i < initial.controls.length; i++) {
      if (
        initial.controls[i].type === "Container" &&
        wf.controls[i].type === "Container"
      ) {
        if (initial.controls[i].height != wf.controls[i].height) return false;
        if (initial.controls[i].width != wf.controls[i].width) return false;
        if (initial.controls[i].key != wf.controls[i].key) return false;
        if (initial.controls[i].borderRadius != wf.controls[i].borderRadius)
          return false;
        if (initial.controls[i].borderColor != wf.controls[i].borderColor)
          return false;
        if (
          initial.controls[i].borderThickness != wf.controls[i].borderThickness
        )
          return false;
        if (
          initial.controls[i].backgroundColor != wf.controls[i].backgroundColor
        )
          return false;
        if (initial.controls[i].x != wf.controls[i].x) return false;
        if (initial.controls[i].y != wf.controls[i].y) return false;
      }
      if (initial.controls[i].type === wf.controls[i].type) {
        if (initial.controls[i].height != wf.controls[i].height) return false;
        if (initial.controls[i].width != wf.controls[i].width) return false;
        if (initial.controls[i].key != wf.controls[i].key) return false;
        if (initial.controls[i].borderRadius != wf.controls[i].borderRadius)
          return false;
        if (initial.controls[i].borderColor != wf.controls[i].borderColor)
          return false;
        if (
          initial.controls[i].borderThickness != wf.controls[i].borderThickness
        )
          return false;
        if (
          initial.controls[i].backgroundColor != wf.controls[i].backgroundColor
        )
          return false;
        if (initial.controls[i].x != wf.controls[i].x) return false;
        if (initial.controls[i].y != wf.controls[i].y) return false;
        if (initial.controls[i].text != wf.controls[i].text) return false;
        if (initial.controls[i].textColor != wf.controls[i].textColor)
          return false;
        if (initial.controls[i].textSize != wf.controls[i].textSize)
          return false;
      }
    }
    return true;
  };

  handleClose = () => {
    this.setState({ close: true });
  };

  render() {
    let zoom = this.state.zoom + "%";

    if (this.state.close) return <Redirect to="/" />;
    return (
      <div class="card red lighten-4 controls-card">
        <SaveWireframerModal id={this.state.id}/>
        <div class="card red lighten-1 center" id="preview_card_header">
          <div class="controls_title">Controls</div>
        </div>
        <div class="card-content black-text center">
          <div id="save_close_buttons">
            {this.madeChanges() ? (
              <div>
                <a
                  class="waves-effect waves-light btn-small red save_close_but"
                  disabled
                >
                  <i class="material-icons left">save</i>
                  Save
                </a>
                <a
                  class="waves-effect waves-light btn-small red save_close_but"
                  onClick={this.handleClose}
                >
                  <i class="material-icons right">close</i>Close
                </a>
              </div>
            ) : (
              <div>
                <a
                  class="waves-effect waves-light btn-small red save_close_but"
                  onClick={this.handleSaveWork}
                >
                  <i class="material-icons left">save</i>
                  Save
                </a>
                <a
                  data-target="modal2"
                  class="waves-effect waves-light btn-small red save_close_but modal-trigger"
                >
                  <i class="material-icons right">close</i>Close
                </a>
              </div>
            )}
          </div>
          <div id="zoom_control">
            <a
              class="btn-floating btn-medium waves-effect waves-light red zoom_buttons"
              disabled={true}
              onClick={this.handleZoomIn}
            >
              <i class="material-icons">zoom_in</i>
            </a>
            <span class="card-content control_labels">{zoom}</span>
            <a
              class="btn-floating btn-medium waves-effect waves-light red zoom_buttons"
              disabled={true}
              onClick={this.handleZoomOut}
            >
              <i class="material-icons">zoom_out</i>
            </a>
          </div>
          <div id="container_control">
            <span class="card-content control_labels">Container</span>
            <img
              src={container}
              alt="Container"
              id="container_image"
              onClick={this.addContainer}
            ></img>
          </div>
          <div id="text_input">
            <span class="card-content control_labels">Label</span>
            <span id="label_image" onClick={this.addNewLabel}>
              Text for Label
            </span>
          </div>
          <div id="text_input">
            <span class="card-content control_labels">Button</span>
            <a
              class="waves-effect waves-light btn-small red"
              id="button_image"
              onClick={this.addNewTextButton}
            >
              Submit
            </a>
          </div>
          <div id="text_input">
            <span class="card-content control_labels">Text Input</span>
            <img
              src={text_input}
              alt="Text Input"
              id="text_input_image"
              onClick={this.addNewTextBox}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wireframer: state.wireframer,
    selected: state.selectedControl
  };
};

const mapDispatchToProps = (dispatch, control) => ({
  updateWireframer: wireframer => dispatch(handleWireframerUpdate(wireframer)),
  updateSelectedControl: control => dispatch(handleSelectUpdate(control)),
  updateInitialWireframer: wireframer =>
    dispatch(handleInitialWireframerUpdate(wireframer)),
  saveWireframer: (id, wireframer) => dispatch(saveWireframer(id, wireframer))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  WireframerControls
);
