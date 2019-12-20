import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { handleWireframerUpdate } from "../../store/database/asynchHandler";
import { handleSelectUpdate } from "../../store/database/asynchHandler";


import { GithubPicker } from "react-color";

class ContainerEditForm extends Component {
  state = {
    wireframer: this.props.wireframer,
    borderRadius: this.props.control.borderRadius,
    borderThickness: this.props.control.borderThickness,
    selected: this.props.selected,
    showBackgroundColor: false,
    showBorderColor: false,
    backgroundColor: this.props.control.backgroundColor,
    borderColor: this.props.control.borderColor,
    borderThickness: this.props.control.borderThickness
  };

  updateBorderRadius = event => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].borderRadius = event.target.value;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    this.props.updateWireframer(wireframer);
    this.setState({ borderRadius: event.target.value });
  };

  updateBorderThickness = event => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].borderThickness = event.target.value;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    this.props.updateWireframer(wireframer);
    this.setState({ borderThickness: event.target.value });
  };

  updateBackgroundColor = (color) => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].backgroundColor =
      color;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    console.log(wireframer);
    this.props.updateWireframer(wireframer);
  };

  updateBorderColor = (color) => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].borderColor =
      color;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified,
    };
    this.props.updateWireframer(wireframer);
  };


  toggleBackgroundColorSwitch = () => {
    this.setState({ showBackgroundColor: !this.state.showBackgroundColor });
    this.setState({ showBorderColor: false });
  };
  toggleBorderColorSwitch = () => {
    this.setState({ showBorderColor: !this.state.showBorderColor });
    this.setState({ showBackgroundColor: false });
  };

  handleBackgroundColorChange = color => {
    this.setState({ backgroundColor: color.hex });
    this.updateBackgroundColor(color.hex);
  };

  handleBorderColorChange = color => {
    this.setState({ borderColor: color.hex });
    this.updateBorderColor(color.hex);
  };

  render() {
    let control = this.props.wireframer.controls[this.props.selected];

    let backgroundStyle = {
      "background-color": control.backgroundColor,
      height: 35,
      "border-radius": 5,
      width: 35,
      display: "inline-block"
    };
    let borderStyle = {
      "background-color": control.borderColor,
      height: 35,
      "border-radius": 5,
      width: 35,
      display: "inline-block"
    };

    return (
      <div id="inputs">
        <div class="input-field">
          <input
            placeholder=""
            id="border_thickness"
            type="text"
            class="validate"
            value={control.borderThickness}
            onChange={this.updateBorderThickness}
          ></input>
          <label htmlFor="border_thickness" class="active">
            Border Thickness
          </label>
        </div>
        <div class="input-field">
          <input
            placeholder=""
            id="border_radius"
            type="text"
            class="validate"
            value={control.borderRadius}
            onChange={this.updateBorderRadius}
          ></input>
          <label htmlFor="border_radius" class="active">
            Border Radius
          </label>
        </div>
        <div class="">
          <div
            style={backgroundStyle}
            onClick={this.toggleBackgroundColorSwitch}
          ></div>
          <span class="color_picker_label">Background Color</span>
          {this.state.showBackgroundColor ? (
            <GithubPicker
              color={this.state.backgroundColor}
              onChangeComplete={this.handleBackgroundColorChange}
              colors={[
                "#ffffff",
                "#000000",
                "#B80000",
                "#DB3E00",
                "#FCCB00",
                "#008B02",
                "#006B76",
                "#1273DE",
                "#004DCF",
                "#5300EB",
                "#EB9694",
                "#FAD0C3",
                "#FEF3BD",
                "#C1E1C5"
              ]}
            />
          ) : null}
        </div>
        <div>
          <div style={borderStyle} onClick={this.toggleBorderColorSwitch}></div>
          <span class="color_picker_label">Border Color</span>
          {this.state.showBorderColor ? (
            <GithubPicker
              color={this.state.borderColor}
              colors={[
                "#ffffff",
                "#000000",
                "#B80000",
                "#DB3E00",
                "#FCCB00",
                "#008B02",
                "#006B76",
                "#1273DE",
                "#004DCF",
                "#5300EB",
                "#EB9694",
                "#FAD0C3",
                "#FEF3BD",
                "#C1E1C5"
              ]}
              onChangeComplete={this.handleBorderColorChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, wireframer) => ({
  updateWireframer: wireframer => dispatch(handleWireframerUpdate(wireframer)),
  updateSelectedControl: control => dispatch(handleSelectUpdate(control))
});

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    wireframers: state.firestore.ordered.wireframers,
    userId: state.firebase.auth.uid,
    selected: state.selectedControl,
    wireframer: state.wireframer
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ContainerEditForm
);
