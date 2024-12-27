import * as actionTypes from '../actionTypes'



export const getNotifications = payload => ({
    type: actionTypes.GET_NOTIFICATIONS_DATA,
    payload
})

export const setNotifications = payload => ({
    type: actionTypes.SET_NOTIFICATIONS_DATA,
    payload
})


