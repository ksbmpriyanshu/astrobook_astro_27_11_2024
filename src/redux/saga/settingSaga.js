import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetToScreen } from '../../navigations/NavigationServices';
import { blobRequest, postRequest } from '../../utils/apiRequests';
import {
  api_url,
  astroleger_Withdraw,
  change_call_status,
  change_chat_status,
  change_vedio_call_status,
  get_astrolgoer_followers,
  get_astrologer_announcement,
  get_splash,
  get_verified_astrologer_review,
  on_read_announcement,
  update_next_online,
  get_notification_data,
  get_delete_accoount,
  get_assigned_Puja,
  complete_astrologer_pooja,
  get_complete_Puja
} from '../../config/Constants';
import { mergeDateAndTime, showToastMessage } from '../../utils/services';
import { registerZegoCall } from '../../utils/zegoServices';

function* getSplash(actions) {
  try {
    const { payload } = actions
    let providerData = yield AsyncStorage.getItem('providerData');
    let data = JSON.parse(providerData);
    if (data) {
      const response = yield postRequest({
        url: api_url + get_splash,
        data: {
          astrologerId: data?._id,
        },
      });

      if (response?.success) {
        yield AsyncStorage.setItem(
          'providerData',
          JSON.stringify(response?.astrologer),
        );
        yield put({
          type: actionTypes.SET_PROVIDER_DATA,
          payload: {
            ...response?.astrologer,
            chatCount: response?.chatCount,
            callCount: response?.callCount,
            liveCallCount: response?.liveCallCount,
          },
        });
        yield call(resetToScreen, 'providerHome');
        yield registerZegoCall({ userId: response?.astrologer?._id, userName: response?.astrologer?.astrologerName || 'Astrologer', dispatch: payload })
      } else {
        resetToScreen('astrologerLogin');
      }
    } else {
      resetToScreen('astrologerLogin');
    }
  } catch (e) {
    console.log(e);
  }
}

function* updateCallStatus(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const provider = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + change_call_status,
      header: 'json',
      data: {
        call_status: payload,
        astrologerId: provider?._id,
      },
    });

    if (response?.success) {
      if (typeof response?.astrologer != 'undefined') {
        yield put({
          type: actionTypes.SET_PROVIDER_DATA,
          payload: response?.astrologer,
        });

        showToastMessage({ message: 'Status Changed..' });
      } else {
        //   yield put({ type: CommonActions.SET_SIMPLE_ALERT_DATA, payload: { visible: true, message: response?.message, title: response?.type } })
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* updateVideoCallStatus(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const provider = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + change_vedio_call_status,
      header: 'json',
      data: {
        video_call_status: payload,
        astrologerId: provider?._id,
      },
    });

    if (response?.success) {
      if (typeof response?.astrologer != 'undefined') {
        yield put({
          type: actionTypes.SET_PROVIDER_DATA,
          payload: response?.astrologer,
        });
        showToastMessage({ message: 'Status Changed..' });
      } else {
        //   yield put({ type: CommonActions.SET_SIMPLE_ALERT_DATA, payload: { visible: true, message: response?.message, title: response?.type } })
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateChatStatus(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const provider = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + change_chat_status,
      header: 'json',
      data: {
        chat_status: payload,
        astrologerId: provider?._id,
      },
    });
    console.log(response, 'online data')
    if (response?.success) {
      if (typeof response?.astrologer != 'undefined') {
        yield put({
          type: actionTypes.SET_PROVIDER_DATA,
          payload: response?.astrologer,
        });
        showToastMessage({ message: 'Status Changed..' });
      } else {
        //   yield put({ type: CommonActions.SET_SIMPLE_ALERT_DATA, payload: { visible: true, message: response?.message, title: response?.type } })
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getProviderData() {
  try {
    console.log('sdfsdfsdfdfsfd')
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_splash,
      data: {
        astrologerId: providerData?._id,
      },
    });

    console.log(response)

    if (response?.success) {
      yield AsyncStorage.setItem(
        'providerData',
        JSON.stringify(response?.astrologer),
      );
      yield put({
        type: actionTypes.SET_PROVIDER_DATA,
        payload: response?.astrologer,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* onRefreshHomeScreen() {
  try {
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true });
    yield put({ type: actionTypes.GET_ALL_ANOUNCEMENT, payload: null })
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_splash,
      data: {
        astrologerId: providerData?._id,
      },
    });

    if (response?.success) {
      yield AsyncStorage.setItem(
        'providerData',
        JSON.stringify(response?.astrologer),
      );
      yield put({
        type: actionTypes.SET_PROVIDER_DATA,
        payload: {
          ...response?.astrologer,
          chatCount: response?.chatCount,
          callCount: response?.callCount,
          liveCallCount: response?.liveCallCount,
        },
      });
    }
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  }
}

function* getFollowers() {
  try {
    const providerData = yield select(state => state.provider.providerData);
    console.log(providerData?._id, 'pdata')
    const response = yield postRequest({
      url: api_url + get_astrolgoer_followers,
      data: {
        astrologerId: providerData?._id,
      },
    });
    console.log(response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_FOLLOWERS,
        payload: response?.followers,
      });
    }
  } catch (e) {
    console.log(e);

  }
}

function* getAstrologerReviewData() {
  try {
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_verified_astrologer_review,
      data: {
        astrologer_id: providerData?._id,
      },
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_REVIEW_DATA,
        payload: response,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* onNextOnline(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true });
    const { date, time } = actions.payload
    const provider = yield select(state => state.provider.providerData);
    const mergedDateTime = mergeDateAndTime(date, time);

    if (mergedDateTime <= new Date()) {
      showToastMessage({ message: 'Please select future time' })
      return
    }

    const response = yield postRequest({
      url: api_url + update_next_online,
      data: {
        date, time,
        astrologerId: provider?._id,
      }
    })

    console.log(response)
    if (response?.success) {
      showToastMessage({ message: response?.message });
      getProviderData();
      yield put({
        type: actionTypes.SET_PROVIDER_DATA,
        payload: response?.astrologer,
      });
    }

    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  }
}

function* getAstrologerAnouncement() {
  try {
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_astrologer_announcement,
      data: {
        astrologerId: providerData?._id,
      },
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_ANOUNCEMENT,
        payload: response?.announcements,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* onReadAnouncement(actions) {
  try {
    const { payload } = actions
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + on_read_announcement,
      data: {
        astrologerId: providerData?._id,
        id: payload
      },
    });

    if (response?.success) {
      yield put({ type: actionTypes.GET_ALL_ANOUNCEMENT, payload: null })
    }
  } catch (e) {
    console.log(e);
  }
}

function* getwithdrawwallet(actions) {
  const { payload } = actions
  console.log(payload, 'payydada')
  try {
    // const providerData = yield select(state => state.provider.providerData);
    // console.log(providerData?._id,'pdata')
    const response = yield postRequest({
      url: api_url + astroleger_Withdraw,
      data: {
        ...payload
      },
    });
    console.log("withdraw suuccess",response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_WITHDRAW_WALLET,
        payload: response?.data,
      });
      yield put({
        type: actionTypes.AMOUNT_WITHDRAW_DATA,
        payload: null,
      })

      showToastMessage({ message: response?.message })
    }
    resetToScreen('providerHome')
  } catch (e) {
    console.log(e);

  }
}

function* getNotificationData(actions) {
  try {
    const { payload } = actions;
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_notification_data,
      data: {
        astrologerId: providerData?._id,
      },
    });

    console.log("response::::response::::", response);
    
    if (response?.success) {
      // Sort notifications by _id in descending order
      const sortedNotifications = response.notifications.sort((a, b) => b._id.localeCompare(a._id));
      
      // Dispatch sorted notifications to store
      yield put({ type: actionTypes.SET_NOTIFICATIONS_DATA, payload: sortedNotifications });
      showToastMessage({ message: response?.message });
    }
  } catch (e) {
    console.log(e);
  }
}


function* getdeleteaccount(actions) {
  try {
    const { payload } = actions
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + get_delete_accoount,
      data: {
        astrologerId: providerData?._id,
      },
    });


    if (response?.success) {
      yield put({ type: actionTypes.SET_DELETE_ACCOUNT, payload: response?.notifications })
      showToastMessage({ message: response?.message })
      yield call(resetToScreen, 'astrologerLogin')
    }
  } catch (e) {
    console.log(e);
  }
}



function* getAssignedPujaData(actions) {
  try {
    const { payload } = actions
    const providerData = yield select(state => state.provider.providerData);
    console.log(providerData?._id,'ppid')
   
    const response = yield postRequest({
      url: api_url + get_assigned_Puja,
      data: {
        astrologerId: providerData?._id,
      },
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ASSIGNEDPUJA_DATA, payload: response?.pooja })
   
      showToastMessage({ message: response?.message })

    }
    

  }
  catch (e) {
    console.log(e);
  }
}


function* getAssignedPujaUpload(actions) {
  try {
    const { payload } = actions

    console.log("order id:::", payload)
 
    const response = yield postRequest({
      url: api_url + complete_astrologer_pooja,
      data: payload
    })
    console.log("respose:::::::", response);
    }
  catch (e) {
    console.log("eeee", e);
  }
}
function* getAstrologerCompleltePooja(actions) {
  try {
    const { payload } = actions
    const providerData = yield select(state => state.provider.providerData);
   
    const response = yield postRequest({
      url: api_url + get_complete_Puja,
      data: {
        astrologerId: providerData?._id,
      },
    });
    if (response?.success) {
      yield put({ type: actionTypes.SET_ASTROLOGER_COMPLETE_POOJA, payload: response?.pooja })
   
      showToastMessage({ message: response?.message })

    }
    

  }
  catch (e) {
    console.log(e);
  }
}



export default function* settingSaga() {
  yield takeLeading(actionTypes.GET_SPLASH, getSplash);
  yield takeLeading(actionTypes.GET_PROVIDER_DATA, getProviderData);
  yield takeLeading(actionTypes.UPDATE_CALL_STATUS, updateCallStatus);
  yield takeLeading(actionTypes.UPDATE_CHAT_STATUS, updateChatStatus);
  yield takeLeading(actionTypes.UPDATE_VIDEO_CALL_STATUS, updateVideoCallStatus);
  yield takeLeading(actionTypes.ON_REFERESH_HOME_SCREEN, onRefreshHomeScreen);
  yield takeLeading(actionTypes.GET_FOLLOWERS, getFollowers);
  yield takeLeading(actionTypes.GET_ASTROLOGER_REVIEW_DATA, getAstrologerReviewData);
  yield takeLeading(actionTypes.ON_NEXT_ONLINE, onNextOnline);
  yield takeLeading(actionTypes.GET_ALL_ANOUNCEMENT, getAstrologerAnouncement);
  yield takeLeading(actionTypes.ON_READ_ANOUNCEMENT, onReadAnouncement);
  yield takeLeading(actionTypes.GET_WITHDRAW_WALLET, getwithdrawwallet);
  yield takeLatest(actionTypes.GET_NOTIFICATIONS_DATA, getNotificationData);
  yield takeLeading(actionTypes.GET_DELETE_ACCOUNT, getdeleteaccount)
  yield takeLeading(actionTypes.GET_ASSIGNEDPUJA_DATA, getAssignedPujaData);
  yield takeLeading(actionTypes.GET_ASSIGNEDPUJA_UPLOAD, getAssignedPujaUpload);
  yield takeLeading(actionTypes.GET_ASTROLOGER_COMPLETE_POOJA,getAstrologerCompleltePooja);
}
