import * as actionTypes from '../actionTypes'

const initialState = {
    astromallPoojaData: null,
    astromallSpellData: null,
    registeredPooja: null
}

const astromall = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_ASTROMALL_POOJA_DATA:
            return {
                ...state,
                astromallPoojaData: payload?.poojaData,
                astromallSpellData: payload?.spellData
            }
        case actionTypes.SET_REGISTERED_POOJA:
            return {
                ...state,
                registeredPooja: payload,
            }
        default:
            return state;
    }
}

export default astromall;