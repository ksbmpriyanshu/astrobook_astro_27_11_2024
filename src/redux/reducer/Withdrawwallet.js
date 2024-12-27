import * as actionTypes from '../actionTypes'

const instialState = {
    withWithdraw: null,
    amountWithdrawdata:null


}

const chat = (state = instialState, actions) => {
    const { type, payload } = actions

    switch (type) {
        case actionTypes.SET_WITHDRAW_WALLET:
            return {
                ...state,
                withWithdraw: payload
            }
            case actionTypes.AMOUNT_WITHDRAW_DATA:
                return {
                    ...state,
                    amountWithdrawdata: payload
                }
    
        default: {
            return state
        }
    }
}

export default chat