/**
 * @format
 */

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';

// Register background handler.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  if (remoteMessage.data) {
    await notifee.displayNotification({
      title: 'notifee background : ' + remoteMessage.data.title,
      body: 'notifee' + remoteMessage.data.body,
      android: {
        channelId: 'temp',
        importance: AndroidImportance.HIGH,
      },
    });
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Notifee background event:', {type, detail});

  if (type === EventType.ACTION_PRESS) {
    console.log('Notification action pressed:', detail);
    const {pressAction} = detail;

    // Example: Handle action button press
    if (pressAction.id === 'default') {
      console.log('Notification action pressed:', pressAction);
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
