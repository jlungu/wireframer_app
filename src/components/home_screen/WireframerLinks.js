import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import WireframerCard from "./WireframerCard";

class WireframerLinks extends React.Component {
    filterByUser = (wfs) => {
        if (wfs === undefined)
            return;
        let usersWireframers = [];
        for (let i = 0; i < wfs.length; i++){//Filtering list of wireframers so that they correspond to the current logged in user.
            if (wfs[i].userID === this.props.userId)
                usersWireframers.push(wfs[i]);
        }

       return usersWireframers;
    }

  render() {
    const wireframers = this.filterByUser(this.props.wireframers);//So we only show the specific users wireframers.
    console.log(wireframers);
    return (
      <div className="wireframer section">
        {wireframers &&
          wireframers.map(wireframer => (
            <Link to={"/wireframer/" + wireframer.id} key={wireframer.id}>
              <WireframerCard wireframer={wireframer} />
            </Link>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    wireframers: state.firestore.ordered.wireframers,
    userId: state.firebase.auth.uid
  };
};

export default compose(connect(mapStateToProps))(WireframerLinks);
