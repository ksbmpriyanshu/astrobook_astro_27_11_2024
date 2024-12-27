import * as actionTypes from '../actionTypes'

const instialState = {
    chatData: [],
    requestedData: null,
    chatTimerCountDown: 0,
    chatImageData: null,
    profileData: null,
    callRequestData: null,
    callVideoRequestData: null
}

const chat = (state = instialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case actionTypes.SET_CHAT_DATA:
            return {
                ...state,
                chatData: payload
            }
        case actionTypes.SET_CHAT_REQUESTED_DATA:
            return {
                ...state,
                requestedData: payload
            }
        case actionTypes.SET_CHAT_TIMER_COUNTDOWN:
            return {
                ...state,
                chatTimerCountDown: payload
            }

        case actionTypes.SET_CHAT_IMAGE_DATA:
            return {
                ...state,
                chatImageData: payload
            }
        case actionTypes.SET_LINKED_PROFILE_DATA:
            return {
                ...state,
                profileData: payload
            }
        case actionTypes.SET_CALL_REQUEST_DATA:
            return {
                ...state,
                callRequestData: payload
            }
        case actionTypes.SET_CALL_VIDEO_REQUREST_DATA:
            return {
                ...state,
                callVideoRequestData: payload
            }
        default: {
            return state
        }
    }
}

export default chat