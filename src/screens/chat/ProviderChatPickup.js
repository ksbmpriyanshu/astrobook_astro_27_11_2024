import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import {
  api_astrodetails,
  api_url,
  astrologer_dashboard,
  colors,
  fonts,
  update_intake_status,
} from '../../config/Constants';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import { useState } from 'react';
import * as ProviderActions from '../../redux/actions/ProviderActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ChatActions from '../../redux/actions/ChatActions'

var Sound = require('react-native-sound');
const { width, height } = Dimensions.get('screen');

let timout;

var whoosh = new Sound(require('../../assets/audio/incoming.mp3'), error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const ProviderChatPickup = ({
  navigation,
  route,
  dispatch,
  data
}) => {

  console.log(route?.params)

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    console.log(":::>>><<")
    whoosh.play();
    whoosh.setNumberOfLoops(-1);
    timout = setTimeout(() => {
      dispatch(ChatActions.onAcceptRejectChat({ status: 'reject', requestData: route?.params?.message }))
    }, 1000 * 10)
    return () => {
      clearTimeout(timout)
      whoosh.stop();
    };
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            // source={require('../../assets/friendsimage/astro_friend_logo.webp')}
            source={require('../../assets/images/AstroRemedy_logo.png')}
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
            onPress={() => dispatch(ChatActions.onAcceptRejectChat({ status: 'reject', requestData: route?.params?.message }))}>
            <Image
              source={require('../../assets/images/cross.png')}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: (width * 0.18) / 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(ChatActions.onAcceptRejectChat({ status: 'accept', requestData: route?.params?.message }))}>
            <Image
              source={require('../../assets/images/green_btn.png')}
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
            // source={require('../../assets/friendsimage/astro_friend_logo.webp')}
            source={require('../../assets/images/AstroRemedy_logo.png')}
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
    </View>
  );
};

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
  dashboard: state.provider.dashboard,
  requestData: state.provider.requestData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProviderChatPickup);
