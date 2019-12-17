import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './WireframeDatabaseTester.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframers').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframers').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframeJson.wireframers.forEach(wireframeJson => {
            fireStore.collection('wireframers').add({
                    name: wireframeJson.name,
                    userID: wireframeJson.userID,
                    width: wireframeJson.width,
                    height: wireframeJson.height,
                    controls: wireframeJson.controls,
                    lastModified: wireframeJson.lastModified
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);