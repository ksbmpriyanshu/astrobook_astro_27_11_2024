/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { GlobalContextProvider } from './src/config/context';
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  DeviceEventEmitter,
  Text,
  PermissionsAndroid,
  AppState, // Import AppState
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { api_url, astrologer_dashboard, colors } from './src/config/Constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Notifee, { EventType } from '@notifee/react-native';
import { connect, useDispatch } from 'react-redux';
import { setTopLevelNavigator } from './src/navigations/NavigationServices';
import MyLoader from './src/components/MyLoader';
import { PaperProvider } from 'react-native-paper';
import { onNotification } from './src/Notifications/NotificationManager';
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ProviderHome from './src/screens/home/ProviderHome';
import * as HistoryActions from './src/redux/actions/HistoryActions'

const App = ({ dispatch }) => {
  const { i18n } = useTranslation();
  const [appState, setAppState] = useState(AppState.currentState); // State to track app status

  // Load saved language on app startup
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };
    loadLanguage();
  }, []);

  // FCM message handling
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('Message handled!', remoteMessage);
      onNotification(remoteMessage, dispatch, 'foreground');
    });
  }, []);

  

  const isVisible = false;

  // Toast configuration
  const toastConfig = {
    success: props =>
      isVisible ? (
        <BaseToast
          text1NumberOfLines={1}
          text2NumberOfLines={2}
          style={{ borderLeftColor: colors.background_theme2 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{ fontSize: 14, fontWeight: '400' }}
          text2Style={{ fontSize: 12 }}
        />
      ) : null,
    error: props => (
      <ErrorToast
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        {...props}
        text1Style={{ fontSize: 14 }}
        text2Style={{ fontSize: 12 }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  // Request permissions on app start
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'App Permissions',
          message: 'The app needs access to certain features.',
        });
        if (Object.values(granted).every(value => value === PermissionsAndroid.RESULTS.GRANTED)) {
          console.log('All permissions granted');
        } else {
          console.log('Permission denied');
        }
      } else {
        Notifee.requestPermission();
      }
    }
    requestPermissions();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground.1111');
        markAstrologerOnline();
      } else if (nextAppState === 'background') {
        console.log('App has gone to the background.');
        markAstrologerOffline();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const markAstrologerOnline = async () => {
    dispatch(HistoryActions.getOnlineData());
  }
    
  const markAstrologerOffline =()=>{
    dispatch(HistoryActions.getOfflineData());
  }
  


  const linking = {
    prefixes: ['astroremedy-90cb0://'],
    config: {
      screens: {
        providerChat: {
          path: 'chat/:chatId/:historyId',
          parse: { chatId: chatId => `chat-${chatId}` },
          stringify: { chatId: chatId => chatId.replace(/^chat-/, '') },
        },
      },
    },
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GlobalContextProvider>
              <NavigationContainer ref={c => setTopLevelNavigator(c)} linking={linking} fallback={<Text>...Loading</Text>}>
                <ZegoCallInvitationDialog />
                <StackNavigator data={null} data1={null} />
              </NavigationContainer>
              <Toast config={toastConfig} />
              <MyLoader />
            </GlobalContextProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaView>
    </PaperProvider>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(App);
