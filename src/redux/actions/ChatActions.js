import * as actionTypes from '../actionTypes'

export const onAcceptRejectChat = payload => ({
    type: actionTypes.ON_ACCEPT_REJECT_CHAT,
    payload,
}) 

export const setChatTimerCountdown = payload => ({
    type: actionTypes.SET_CHAT_TIMER_COUNTDOWN,
    payload,
})

export const setChatData = payload => ({
    type: actionTypes.SET_CHAT_DATA,
    payload,
})

export const setChatRequestedData = payload => ({
    type: actionTypes.SET_CHAT_REQUESTED_DATA,
    payload,
})

export const onInitiateChat = payload => ({
    type: actionTypes.ON_INITIATE_CHAT,
    payload,
})

export const sendChatMessage = payload => ({
    type: actionTypes.SEND_CHAT_MESSAGE,
    payload,
})

export const saveChatMessage = payload => ({
    type: actionTypes.SAVE_CHAT_MESSAGE,
    payload,
})

export const onEndChat = payload => ({
    type: actionTypes.ON_END_CHAT,
    payload,
})

export const onCloseChat = payload => ({
    type: actionTypes.ON_CLOSE_CHAT,
    payload,
})


export const onChatImageSend = payload => ({
    type: actionTypes.ON_CHAT_IMAGE_SEND,
    payload,
})

export const setChatImageData = payload => ({
    type: actionTypes.SET_CHAT_IMAGE_DATA,
    payload,
})

export const getIntakeDetails = payload => ({
    type: actionTypes.GET_INTAKE_DETAILS,
    payload,
})

export const setLinkedProfileData = payload => ({
    type: actionTypes.SET_LINKED_PROFILE_DATA,
    payload,
})

export const setCallRequestData = payload => ({
    type: actionTypes.SET_CALL_REQUEST_DATA,
    payload,
})

export const setCallVideoRequrestData = payload => ({
    type: actionTypes.SET_CALL_VIDEO_REQUREST_DATA,
    payload,
})

export const onVideoCallEnd = payload => ({
    type: actionTypes.ON_VIDEO_CALL_END,
    payload
})
