import * as actionTypes from '../actionTypes'

const initialState = {
    chatHistoryData: null,
    callHistoryData: null,
    liveVedioCallHistoryData: null,
    walletHistory: null,
    videoCallHistoryData:null,
    giftOrderHistoryData:null,
    offlineData:null,
    onlineData:null,
};

const history = (state = initialState, actions)=>{
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_CHAT_HISTORY:
            return {
               ...state,
               chatHistoryData: payload,
            };
        case actionTypes.SET_CALL_HISTORY:
            return {
               ...state,
               callHistoryData: payload,
            };
        case actionTypes.SET_LIVE_VEDIO_CALL_HISTORY:
            return {
               ...state,
               liveVedioCallHistoryData: payload,
            };
        case actionTypes.SET_WALLET_HISTORY:
            return {
               ...state,
               walletHistory: payload,
            };
            case actionTypes.SET_VIDEO_CALL_HISTORY:
                return {
                   ...state,
                   videoCallHistoryData: payload,
                };
                case actionTypes.SET_GIFT_ORDER_HISTORY:
                return {
                   ...state,
                   giftOrderHistoryData: payload,
                };
                case actionTypes.SET_OFFLINE_DATA:
                return {
                   ...state,
                   offlineData: payload,
                };
                case actionTypes.SET_ONLINE_DATA:
                return {
                   ...state,
                   onlineData: payload,
                };
        default:{
            return state
        }
    }
}

export default history;