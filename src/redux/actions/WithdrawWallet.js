import * as actionTypes from '../actionTypes'

export const getWithWithdraw = payload => ({
    type: actionTypes.GET_WITHDRAW_WALLET,
    payload
})
export const setWithWithdraw = payload => ({
    type: actionTypes.SET_WITHDRAW_WALLET,
    payload
})
export const amountWithdrawData = payload => ({
    type: actionTypes.AMOUNT_WITHDRAW_DATA,
    payload
})




