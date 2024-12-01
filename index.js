/**
 * @format
 */

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';

// Register background handler.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.data) {
    const channelId = 'temp';

    // Create channel if it doesn't exist
    const channel = await notifee.getChannel(channelId);
    if (!channel) {
      await notifee.createChannel({
        id: channelId,
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    await notifee.displayNotification({
      title: 'notifee background : ' + remoteMessage.data.title,
      body: 'notifee' + remoteMessage.data.body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      data: {
        screen: remoteMessage.data?.screen,
        timestamp: Date.now().toString(), // Add timestamp to ensure unique handling
      },
    });
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Background event:', type, detail);
  if (type === EventType.PRESS) {
    const linkingScreen = detail.notification?.data?.screen;
    if (linkingScreen) {
      // Use a small delay to ensure app is ready
      console.log('linkingScreen', linkingScreen);
      Linking.openURL(linkingScreen);
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
