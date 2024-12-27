import * as actionTypes from '../actionTypes'

const instialState = {
    assignedPuja: null,
    astrologerCompletePooja: null,
}

const assignedpujaReducer = (state = instialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_ASSIGNEDPUJA_DATA:
            return {
                ...state,
                assignedPuja: payload
            }
        case actionTypes.GET_ASSIGNEDPUJA_UPLOAD :
            return{
                ...state
            }
            case actionTypes.SET_ASTROLOGER_COMPLETE_POOJA : 
            return {
                ...state,
                astrologerCompletePooja: payload
            }
        default: {
            return state
        }
    }
}

export default assignedpujaReducer