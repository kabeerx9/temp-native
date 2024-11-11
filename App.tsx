import React from 'react';
import {AppNavigator} from './AppNavigator';
import {AuthProvider} from './src/context/auth-context';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
export default App;
