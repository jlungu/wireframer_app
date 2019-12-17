import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // syncing firestore
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import wireframerReducer from './wireframerReducer';
import controlReducer from './controlReducer';
import initialWireframerReducer from './initialWireframerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  wireframer: wireframerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  selectedControl: controlReducer,
  initialWf: initialWireframerReducer,
});

export default rootReducer;