/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/NavigationService';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './src/navigations/NavigationServices';

import RNFS from 'react-native-fs';
import Notifee, {
  EventType,
} from '@notifee/react-native';
import store from './src/redux/store';
import { onNotification } from './src/Notifications/NotificationManager';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
// import ChatRequest from './ChatRequest';
import { Linking } from 'react-native';
import axios from 'axios';
import ChatRequest from './ChatRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketServices from './src/utils/socket';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  onNotification(remoteMessage)
  // onNotifeeMessageReceived(remoteMessage);
});


const RNRedux = () => {
  return (
    <Provider store={store}>
      <App route={'default'} data={{ data: 1 }} />
    </Provider>
  );
};

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

AppRegistry.registerComponent(appName, () => RNRedux);

AppRegistry.registerComponent('custom', () => ChatRequest);


Notifee.onForegroundEvent(async ({ type, detail }) => {
  console.log(type)
  console.log(detail,'check data')
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_accept') {
    console.log("Accept")
    await Notifee.cancelNotification(detail.notification.id);
    Linking.openURL(`astroremedy-90cb0://chat/:${detail.notification.data.chatId}/:${detail.notification.data.historyId}`)
    await axios.post('https://api.astrobook.co.in/api/customers/accept_chat', { chatId: detail.notification.data.historyId, type: 'astrologer' })
    .then(response => console.log('API Response (accept_chat):', response.data))
    .catch(error => console.error('Error in API call (accept_chat):', error.response ? error.response.data : error.message));
    
    // await AsyncStorage.setItem('chatId', detail.notification.data.historyId);
    socketServices.emit('onAstroAccept', detail.notification.data.historyId)
    socketServices.emit('joinChatRoom', detail.notification.data.historyId)
    // yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: false });
    // yield put({ type: actionTypes.REJECT_CHAT_BY_ASTROLOGER, payload: { rejected: false, timer: 60 } });
    // SocketService.emit('startChatTimer', detail.notification.data.historyId) //? Started Chat Timer On Astrologer Chat Accept
   console.log('User pressed an action with the id: ', detail.pressAction.id);
   
  

  } else if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_reject') {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
    await Notifee.cancelNotification(detail.notification.id);
    await axios.post('https://api.astrobook.co.in/api/customers/reject_chat', { chatId: detail.notification.data.historyId, type: 'astrologer' })
    .then(response => console.log('API Response (reject_chat):', response.data))
    .catch(error => console.error('Error in API call (reject_chat):', error.response ? error.response.data : error.message));
    
    socketServices.emit('declinedChat', {roomID: detail.notification.data.historyId, actionBy: 'astro'});
  }
});

Notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
  console.log(detail.notification.data.historyId)
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_accept') {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
    await Notifee.cancelNotification(detail.notification.id);
    Linking.openURL(`astroremedy-90cb0://chat/:${detail.notification.data.chatId}/:${detail.notification.data.historyId}`)
    await axios.post('https://api.astrobook.co.in/api/customers/accept_chat', { chatId: detail.notification.data.historyId, type: 'astrologer' })


  }
});


Notifee.onForegroundEvent(({ type, detail }) => {
  console.log("detail?.notification?.data?.type", detail?.notification?.data?.type)
  if (detail?.notification?.data?.type == 'Redirect' && type === EventType.PRESS ) {  // Adjust based on event type
    console.log('asdfasdadf');
    navigate('Notifications');
  }
});

