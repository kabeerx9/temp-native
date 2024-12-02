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
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const intialNotification = await notifee.getInitialNotification();
      console.log('Initial Notification:', intialNotification);
      const deepLink = intialNotification?.notification.data.screen;
      console.log('Deep Link:', deepLink);
      Linking.openURL(deepLink);
    };

    bootstrap();
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
