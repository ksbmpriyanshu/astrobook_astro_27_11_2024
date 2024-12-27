import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import {
  api_url,
  initate_live_streaming,
  live_streaming_app_id,
  live_streaming_app_sign,
} from '../../config/Constants';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoMixerTask,
  ZegoAudioConfig,
  ZegoAudioConfigPreset,
  ZegoMixerInputContentType,
  ZegoScenario,
} from 'zego-express-engine-reactnative';
import { PermissionsAndroid, Platform, findNodeHandle } from 'react-native';
import { replace } from '../../navigations/NavigationServices';
import { postRequest } from '../../utils/apiRequests';
import * as LiveActions from '../../redux/actions/LiveActions';
import database from '@react-native-firebase/database';
import { showToastMessage } from '../../utils/services';

let heartCount = 1;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  // Adjusted RGB values for pinkish tones
  return `rgb(${getRandomNumber(220, 255)}, ${getRandomNumber(
    50,
    100,
  )}, ${getRandomNumber(50, 100)})`;
}

const granted =
  Platform.OS == 'android'
    ? PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.RECORD_AUDIO,
    )
    : undefined;

function* initateLiveStreaming(actions) {
  try {
    const { payload } = actions;
    console.log("sdljkhfiousdhfiou")
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const providerData = yield select(state => state.provider.providerData);
    const response = yield postRequest({
      url: api_url + initate_live_streaming,
      data: {
        astrologerId: providerData?._id,
      },
    });
    console.log("response::::>>>>",response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_LIVE_ID, payload: response?.liveId });
      yield call(replace, 'liveScreen');
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* createLiveProfile(actions) {
  try {
    const { payload } = actions;
    const profile = {
      appID: live_streaming_app_id,
      appSign: live_streaming_app_sign,
      scenario: ZegoScenario.General,
    };
    const response = yield ZegoExpressEngine.createEngineWithProfile(profile);
    response.getVersion().then(ver => {
      console.log('Express SDK Version: ' + ver);
    });
    if (payload) {
      yield call(payload());
    }

    //         ZegoExpressEngine.instance().enableVideoObjectSegmentation(true, {
    //             backgroundConfig: {
    //                 imageURL:
    //                     'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781782496557/be-your-own-astrologer-9781782496557_lg.jpg',
    //             },
    //             objectSegmentationType: 0
    //         });
    //     })
  } catch (e) {
    console.log(e);
  }
}

function* addLiveListeners(actions) {
  try {
    const { startPreveiw, dispatch } = actions.payload;
    const liveID = yield select(state => state.live.liveID);
    const providerData = yield select(state => state.provider.providerData);

    yield put({ type: actionTypes.CREATE_LIVE_PROFILE, payload: null });

    ZegoExpressEngine.instance().on(
      'roomStateUpdate',
      (roomID, state, errorCode, extendedData) => {
        console.log(
          'JS onRoomStateUpdate: ' +
          state +
          ' roomID: ' +
          roomID +
          ' err: ' +
          errorCode +
          ' extendData: ' +
          extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBroadcastMessage',
      (roomID, messageList) => {
        const messages = [];
        messageList.forEach((item, index) => {
          let new_comments = {
            messageID: item.messageID,
            message: item.message,
            sendTime: item.sendTime,
            fromUser: {
              userID: item.fromUser.userID,
              userName: item.fromUser.userName,
            },
          };
          messages.push(new_comments);
        });
        dispatch(LiveActions.setComments(messages));
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBarrageMessage',
      (roomID, messageList) => {
        const gifts = [];
        messageList.forEach((item, index) => {
          let new_gifts = {
            messageID: item.messageID,
            message: item.message,
            sendTime: item.sendTime,
            fromUser: {
              userID: item.fromUser.userID,
              userName: item.fromUser.userName,
            },
          };
          gifts.push(new_gifts);
        });
        dispatch(LiveActions.setGiftedGifts(gifts));
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvCustomCommand',
      (roomID, fromUser, command) => {
        let my_command = JSON.parse(command);
        if (my_command?.command == 'heart') {
          dispatch(LiveActions.addHeart());
        } else if (my_command?.command == 'cancel_call') {
          showToastMessage({ message: 'User Reject Call Request.' })
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'publisherStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        console.log(
          'JS onPublisherStateUpdate: ' +
          state +
          ' streamID: ' +
          streamID +
          ' err: ' +
          errorCode +
          ' extendData: ' +
          extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'playerStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        console.log(
          'JS onPlayerStateUpdate: ' +
          state +
          ' streamID: ' +
          streamID +
          ' err: ' +
          errorCode +
          ' extendData: ' +
          extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'roomStreamUpdate',
      (roomID, updateType, ZegoStream) => {
        dispatch(LiveActions.onStreamUpdate({ roomID, updateType, ZegoStream }));
      },
    );

    ZegoExpressEngine.instance().on(
      'roomOnlineUserCountUpdate',
      (roomID, count) => {
        dispatch(LiveActions.setRoomUserCount(count));
      },
    );

    ZegoExpressEngine.instance().on('mixerSoundLevelUpdate', soundLevels => {
      /*soundLevels.array.forEach(element => {
                    console.log("JS onMixerSoundLevelUpdate: " + element)
                  });*/
      var level = soundLevels[0];

      console.log(
        'JS onMixerSoundLevelUpdate: ' +
        soundLevels[0] +
        ' type of: ' +
        typeof level,
      );
    });

    ZegoExpressEngine.instance().on(
      'mixerRelayCDNStateUpdate',
      (taskID, infoList) => {
        console.log('JS onMixerRelayCDNStateUpdate: ' + taskID);
        infoList.forEach(item => {
          console.log(
            'item: ' +
            item.url +
            ' ,state: ' +
            item.state +
            ' ,reason: ' +
            item.updateReason,
            ' ,time: ' + item.stateTime,
          );
        });
      },
    );

    database()
      .ref(`LiveStreaming/${liveID}/WaitingList`)
      .on('value', snapshot => {
        if (snapshot.val() && snapshot.val() != 'null') {
          const myDataObject = snapshot.val();
          if (myDataObject) {
            const myDataArray = Object.keys(myDataObject)
              .sort()
              .map(key => myDataObject[key]);
            const callStartedTrue = myDataArray.filter(item => item.callStarted === true);
            const callStartedFalse = myDataArray.filter(item => item.callStarted !== true);

            const sortedData = [...callStartedTrue, ...callStartedFalse]

            // Dispatch the combined and reversed data
            dispatch(LiveActions.setWaitListData(sortedData));
          }
        } else {
          dispatch(LiveActions.setWaitListData([]));
        }
      });

      console.log('Live ID ::::::',liveID);

    database()
      .ref(`LiveStreaming/${liveID}/coHostData`)
      .on('value', snapshot => {
        if (snapshot.val() && snapshot.val() != 'null') {
          dispatch(LiveActions.setCoHostData(snapshot.val()));
        } else {
          dispatch(LiveActions.setCoHostData(null));
        }
      });

    ZegoExpressEngine.instance().loginRoom(liveID, {
      userID: providerData?._id,
      userName: providerData?.astrologerName,
    });

    ZegoExpressEngine.instance().startPublishingStream(liveID);

    yield call(startPreveiw);

    yield put({ type: actionTypes.SET_IS_LIVE_START, payload: true });
  } catch (e) {
    console.log(e);
  }
}

function* sendComments(actions) {
  try {
    const { payload } = actions;
    const liveID = yield select(state => state.live.liveID);
    const providerData = yield select(state => state.provider.providerData);

    const response = yield ZegoExpressEngine.instance().sendBroadcastMessage(
      liveID,
      payload,
    );
    if (response?.errorCode === 0) {
      let new_comments = {
        messageID: response?.messageID,
        message: payload,
        sendTime: new Date().getTime(),
        fromUser: {
          userID: providerData?._id,
          userName: providerData?.astrologerName,
        },
      };
      yield put({ type: actionTypes.SET_COMMENTS, payload: [new_comments] });
    }
  } catch (e) {
    console.log(e);
  }
}

function* removeHeart(actions) {
  try {
    const { payload } = actions;
    const hearts = yield select(state => state.live.heartData);
    const newHeart = hearts.filter(heart => heart.id != payload);
    yield put({ type: actionTypes.SET_HEARTS, payload: newHeart });
  } catch (e) {
    console.log(e);
  }
}

function* addHeart(actions) {
  try {
    const { payload } = actions;
    const hearts = yield select(state => state.live.heartData);

    const newHeart = {
      id: heartCount,
      right: getRandomNumber(0, 50),
      color: getRandomColor(),
    };

    const data = [...hearts, newHeart];
    heartCount++;
    yield put({ type: actionTypes.SET_HEARTS, payload: data });
  } catch (e) {
    console.log(e);
  }
}

function* sendCallRequestToUser(actions) {
  try {
    const { payload } = actions;
    const liveID = yield select(state => state.live.liveID);
    console.log("liveID:::>>>",liveID)
    const coHostData = yield select(state => state.live.coHostData)
    if (coHostData) {
      yield call(showToastMessage, { message: 'Please end current call' })
      return
    }
    let command = {
      command: 'accept_call',
      type: 'vedio',
    };
    console.log("start video call:::")
    ZegoExpressEngine.instance().sendCustomCommand(liveID, JSON.stringify(command), [{ userID: payload }])
      .then(() => {
        console.log("::::again start video call:::")
        showToastMessage({ message: 'Call request sended.' });
      });
    yield put({ type: actionTypes.SET_WAITING_LIST_VISIBLE, payload: false })
  } catch (e) {
    console.log(e);
  }
}

function* onStreamUpdate(actions) {
  try {
    const { roomID, updateType, ZegoStream } = actions.payload;
    const liveID = yield select(state => state.live.liveID);

    let foundKey = null;

    for (let obj of ZegoStream) {
      if (obj['streamID'] != liveID) {
        foundObject = obj;
        break;
      }
    }
    if (foundObject !== null) {
      if (updateType === 0) {
        yield put({
          type: actionTypes.SET_STREAMING_ID,
          payload: foundObject?.streamID,
        });
        yield put({ type: actionTypes.SET_LAYOUT, payload: 'LIVE_CALL' });
      } else if (updateType === 1) {
        yield put({
          type: actionTypes.SET_STREAMING_ID,
          payload: '',
        });
        yield put({ type: actionTypes.SET_LAYOUT, payload: 'LIVE' });
      }
    } else {
      console.log(
        'Object not found for key-value pair: ',
        searchKey,
        '=',
        searchValue,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* endLiveCall(actions) {
  try {
    const coHostData = yield select(state => state.live.coHostData)
    const liveID = yield select(state => state.live.liveID);

    ZegoExpressEngine.instance()
      .sendCustomCommand(
        liveID,
        JSON.stringify({ command: 'end_host' }),
        [{ userID: coHostData?.userID, userName: coHostData?.userName }],
      )
    yield put({ type: actionTypes.SET_EXIT_ALERT_VISIBLE, payload: false })
    yield put({ type: actionTypes.SET_CO_HOST_DATA, payload: null })
  } catch (e) {
    console.log(e)
  }
}

function* onLiveMuteUnmute(actions) {
  try {
    const coHostData = yield select(state => state.live.coHostData)
    const liveID = yield select(state => state.live.liveID);
    const isMute = yield select(state => state.live.isMute)

    ZegoExpressEngine.instance().mutePublishStreamAudio(!isMute)

    yield put({ type: actionTypes.SET_LIVE_IS_MUTE, payload: !isMute })

  } catch (e) {
    console.log(e)
  }
}

function* onAppStateChangeInLive(actions) {
  try {
    const {payload} = actions
    ZegoExpressEngine.instance().mutePublishStreamVideo(payload)

  } catch (e) {
    console.log(e)
  }
}

export default function* liveSaga() {
  yield takeLeading(actionTypes.INITIATE_LIVE_STREAMING, initateLiveStreaming);
  yield takeLeading(actionTypes.CREATE_LIVE_PROFILE, createLiveProfile);
  yield takeLeading(actionTypes.ADD_LIVE_LISTENER, addLiveListeners);
  yield takeLeading(actionTypes.SEND_COMMENTS, sendComments);
  yield takeLeading(actionTypes.REMOVE_HEART, removeHeart);
  yield takeLeading(actionTypes.ADD_HEART, addHeart);
  yield takeLeading( actionTypes.SEND_CALL_REQUEST_TO_USER, sendCallRequestToUser);
  yield takeLeading(actionTypes.ON_STREAM_UPDATE, onStreamUpdate);
  yield takeLeading(actionTypes.END_LIVE_CALL, endLiveCall);
  yield takeLeading(actionTypes.ON_LIVE_MUTE_UNMUTE, onLiveMuteUnmute);
  yield takeLeading(actionTypes.ON_APP_STATE_CHANGE_IN_LIVE, onAppStateChangeInLive);
}
