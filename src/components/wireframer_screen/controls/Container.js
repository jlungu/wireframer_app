import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Label from "./Label";
import Button from "./Button";
import TextField from "./TextField";

import { handleSelectUpdate } from "../../../store/database/asynchHandler";
import { handleWireframerUpdate } from "../../../store/database/asynchHandler";
import { Rnd } from "react-rnd";

class Container extends Component {
  state = {
    key: this.props.control.key,
    height: this.props.control.height,
    color: this.props.control.color,
    borderRadius: this.props.control.borderRadius,
    borderColor: this.props.control.borderColor,
    borderThickness: this.props.control.borderThickness,
    controls: this.props.control.controls,
    startX: 0,
    startY: 0
  };

  handleSelect = event => {
    event.preventDefault();
    event.stopPropagation();
    const identifier = this.props.control.key;
    this.props.updateSelectedControl(identifier);
  };

  updatePosition = d => {
    if (this.state.startY === d.y && this.state.startX === d.x) return;
    let controls = this.props.wireframer.controls;
    controls[this.state.key].x += d.clientX - this.state.startX;
    controls[this.state.key].y += d.clientY - this.state.startY;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
  };

  updateSize = (e, direction, ref, delta, position) => {
    let controls = this.props.wireframer.controls;
    console.log(ref.offsetWidth + " " + ref.offsetHeight);
    controls[this.state.key].width = ref.offsetWidth;
    controls[this.state.key].height = ref.offsetHeight;
    controls[this.state.key].x = position.x;
    controls[this.state.key].y = position.y;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
  };

  trackChange = event => {
    this.setState({ startX: event.clientX });
    this.setState({ startY: event.clientY });
  };

  render() {
    let divStyle = {
      position: "absolute",
      height: this.props.wireframer.controls[this.state.key].height,
      width: this.props.wireframer.controls[this.state.key].width,
      "background-color": this.props.wireframer.controls[this.state.key]
        .backgroundColor,
      "border-radius":
        this.props.wireframer.controls[this.state.key].borderRadius.toString() +
        "px",
      "border-color": this.props.wireframer.controls[this.state.key]
        .borderColor,
      "border-width":
        this.props.wireframer.controls[this.state.key].borderThickness.toString() +
        "px",
      "border-style": "solid",
      "z-index": 20
    };
    console.log(this.props.wireframer.controls[this.state.key].borderThickness);
    if (this.props.selected === this.props.control.key) {
      return (
        <Rnd
          size={{
            width: this.props.wireframer.controls[this.state.key].width,
            height: this.props.wireframer.controls[this.state.key].height
          }}
          position={{
            x: this.props.wireframer.controls[this.state.key].x,
            y: this.props.wireframer.controls[this.state.key].y
          }}
          onDragStop={this.updatePosition}
          onResize={this.updateSize}
        >
          <div
            onMouseDown={this.trackChange}
            className="containerDiv"
            style={divStyle}
            onClick={this.handleSelect}
          >
            <div id="selected_1"></div>
            <div id="selected_2"></div>
            <div id="selected_3"></div>
            <div id="selected_4"></div>
            <div id="selected_5"></div>
            <div id="selected_6"></div>
          </div>
        </Rnd>
      );
    } else {
      return (
        <Rnd
          disableDragging={true}
          size={{
            width: this.props.wireframer.controls[this.state.key].width,
            height: this.props.wireframer.controls[this.state.key].height
          }}
          position={{
            x: this.props.wireframer.controls[this.state.key].x,
            y: this.props.wireframer.controls[this.state.key].y
          }}
        >
          <div
            className="containerDiv"
            style={divStyle}
            onClick={this.handleSelect}
          ></div>
        </Rnd>
      );
    }
  }
}

const mapDispatchToProps = (dispatch, control) => ({
  updateSelectedControl: control => dispatch(handleSelectUpdate(control)),
  updateWireframer: wireframer => dispatch(handleWireframerUpdate(wireframer))
});

const mapStateToProps = state => {
  return {
    wireframer: state.wireframer,
    selected: state.selectedControl
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Container);
