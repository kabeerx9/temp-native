import React, {useEffect} from 'react';
import {AppNavigator} from './AppNavigator';
import {AuthProvider} from './src/context/auth-context';
import {requestUserPermission} from './src/utils/NotificationService';

function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
export default App;
