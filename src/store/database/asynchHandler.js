import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const handleWireframerUpdate = (wireframer) => (dispatch, getState, { getFirestore }) => {
  dispatch(actionCreators.updateWireframer(wireframer));
};
export const handleInitialWireframerUpdate = (wireframer) => (dispatch, getState, { getFirestore }) => {
  dispatch(actionCreators.updateInitialWireframer(wireframer));
};

export const handleSelectUpdate = (control) => (dispatch, getState, { getFirestore}) => {
  dispatch(actionCreators.updateSelectedControl(control));
};

export const createNewWireframer = (wireframer, id, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection('wireframers').doc(id).set({
    name: wireframer.name,
    userID: wireframer.userID,
    width: wireframer.width,
    height: wireframer.height,
    controls: wireframer.controls,
    lastModified: wireframer.lastModified,
  }).then(function(docRef) {id = docRef.id}).then(() => {dispatch(actionCreators.createWireframer(wireframer, id))}).catch((err) => {
    dispatch({ type: 'CREATE_WIREFRAMER_ERROR', err });
  });
};

export const modifyLastViewed = (lastModified, id, firebase) => (dispatch, getState, {getFirestore}) => {
  console.log("word dammit")
  const firestore = getFirestore();
  firestore.collection('wireframers').doc(id).update({
    lastModified: lastModified,
  }).then(function(docRef) {id = docRef.id}).then(() => {dispatch(actionCreators.fatherTime(lastModified, id))}).catch((err) => {
    dispatch({ type: 'MODIFY_LAST_VIEWED_ERROR', err });
  });
};

export const removeWireframer = (id, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection('wireframers').doc(id).delete().then(function() {
    console.log("Wireframer with id " + id + " successfully deleted!");
}).catch((err) => {
    dispatch({ type: 'DELETE_WIREFRAMER_ERROR', err });
  });
};

export const saveWireframer = (id, wireframer) => (dispatch, getState, {getFirestore}) => {
  console.log(id)
  const firestore = getFirestore();
  console.log(firestore.collection('wireframers').doc(id))
  firestore.collection('wireframers').doc(id).update({
    name: wireframer.name,
    userID: wireframer.userID,
    width: wireframer.width,
    height: wireframer.height,
    controls: wireframer.controls,
    lastModified: wireframer.lastModified,
  }).then(() => {
    console.log("Wireframer successfully saved!")
  }).catch((err) => {
    dispatch({ type: 'SAVE_WIREFRAMER_ERROR', err });
  });
}