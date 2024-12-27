import ZegoUIKitPrebuiltCallService, {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
  ZegoMenuBarButtonName
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { zego_call_app_id, zego_call_app_sign } from '../config/Constants';
import * as ChatActions from '../redux/actions/ChatActions'
import { Alert } from 'react-native';
import { navigate } from '../navigations/NavigationServices';



export const registerZegoCall = async ({userId, userName, dispatch}) => {
  try {
    return ZegoUIKitPrebuiltCallService.init(
      zego_call_app_id, // You can get it from ZEGOCLOUD's console
      zego_call_app_sign, // You can get it from ZEGOCLOUD's console
      userId,
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        requireConfig: data => {
          const callConfig =
            data.invitees.length > 1
              ? ZegoInvitationType.videoCall === data.type
                ? GROUP_VIDEO_CALL_CONFIG
                : GROUP_VOICE_CALL_CONFIG
              : ZegoInvitationType.videoCall === data.type
              ? ONE_ON_ONE_VIDEO_CALL_CONFIG
              : ONE_ON_ONE_VOICE_CALL_CONFIG;
              return { callConfig, 
                topMenuBarConfig: {
                  buttons: [
                      ZegoMenuBarButtonName.minimizingButton,
                  ],
              },
              onWindowMinimized: () => {
                navigate('providerHome')

            },
            onWindowMaximized: () => {
                // Navigate to the ZegoUIKitPrebuiltCallInCallScreen, but be sure to cannot include any parameters of the page.
                navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
                onHangUpConfirmation: () => {
                  return new Promise((resolve, reject) => {
                      Alert.alert(
                          "Are You Sure ?",
                          "You want to end this Video Call ",
                          [
                              {
                                  text: "Cancel",
                                  onPress: () => reject(),
                                  style: "cancel"
                              },
                              {
                                  text: "Yes",
                                  onPress: () => {resolve(),
                                    console.log('Resolve ::::',data)
                                    dispatch(ChatActions.onVideoCallEnd(data))
                                    },
                              }
                          ]
                      );
                  })
              }
              };
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        isIOSSandboxEnvironment: true,
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    );
  } catch (e) {
    console.log(e);
  }
};

export const unRegisterZegoCall = async () => {
  return ZegoUIKitPrebuiltCallService.uninit()
}
