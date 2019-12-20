import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { handleWireframerUpdate } from "../../store/database/asynchHandler";
import { handleSelectUpdate } from "../../store/database/asynchHandler";

import { GithubPicker } from "react-color";

class WireframerEditForm extends Component {
  state = {
    wireframer: this.props.wireframer,
    text: this.props.control.text,
    textSize: this.props.control.textSize,
    textColor: this.props.control.textColor,
    borderRadius: this.props.control.borderRadius,
    borderThickness: this.props.control.borderThickness,
    selected: this.props.selected,
    showBackgroundColor: false,
    showBorderColor: false,
    showTextColor: false,
    backgroundColor: this.props.control.backgroundColor,
    borderColor: this.props.control.borderColor,
    borderThickness: this.props.control.borderThickness
  };

  updateLabel = event => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].text = event.target.value;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.setState({ text: event.target.value });
  };

  updateTextSize = event => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].textSize = event.target.value;
    let wireframer = {
      controls: controls,
      name: this.props.wireframer.name,
      userID: this.props.wireframer.userID,
      width: this.props.wireframer.width,
      height: this.props.wireframer.height,
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.setState({ textSize: event.target.value });
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
      lastModified: this.props.wireframer.lastModified
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
      lastModified: this.props.wireframer.lastModified
    };
    this.props.updateWireframer(wireframer);
    this.setState({ borderThickness: event.target.value });
  };

  updateBackgroundColor = color => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].backgroundColor = color;
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

  updateBorderColor = color => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].borderColor = color;
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

  updateTextColor = color => {
    let controls = this.props.wireframer.controls;
    controls[this.props.selected].textColor = color;
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

  toggleBackgroundColorSwitch = () => {
    this.setState({ showBackgroundColor: !this.state.showBackgroundColor });
    this.setState({ showBorderColor: false });
    this.setState({ showTextColor: false });
  };
  toggleBorderColorSwitch = () => {
    this.setState({ showBorderColor: !this.state.showBorderColor });
    this.setState({ showBackgroundColor: false });
    this.setState({ showTextColor: false });
  };
  toggleTextColorSwitch = () => {
    this.setState({ showTextColor: !this.state.showTextColor });
    this.setState({ showBorderColor: false });
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

  handleTextColorChange = color => {
    this.setState({ textColor: color.hex });
    this.updateTextColor(color.hex);
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
    let textStyle = {
      "background-color": control.textColor,
      height: 35,
      "border-radius": 5,
      width: 35,
      display: "inline-block"
    };

    return (
      <div id="inputs">
        <div class="input-field">
          <input
            id="label_12121"
            type="text"
            value={control.text}
            onChange={this.updateLabel}
          ></input>
          <label htmlFor="label" class="active">
            Label
          </label>
        </div>
        <div class="input-field active">
          <input
            placeholder=""
            id="font_size"
            type="text"
            value={control.textSize}
            onChange={this.updateTextSize}
          ></input>
          <label htmlFor="font_size" class="active">
            Font Size
          </label>
        </div>
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
        <div class="color_picker">
          <div
            style={backgroundStyle}
            onClick={this.toggleBackgroundColorSwitch}
          >
            <span class="color_picker_label">Background</span>
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
        </div>
        <div class="color_picker">
          <div style={borderStyle} onClick={this.toggleBorderColorSwitch}>
            <span class="color_picker_label">Border</span>
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
        <div class="color_picker">
          <div style={textStyle} onClick={this.toggleTextColorSwitch}>
            <span class="color_picker_label">Text</span>
            {this.state.showTextColor ? (
              <GithubPicker
                color={this.state.textColor}
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
                onChangeComplete={this.handleTextColorChange}
              />
            ) : null}
          </div>
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
  WireframerEditForm
);
