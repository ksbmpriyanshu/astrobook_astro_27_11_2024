import * as actionTypes from '../actionTypes';

const initialState = {
  providerData: null,
  followerListData: null,
  reviewData: null,
  anouncementData: [],
  deleteAccount: null,
};

const provider = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_PROVIDER_DATA:
      return {
        ...state,
        providerData: payload,
      };
    case actionTypes.SET_FOLLOWERS:
      return {
        ...state,
        followerListData: payload,
      };
    case actionTypes.SET_ASTROLOGER_REVIEW_DATA:
      return {
        ...state,
        reviewData: payload,
      };
    case actionTypes.SET_ALL_ANOUNCEMENT:
      return {
        ...state,
        anouncementData: payload,
      };
      case actionTypes.SET_DELETE_ACCOUNT:
        return {
          ...state,
          deleteAccount: payload,
        };

    default:
      return state;
  }
};

export default provider;
