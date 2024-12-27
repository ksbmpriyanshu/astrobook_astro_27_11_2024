import * as actionTypes from '../actionTypes';

const initialState = {
  commentsData: [],
  liveID: '',
  streamID: '333',
  giftedData: [],
  heartData: [],
  exitAlertVisible: false,
  isLiveStart: false,
  roomUserCount: 0,
  waitingListVisible: false,
  waitListData: [],
  layout: 'LIVE',
  coHostData: null,
  totalCallRequsets: 0,
  isMute: false
};

const live = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        commentsData: [...payload, ...state.commentsData],
      };
    case actionTypes.SET_LIVE_ID:
      return {
        ...state,
        liveID: payload,
      };

    case actionTypes.SET_GIFTED_GIFTS:
      return {
        ...state,
        giftedData: [...payload, ...state.giftedData],
      };

    case actionTypes.SET_HEARTS:
      return {
        ...state,
        heartData: payload,
      };
    case actionTypes.SET_EXIT_ALERT_VISIBLE:
      return {
        ...state,
        exitAlertVisible: payload,
      };

    case actionTypes.SET_IS_LIVE_START:
      return {
        ...state,
        isLiveStart: payload,
      };

    case actionTypes.SET_ROOM_USER_COUNT:
      return {
        ...state,
        roomUserCount: payload,
      };

    case actionTypes.SET_WAITING_LIST_VISIBLE:
      return {
        ...state,
        waitingListVisible: payload,
      };

    case actionTypes.SET_WAITLIST_DATA:
      return {
        ...state,
        waitListData: payload,
        totalCallRequsets: payload.length
      };

    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        layout: payload,
      };
    case actionTypes.SET_CO_HOST_DATA:
      return {
        ...state,
        coHostData: payload,
      };

    case actionTypes.SET_STREAMING_ID:
      return {
        ...state,
        streamID: payload,
      };
    case actionTypes.SET_LIVE_IS_MUTE:
      return {
        ...state,
        isMute: payload,
      };

    case actionTypes.RESET_LIVE_STATE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default live;
