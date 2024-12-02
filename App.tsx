import React, {useEffect} from 'react';
import {AppNavigator} from './AppNavigator';
import {AuthProvider} from './src/context/auth-context';
import {
  requestNotificationPermission,
  requestUserPermission,
} from './src/utils/NotificationService';

import notifee from '@notifee/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Linking} from 'react-native';

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: '',
      Detail: 'details',
      SignUp: 'signup',
      Login: 'login',
    },
  },
  async getInitialURL() {
    console.log('Inside getInitialURL');
    // Handle deep link from notifee notification
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      const deepLink = initialNotification.notification.data.screen;
      console.log('Deep Link:', deepLink);
      console.log('returning deepLink');
      return deepLink;
    }
    // Fallback to the default initial URL
    console.log('fallback to default initial URL');
    const url = await Linking.getInitialURL();
    return url;
  },
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();
    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
export default App;
