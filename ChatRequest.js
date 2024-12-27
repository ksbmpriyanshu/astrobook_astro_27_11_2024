import { View, Text, Image, Dimensions, TouchableOpacity, BackHandler, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from './src/components/MyStatusbar'
import { colors, fonts } from './src/config/Constants'
import MyLoader from './src/components/MyLoader'
import notifee from '@notifee/react-native';
import axios from 'axios'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('screen');

const ChatRequest = () => {
  const [notificationData, setNotificationData] = useState(null)
  let timeout;
  useEffect(() => {
    getNotificationData()
    timeout = setTimeout(async () => {
      BackHandler.exitApp()
      await notifee.cancelDisplayedNotification()
    }, 30 * 1000)
    return () => clearTimeout(timeout)
  }, [])

  const getNotificationData = async () => {
    try {
      const notification = await notifee.getDisplayedNotifications()
      if (notification) {
        notification.forEach(ele=>{
          if(ele?.notification?.data?.type === 'chat_request'){
            setNotificationData(ele)
            return;
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onAccept = async () => {
    try {
      await notifee.cancelNotification(notificationData?.notification?.id);
      console.log('test :::',{chatId: notificationData?.notification?.data?.historyId, type: 'astrologer'});
      await axios.post('https://api.astrobook.co.in/api/customers/accept_chat', { chatId: notificationData?.notification?.data?.historyId, type: 'astrologer' })
      BackHandler.exitApp()
      Linking.openURL(`astroremedy-90cb0://chat/:${notificationData?.notification?.data?.chatId}/:${notificationData?.notification?.data?.historyId}`)
    } catch (e) {
      console.log(e)
    }
  }

  const onReject = async () => {
    try {
      await notifee.cancelNotification(notificationData?.notification?.id);
      await axios.post('https://api.astrobook.co.in/api/customers/reject_chat', { chatId: notificationData?.notification?.data?.historyId, type: 'astrologer' })
      BackHandler.exitApp()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={colors.new_color}
        barStyle="light-content"
      />
      <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            // source={require('../../assets/friendsimage/astro_friend_logo.webp')}
            source={require('./src/assets/images/newlogo.png')}
            style={{
              width: width * 0.25,
              height: width * 0.25,
              borderRadius: (width * 0.25) / 2,
            }}
          />
        </View>
        <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.black_color,
              fontFamily: fonts.bold,
              textAlign: 'center',
              position: 'relative',
              bottom: 0,
            }}>
            Please accept the chat request
          </Text>
        </View>

        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => onReject()}>
            <Image
              source={require('./src/assets/images/cross.png')}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: (width * 0.18) / 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAccept()}>
            <Image
              source={require('./src/assets/images/green_btn.png')}
              style={{
                width: width * 0.2,
                height: width * 0.2,
                borderRadius: (width * 0.2) / 2,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./src/assets/images/newlogo.png')}
            style={{
              width: width * 0.12,
              height: width * 0.12,
              borderRadius: (width * 0.12) / 2,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 22,
              color: colors.black_color,
              fontFamily: fonts.bold,
              textAlign: 'center',
            }}>
            AstroRemedy 
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default ChatRequest