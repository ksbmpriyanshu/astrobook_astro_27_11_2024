import * as actionTypes from '../actionTypes';

export const initiateLiveStreaming = payload => ({
  type: actionTypes.INITIATE_LIVE_STREAMING,
  payload,
});

export const setLiveId = payload => ({
  type: actionTypes.SET_LIVE_ID,
  payload,
});

export const setStreamingId = payload => ({
  type: actionTypes.SET_STREAMING_ID,
  payload,
});

export const createLiveProfile = payload => ({
  type: actionTypes.CREATE_LIVE_PROFILE,
  payload,
});

export const addLiveListener = payload => ({
  type: actionTypes.ADD_LIVE_LISTENER,
  payload,
});

export const sendComments = payload => ({
  type: actionTypes.SEND_COMMENTS,
  payload,
});

export const setComments = payload => ({
  type: actionTypes.SET_COMMENTS,
  payload,
});

export const setGiftedGifts = payload => ({
  type: actionTypes.SET_GIFTED_GIFTS,
  payload,
});

export const addHeart = payload => ({
  type: actionTypes.ADD_HEART,
  payload,
});

export const removeHeart = payload => ({
  type: actionTypes.REMOVE_HEART,
  payload,
});

export const setHearts = payload => ({
  type: actionTypes.SET_HEARTS,
  payload,
});

export const setExitAlertVisible = payload => ({
  type: actionTypes.SET_EXIT_ALERT_VISIBLE,
  payload,
});

export const setIsLiveStart = payload => ({
  type: actionTypes.SET_IS_LIVE_START,
  payload,
});

export const setRoomUserCount = payload => ({
  type: actionTypes.SET_ROOM_USER_COUNT,
  payload,
});

export const setWaitListData = payload => ({
  type: actionTypes.SET_WAITLIST_DATA,
  payload,
});

export const setWatingListVisible = payload => ({
  type: actionTypes.SET_WAITING_LIST_VISIBLE,
  payload,
});

export const sendCallRequestToUser = payload => ({
  type: actionTypes.SEND_CALL_REQUEST_TO_USER,
  payload,
});

export const setLiveLoadingVisible = payload => ({
  type: actionTypes.SET_LIVE_LOADING_VISIBLE,
  payload,
});

export const setLayout = payload => ({
  type: actionTypes.SET_LAYOUT,
  payload,
});

export const resetLiveState = payload => ({
  type: actionTypes.RESET_LIVE_STATE,
  payload,
});

export const onStreamUpdate = payload => ({
  type: actionTypes.ON_STREAM_UPDATE,
  payload,
});

export const setCoHostData = payload => ({
  type: actionTypes.SET_CO_HOST_DATA,
  payload,
});

export const endLiveCall = payload => ({
  type: actionTypes.END_LIVE_CALL,
  payload,
})

export const onLiveMuteUnmute = payload => ({
  type: actionTypes.ON_LIVE_MUTE_UNMUTE,
  payload,
})

export const setLiveIsMute = payload => ({
  type: actionTypes.SET_LIVE_IS_MUTE,
  payload,
})

export const onAppStateChangeInLive = payload => ({
  type: actionTypes.ON_APP_STATE_CHANGE_IN_LIVE,
  payload,
})

