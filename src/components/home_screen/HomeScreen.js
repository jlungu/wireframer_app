import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink, Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import WireframerLinks from "./WireframerLinks";

import { handleSelectUpdate } from "../../store/database/asynchHandler";
import { createNewWireframer } from "../../store/database/asynchHandler";
import DeleteWireframerModal from "../modals/DeleteWireframerModal";

class HomeScreen extends Component {
    state= {
        newWireframer: false,
        id: null,
    }
  componentDidMount = () => {
    this.props.updateSelectedControl(-1);
  };

  handleNewWireframer = e => {
    e.preventDefault();

    let wireframer = {
      name: "My Wireframer",
      userID: this.props.userId,
      width: 550,
      height: 600,
      lastModified: new Date().toLocaleString(),
      controls: [],
    }

    const db = this.props.firebase.firestore();
    const ref = db.collection('wireframers').doc();
    let id = ref.id;
    this.props.newWireframer(wireframer, id);
    this.setState({id: id})
    this.setState({newWireframer: true});
  };

  render() {
    const divName = "</ Wireframer App />";
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }

    if (this.state.newWireframer){
        return <Redirect to={'/wireframer/' + this.state.id} key={this.state.key}/>;
      }

    return (
      <div className="dashboard container">
        <div class="home_title">{divName}</div>
        <div id="version">Version: 1.0.0</div>
        <div className="row">
          <div className="col s12 m12">
            <WireframerLinks />
          </div>
          <div id="create_wireframer_but" className="col s12 centered">
            <a class="waves-effect waves-light btn-large blue" onClick={this.handleNewWireframer}>
              <i class="material-icons left">add</i>
              <i class="material-icons right">build</i>Create New Wireframer
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
    id: state.newId,
    userId: state.firebase.auth.uid
  };
};

const mapDispatchToProps = (dispatch, control, wireframer, id) => ({
  updateSelectedControl: control => dispatch(handleSelectUpdate(control)),
  newWireframer: (wireframer, id, firebase) => dispatch(createNewWireframer(wireframer, id, firebase))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "wireframers", orderBy:["lastModified", "desc"] }])
)(HomeScreen);
