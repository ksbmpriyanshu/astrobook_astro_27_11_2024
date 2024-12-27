import * as actionTypes from '../actionTypes';
const initialState = {
    notificationdata: null
};

const notificationReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case actionTypes.SET_NOTIFICATIONS_DATA:
            return {
                ...state,
                notificationdata: payload
            }

        default: {
            return state
        }
    }
}

export default notificationReducer

