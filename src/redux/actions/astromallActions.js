import * as actionTypes from '../actionTypes'

export const getAstromallData = payload =>({
    type: actionTypes.GET_ASTROMALL_DATA,
    payload,
})

export const setAstromallPoojaData = payload =>({
    type: actionTypes.SET_ASTROMALL_POOJA_DATA,
    payload,
})

export const setAstromallSpellData = payload =>({
    type: actionTypes.SET_ASTROMALL_SPELL_DATA,
    payload,
})

export const registerPooja = payload =>({
    type: actionTypes.REGISTER_POOJA,
    payload,
})

export const getRegisteredPooja = payload =>({
    type: actionTypes.GET_REGISTERED_POOJA,
    payload,
})

export const setRegisteredPooja = payload =>({
    type: actionTypes.SET_REGISTERED_POOJA,
    payload,
})