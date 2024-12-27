import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { api_url, get_astrologer_registered_pooja, get_pooja, register_pooja,get_notification } from '../../config/Constants'
import { showToastMessage } from '../../utils/services'
import { goBack } from '../../navigations/NavigationServices'

function* getAstromallData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: api_url + get_pooja
        })

        if (response?.success) {
            const poojaData = response?.pooja.filter(item => item?.type == 'POOJA')
            const spellData = response?.pooja.filter(item => item?.type == 'SPELL')

            yield put({ type: actionTypes.SET_ASTROMALL_POOJA_DATA, payload: { poojaData, spellData } })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* registerPooja(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const providerData = yield select(state => state.provider.providerData)
        const response = yield postRequest({
            url: api_url + register_pooja,
            data: {
                ...payload,
                astrologerId: providerData?._id
            }
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

function* getRegisteredPooja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + get_astrologer_registered_pooja,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {

            yield put({ type: actionTypes.SET_REGISTERED_POOJA, payload: response?.pooja })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}





export default function* astromallSaga() {
    yield takeLeading(actionTypes.GET_ASTROMALL_DATA, getAstromallData);
    yield takeLeading(actionTypes.REGISTER_POOJA, registerPooja);
    yield takeLeading(actionTypes.GET_REGISTERED_POOJA, getRegisteredPooja);
}