const initState = {
    wireframer: {}
};

const wireframerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_WIREFRAMER': {
            return action.wireframer
        }
        default:
            return state;
    }
};

export default wireframerReducer;