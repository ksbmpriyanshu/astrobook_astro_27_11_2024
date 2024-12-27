import * as actionTypes from '../actionTypes'

export const onLogin = pyaload =>({
    type: actionTypes.ON_LOGIN,
    payload: pyaload,
  
})

export const onLogout = pyaload =>({
    type: actionTypes.ON_LOGOUT,
    payload: pyaload,
})

export const onApplyAsAnAstrologer = payload => ({
    type: actionTypes.ON_APPLY_AS_AN_ASTROLOGER,
    payload,
})