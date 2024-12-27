import notifee, {
  AndroidCategory,
  AndroidColor,
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidVisibility,
  EventType 
} from '@notifee/react-native';
import { Linking } from 'react-native';
// import { base_url } from '../config/constants';
// import * as NotificationActions from '../redux/actions/NotificationActions'
import { navigate, resetToScreen, navigation } from '../navigations/NavigationServices';
import * as SettingActions from '../redux/actions/SettingActions'

export const NotificationInitialize = async () => {
  await notifee.requestPermission();
};

export const cancel = async notificationId => {
  await notifee.cancelNotification(notificationId);
};

export const onNotification = async (message, dispatch, state = 'background') => {
  try {
    const { data } = message;
    const { type } = data;
    switch (type) {
      case 'chat_request': {
        await displayChatNotification(data);
        // if (state === 'foreground') {
        //   resetToScreen('chatRequest')}
        // } else if(state === 'background') {
        //   resetToScreen('chatRequest');
        // }
        break;
      }

      case 'call_request': {
        // dispatch(NotificationActions.getTotalAstroRequests(data?.astroID))
        // dispatch(NotificationActions.setAstroNewRequests('astroCalls'))
        // dispatch(NotificationActions.setAstroIsNewRequest(true))
        break;
      }

      case 'call_status': {
        dispatch(SettingActions.getProviderData())
        // dispatch(NotificationActions.getTotalAstroRequests(data?.astroID))
        // dispatch(NotificationActions.setAstroNewRequests('astroCalls'))
        // dispatch(NotificationActions.setAstroIsNewRequest(true))
        break;
      }

      default: {
        console.log('Breaking......')
        onDisplayNotification({
          data,
        });
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const onBackgroundNotification = async (message) => {
  try {
    const { data } = message;
    const { type } = data;
    switch (type) {
      case 'chat_request': {
        await displayChatNotification(data);
        break;
      }
      case 'call_request': {

        break;
      }
      default: {
        console.log('Breaking......')
        onDisplayNotification({
          data,
        });
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const createNotificationChannel = async (id, name, importance, sound, vibration = false, vibrationPattern = []) => {
  return await notifee.createChannel({
    id,
    name,
    importance,
    sound,
    vibration,
    vibrationPattern,
  });
};

export const onDisplayNotification = async ({ data }) => {
  try {
    await notifee.requestPermission();
    const { title, body } = data || {};
    const channelId = await createNotificationChannel('default', 'Default Channel', AndroidImportance.HIGH, 'ringtone_notify');

    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
        importance: AndroidImportance.HIGH,
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

export async function displayChatNotification(data) {
  try {
    const channelId = await notifee.createChannel({
      id: 'chat_request',
      name: 'Chat Request',
      sound: 'zego_incoming',
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.RED,
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
    })

    await notifee.displayNotification({
      title: data.title,
      body: data.body,
      data: data,
      android: {
        channelId: channelId,
        color: '#000000',
        smallIcon: 'ic_launcher', // Replace with your small icon name
        sound: 'zego_incoming',
        loopSound: true,
        timeoutAfter: 1000 * 30,
        autoCancel: false,
        vibrationPattern: [300, 500],
        lights: [AndroidColor.RED, 300, 600],
        ongoing: true,
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
          launchActivity: 'com.ksbm.astrobook_astro.FullScreenActivity',
        },
        // largeIcon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Favatar&psig=AOvVaw0dwmK3GzU3tNah8OjXMZ4y&ust=1718933316095000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjG896D6YYDFQAAAAAdAAAAABAE',
        actions: [
          {
            title: '<p style="color: #f44336;"><b>Reject</b></p>',
            icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'chat_reject',
            },
          },
          {
            title: '<p style="color: #2196F3;"><b>Accept</b></p>',
            icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'chat_accept',
            },
          }
        ],
        fullScreenAction: {
          id: 'default',
          launchActivity: 'com.ksbm.astrobook_astro.FullScreenActivity',
        },
      },
    });
  } catch (error) {
    console.log('Error displaying chat notification:', error);
  }
}

export const onCallRequestNotification = async ({ title, message, data }) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'call_request',
    name: 'Call Request',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: title,
    body: message,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      importance: AndroidImportance.HIGH,
      autoCancel: false,
      pressAction: {
        id: 'default',
      },
      actions: [
        {
          title: 'Cancel',
          icon: 'https://my-cdn.com/icons/snooze.png',
          pressAction: {
            id: 'snooze',         
          },
        },
        {
          title: 'Accept',
          icon: 'https://my-cdn.com/icons/snooze.png',
          pressAction: {
            id: 'default',
            launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            mainComponent: 'incoimingCall',
          },
        },
      ],
    },
  });
};

