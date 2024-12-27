import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import * as ChatActions from '../../redux/actions/ChatActions'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import Timer from './components/Timer'
import ChatDetails from './components/ChatDetails'
import Modal from 'react-native-modal'
import * as SettingActions from '../../redux/actions/SettingActions'
import { imagePicker } from '../../utils/services'
import { base_url, colors, fonts, getFontSize, img_url } from '../../config/Constants'
import { actions } from '../../config/data'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProviderChat = ({ navigation, route, dispatch, imagePickerVisible, requestedData }) => {
  useEffect(() => {
    if (route?.params) {
      dispatch(ChatActions.onInitiateChat({ historyId: route.params.historyId.replace(/^:/, ''), dispatch }))
    }
  }, [dispatch])

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to end this Chat?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => dispatch(ChatActions.onEndChat()) },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EDF2F5',
      }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      {/* <Loader visible={isLoading} /> */}
      <View style={{ flex: 1 }}>
        {header()}
        <Timer requestedData={requestedData} />
        <ChatDetails />
      </View>
      {imagePickerInfo()}
    </View>
  );

  function imagePickerInfo() {
    const onImagePicker = async (type) => {
      const response = await imagePicker({ type })
      if (response) {
        dispatch(ChatActions.setChatImageData(response[0]?.uri))
        dispatch(SettingActions.setImagePickerVisible(false))
      }
    }
    return (
      <Modal
        isVisible={imagePickerVisible}
        useNativeDriver={true}
        style={{ padding: 0, margin: 0 }}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => dispatch(SettingActions.setImagePickerVisible(false))}>
        <View
          style={{
            flex: 0,
            width: '100%',
            backgroundColor: colors.background_theme1,
            padding: 20,
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onImagePicker(item?.type)}
                style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={item.title == 'Camera' ? 'camera' : 'image'}
                  size={25}
                  color={colors.black_color}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: colors.background_theme2,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    )
  }

  function header() {
    const end_chat = async () => {
      Alert.alert('Hold on!', 'Do you want to end this Chat?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => dispatch(ChatActions.onEndChat()),
        },
      ]);
    };
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: 5,
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.new_color,
        }}>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{ paddingVertical: Sizes.fixPadding, marginRight: 10 }}>
          <Ionicons
            name="arrow-back"
            color={colors.white_color}
            size={getFontSize(2.5)}
          />
        </TouchableOpacity> */}
        <View

          style={{
            backgroundColor: Colors.white,
            borderRadius: 50, 
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
            overflow: 'hidden',
            marginLeft: 10
          }}>
          <Image
            source={{ uri: img_url + requestedData?.customerImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </View>
        <Text numberOfLines={1}
          style={{
            ...Fonts.white14RobotoMedium,
            marginLeft: Sizes.fixPadding,
            textAlignVertical: 'center',
          }}>
          {requestedData?.customerName}
        </Text>
        <View
          style={{
            flexGrow: 1,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => end_chat()}
            style={{
              paddingHorizontal: Sizes.fixPadding * 1.5,
              paddingVertical: Sizes.fixPadding * 0.3,
              marginLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.red,
              borderRadius: 50,
            }}>
            <Text
              style={{
                ...Fonts.white16RobotoMedium,
              }}>
              End Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatData: state.chat.chatData,
  providerData: state.provider.providerData,
  imagePickerVisible: state.setting.imagePickerVisible,
  requestedData: state.chat.requestedData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ProviderChat)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    elevation: 8,
  },
})