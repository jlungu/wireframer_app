const initState = {
    intialWireframer: {}
};

const initialWireframerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'INITIAL_WIREFRAMER': {
            return action.wireframer
        }
        default:
            return state;
    }
};

export default initialWireframerReducer;