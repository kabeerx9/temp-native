import notifee, {AndroidImportance} from '@notifee/react-native';
import React, {useEffect} from 'react';
import {AppNavigator} from './AppNavigator';
import {AuthProvider} from './src/context/auth-context';
import {
  requestNotificationPermission,
  requestUserPermission,
} from './src/utils/NotificationService';

import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      await notifee.createChannel({
        id: 'temp',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: 'notifee ' + remoteMessage.data?.title,
        body: 'notifee ' + remoteMessage.data?.body,
        android: {
          channelId: 'temp',
          importance: AndroidImportance.HIGH,
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      console.log(type, detail);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
export default App;
