import * as actionTypes from '../actionTypes'


export const getAssignedPuja = payload => ({
    type: actionTypes.GET_ASSIGNEDPUJA_DATA,
    payload
})

export const setAssignedPuja = payload => ({
    type: actionTypes.SET_ASSIGNEDPUJA_DATA,
    payload
})

export const getAssignedPujaUpload = payload => ({
    type: actionTypes.GET_ASSIGNEDPUJA_UPLOAD,
    payload
})
export const getAstrologerCompleltePooja = payload => ({
    type: actionTypes.GET_ASTROLOGER_COMPLETE_POOJA,
    payload
})
export const setAstrologerCompleltePooja = payload => ({
    type: actionTypes.SET_ASTROLOGER_COMPLETE_POOJA,
    payload
})