import * as actionTypes from '../actionTypes'

const initialState = {
    isLoading: false,
    isRefreshing: false,
    imagePickerVisible: false
}

const setting = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case actionTypes.SET_IS_REFRESHING:
            return {
                ...state,
                isRefreshing: payload
            }
        case actionTypes.SET_IMAGE_PICKER_VISIBLE:
            return {
                ...state,
                imagePickerVisible: payload,
            };
        default:
            return state
    }

}

export default setting;