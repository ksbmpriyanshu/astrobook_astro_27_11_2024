import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { add_astrologer_inquiry, api_url, astrologer_login, logout_astrologer } from '../../config/Constants'
import { getFcmToken, showToastMessage } from '../../utils/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { goBack, resetToScreen } from '../../navigations/NavigationServices'
import messaging from '@react-native-firebase/messaging'
import { registerZegoCall, unRegisterZegoCall } from '../../utils/zegoServices'

function* onLogin(actions) {
    try {
        const { payload } = actions;
        console.log(payload, 'alldad');
        console.log('1');
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        
        const fcmToken = yield messaging().getToken();
        console.log(fcmToken, 'fcm ');

        // Get current time for login time tracking
        const loginTime = new Date().toISOString();

        const response = yield postRequest({
            url: api_url + astrologer_login,
            data: {
                ...payload?.data,
                fcmToken: fcmToken,
                loginTime: loginTime // Sending login time to the server
            }
        });

        if (response?.success) {
            if (response?.status == 1) {
                yield AsyncStorage.setItem('providerData', JSON.stringify(response?.astrologer));
                yield put({
                    type: actionTypes.SET_PROVIDER_DATA,
                    payload: {
                        ...response?.astrologer,
                        chatCount: response?.chatCount,
                        callCount: response?.callCount,
                        liveCallCount: response?.liveCallCount,
                    }
                });
                yield call(showToastMessage, { message: response?.message });
                yield call(resetToScreen, 'providerHome');
                yield registerZegoCall({
                    userId: response?.astrologer?._id,
                    userName: response?.astrologer?.astrologerName || 'Astrologer',
                    dispatch: payload?.dispatch
                });
            } else {
                yield call(showToastMessage, { message: response?.message });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e, 'error');
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* onLogout(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const providerData = yield select(state => state.provider.providerData);

        // Get current time for logout time tracking
        const logoutTime = new Date().toISOString();

        const response = yield postRequest({
            url: api_url + logout_astrologer,
            data: {
                astrologerId: providerData?._id,
                logoutTime: logoutTime // Sending logout time to the server
            }
        });

        if (response?.success) {
            yield AsyncStorage.clear();
            yield unRegisterZegoCall();
            yield call(resetToScreen, 'astrologerLogin');
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* onApplyAsAnAstrologer(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + add_astrologer_inquiry,
            data: payload
        })


        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield call(goBack)
        } else {
            showToastMessage({ message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })


    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* authSaga() {
    yield takeLeading(actionTypes.ON_LOGIN, onLogin)
    yield takeLeading(actionTypes.ON_LOGOUT, onLogout)
    yield takeLeading(actionTypes.ON_APPLY_AS_AN_ASTROLOGER, onApplyAsAnAstrologer)
}