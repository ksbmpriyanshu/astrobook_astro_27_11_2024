import * as actionTypes from '../actionTypes';

export const setProviderData = payload => ({
  type: actionTypes.SET_PROVIDER_DATA,
  payload,
});

export const getFollowers = payload => ({
  type: actionTypes.GET_FOLLOWERS,
  payload,
})

export const setFollowers = payload => ({
  type: actionTypes.SET_FOLLOWERS,
  payload,
})

export const getAstrologerReviewData = payload => ({
  type: actionTypes.GET_ASTROLOGER_REVIEW_DATA,
  payload,
})

export const setAstrologerReviewData = payload => ({
  type: actionTypes.SET_ASTROLOGER_REVIEW_DATA,
  payload,
})

export const getAllAnouncement = payload =>({
  type: actionTypes.GET_ALL_ANOUNCEMENT,
  payload,
})

export const setAllAnouncement = payload =>({
  type: actionTypes.SET_ALL_ANOUNCEMENT,
  payload,
})

export const onReadAnouncement = payload =>({
  type: actionTypes.ON_READ_ANOUNCEMENT,
  payload,
})
export const getDeleteAccount = payload =>({
  type: actionTypes.GET_DELETE_ACCOUNT,
  payload,
})
export const setDeleteAccount = payload =>({
  type: actionTypes.SET_DELETE_ACCOUNT,
  payload,
})
