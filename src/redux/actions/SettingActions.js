import * as actionTypes from '../actionTypes'

export const getSplash = payload => ({
    type: actionTypes.GET_SPLASH,
    payload,
})

export const updateCallStatus = payload => ({
    type: actionTypes.UPDATE_CALL_STATUS,
    payload,
})

export const updateChatStatus = payload => ({
    type: actionTypes.UPDATE_CHAT_STATUS,
    payload,
})

export const updateVideoCallStatus = payload => ({
  type: actionTypes.UPDATE_VIDEO_CALL_STATUS,
  payload,
})

export const setImagePickerVisible = payload => ({
    type: actionTypes.SET_IMAGE_PICKER_VISIBLE,
    payload,
})

export const onRefreshHomeScreen = payload => ({
    type: actionTypes.ON_REFERESH_HOME_SCREEN,
    payload,
  })
  
  export const getProviderData = payload => ({
    type: actionTypes.GET_PROVIDER_DATA,
    payload,
  })

  export const onNextOnline = payload => ({
    type: actionTypes.ON_NEXT_ONLINE,
    payload,
  })
