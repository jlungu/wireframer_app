import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import WireframerControls from "./WireframerControls";

import WireframerPreview from "./WireframerPreview";
import WireframerEdit from "./WireframerEdit";

import { handleWireframerUpdate, handleInitialWireframerUpdate } from '../../store/database/asynchHandler'

import { handleSelectUpdate } from "../../store/database/asynchHandler";
import { modifyLastViewed } from "../../store/database/asynchHandler";

class WireframerScreen extends React.Component {
  state = {
    wireframer: this.props.wireframer,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount(){
    this.props.updateLastViewed(new Date().toLocaleString(), this.props.wireframer.id);
  }

  handleDeselect = () => {
    this.props.updateSelectedControl(-1);
  }

  onKeyDown = (e) => {
    if (e.ctrlKey && e.key === "d") {
      if (this.props.selected != -1)
        this.duplicateControl(this.props.selected);
    } else if (e.keyCode === 46) {
      if (this.props.selected != -1)
        this.deleteControl(this.props.selected);
    }
  }

  deleteControl = (key) => {
    let controls = this.props.wireframer.controls;
    for (let i = 0; i < controls.length; i++){
      if (i === key){
        controls.splice(i, 1);
        controls = this.resetKeys(controls);
      }
    }
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    this.props.updateSelectedControl(-1);
    this.props.updateWireframer(wireframer);
  }

  duplicateControl = (key) => {
    let controls = this.props.wireframer.controls;
    let newControl = {};
    if (controls[key].type === "Container"){
      newControl = {
        type: "Container",
        height: controls[key].height,
        width: controls[key].width,
        key: controls.length,
        borderRadius: controls[key].borderRadius,
        borderColor: controls[key].borderColor,
        borderThickness: controls[key].borderThickness,
        backgroundColor: controls[key].backgroundColor,
        x: controls[key].x + 100,
        y: controls[key].y + 100
      }
    }
    else if (controls[key].type === "Label"){
      newControl = {
        type: "Label",
        height: controls[key].height,
        width: controls[key].width,
        text: controls[key].text,
        key: controls.length,
        borderRadius: controls[key].borderRadius,
        borderColor: controls[key].borderColor,
        borderThickness: controls[key].borderThickness,
        backgroundColor: controls[key].backgroundColor,
        color: controls[key].color,
        textSize: controls[key].textSize,
        textColor: controls[key].textColor,
        x: controls[key].x + 100,
        y: controls[key].y + 100
      }
    }
    else if (controls[key].type === "TextButton"){
      newControl = {
        type: "TextButton",
        height: controls[key].height,
        width: controls[key].width,
        text: controls[key].text,
        key: controls.length,
        borderRadius: controls[key].borderRadius,
        borderColor: controls[key].borderColor,
        borderThickness: controls[key].borderThickness,
        backgroundColor: controls[key].backgroundColor,
        color: controls[key].color,
        textSize: controls[key].textSize,
        textColor: controls[key].textColor,
        x: controls[key].x + 100,
        y: controls[key].y + 100
      }
    }
    else if (controls[key].type = "TextField"){
      newControl = {
        type: "TextField",
        height: controls[key].height,
        width: controls[key].width,
        text: controls[key].text,
        key: controls.length,
        borderRadius: controls[key].borderRadius,
        borderColor: controls[key].borderColor,
        borderThickness: controls[key].borderThickness,
        backgroundColor: controls[key].backgroundColor,
        color: controls[key].color,
        textSize: controls[key].textSize,
        textColor: controls[key].textColor,
        x: controls[key].x + 100,
        y: controls[key].y + 100
      }
    }

    controls.push(newControl);
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    this.props.updateWireframer(wireframer);
    this.props.updateSelectedControl(this.props.wireframer.controls.length - 1);
  }

  resetKeys = (controls) => {
    for (let i = 0; i < controls.length; i++){
      controls[i].key = i;
    }
    return controls;
  }

  getKey = () => {
    for (let i = 0; i < this.props.wfs.length; i++){
      if (this.props.wfs[i].id === this.props.wireframer.id)
        return i;
    }
  }

  render() {
    if (!this.props.wireframer) return <React.Fragment />;
    if (this.props.wireframer.userID != this.props.userId)
      return <Redirect to="/" />
    this.props.updateWireframer(this.props.wireframer);
    return (
      <div class="row wireframer_screen" onClick={this.handleDeselect}>
        <div class="col s8 m3">
          <WireframerControls initial={this.props.wfs[this.getKey()]}/>
        </div>
        <div class="col">
          <WireframerPreview />
        </div>
        <div class="col s8 m3">
          <WireframerEdit />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframers } = state.firestore.data;
  const wireframer = wireframers ? wireframers[id] : null;
  const wfs = state.firestore.ordered.wireframers;
  if (wireframer) wireframer.id = id;

  return {
    wireframer,
    wfs,
    auth: state.firebase.auth,
    selected: state.selectedControl,
    userId: state.firebase.auth.uid
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateWireframer: (wireframer) => dispatch(handleWireframerUpdate(wireframer)),
  updateInitialWireframer: (wireframer) => dispatch(handleInitialWireframerUpdate(wireframer)),
  updateSelectedControl: wireframer => dispatch(handleSelectUpdate(wireframer)),
  updateLastViewed: (lastModified, id) => dispatch(modifyLastViewed(lastModified, id))
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "wireframers", orderBy:["lastModified", "desc"] }])
)(WireframerScreen);
