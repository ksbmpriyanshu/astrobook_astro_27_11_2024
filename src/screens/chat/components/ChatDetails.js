import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import * as ChatActions from '../../../redux/actions/ChatActions'
import { Colors, Fonts, Sizes } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as SettingActions from '../../../redux/actions/SettingActions'
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { colors } from '../../../config/Constants';

const ChatDetails = ({ dispatch, chatData, providerData, chatImageData }) => {
  const onSend = useCallback((messages = []) => {
    let msg = {
      ...messages[0],
      sent: false,
    };
    if (chatImageData) {
      const image = chatImageData
      msg = {
        ...msg,
        image: image
      }
      dispatch(ChatActions.setChatImageData(null))
      dispatch(ChatActions.saveChatMessage(msg))
      dispatch(ChatActions.onChatImageSend({ uri: image, message: msg }))
    } else if (msg.text.length == 0) {

    } else {
      dispatch(ChatActions.saveChatMessage(msg))
      dispatch(ChatActions.sendChatMessage(msg))
    }
  }, [chatImageData]);

  const customOnPress = (text, onSend) => {
    const regex = /\d{4,}/;
    if(regex.test(text)){
      return
    }
    onSend({ text: text.trim() }, true);
    if (text && onSend) {
    }
  };

  return (
    <GiftedChat
      messages={chatData}
      onSend={messages => onSend(messages)}
      user={{
        _id: `astro_${providerData?._id}`,
        name: providerData?.astrologerName,
      }}
      placeholder="Type your message"
      alwaysShowSend
      textInputProps={{style: {...Fonts.black14InterMedium, flex: 1}, placeholderTextColor: Colors.gray}}
      renderActions={() => <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', paddingHorizontal: Sizes.fixPadding }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(SettingActions.setImagePickerVisible(true))}>
        <Ionicons name='image' color={colors.background_theme2} size={24} />
      </TouchableOpacity>
    </View>}
      renderChatFooter={() =>
        chatImageData && (
          <View
            style={{
              height: SCREEN_HEIGHT * 0.4,
              backgroundColor: colors.background_theme2,
              borderTopRightRadius: 10 * 2,
              borderTopLeftRadius: 10 * 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{ uri: chatImageData }}
              style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(ChatActions.setChatImageData(false))} style={{ position: 'absolute', zIndex: 99, right: 10, top: 10 }}>
              <Ionicons name='close' color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        )
      }
      renderBubble={props => {
        const { currentMessage } = props;
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: colors.background_theme2,
              },
              left: {
                backgroundColor: Colors.gray4,
              },
            }}
            textStyle={{ right: { color: Colors.white, fontSize: 12 }, left: { color: colors.background_theme2, fontSize: 12 } }}
          />
        );
      }}
      renderSend={({ onSend, text, sendButtonProps, ...props }) => {
        return (
          <Send
            containerStyle={{ justifyContent: 'center' }}
            {...props}
            sendButtonProps={{
              ...sendButtonProps,
              onPress: () => customOnPress(text, onSend),
            }}>
            <View
              style={{
                borderRadius: 1000,
                backgroundColor: colors.background_theme2,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginRight: 10
              }}>
              <Ionicons name="send" color={Colors.white} size={15} />
            </View>
          </Send>
        )
      }}
    />
  )
}

const mapStateToProps = state => ({
  chatData: state.chat.chatData,
  providerData: state.provider.providerData,
  chatImageData: state.chat.chatImageData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)