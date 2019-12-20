const initState = -1;

const controlReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_CONTROL': {
            return action.control
        }
        default:
            return state;
    }
};

export default controlReducer;