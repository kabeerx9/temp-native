import React, {useEffect} from 'react';
import {AppNavigator} from './AppNavigator';
import {AuthProvider} from './src/context/auth-context';
import {
  requestNotificationPermission,
  requestUserPermission,
} from './src/utils/NotificationService';

import {NavigationContainer} from '@react-navigation/native';

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

  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
export default App;
