import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {useAuth} from './src/context/auth-context';
import LoginScreen from './src/screens/auth/login-screen';
import DetailsScreen from './src/screens/dashboard/detail-screen';
import HomeScreen from './src/screens/dashboard/home-screen';
import SplashScreen from './src/screens/loading/splash-screen';

const Stack = createNativeStackNavigator();

const SignOutButton = () => {
  const {signOut} = useAuth();

  return (
    <Button
      onPress={async () => {
        await signOut();
      }}
      title="Sign out"
    />
  );
};

export const AppNavigator = () => {
  const {isSignedIn, isLoading} = useAuth();

  // show a loading state while checking the auth status
  if (isLoading || isSignedIn === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: SignOutButton,
        }}>
        {!isSignedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
