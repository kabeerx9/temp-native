import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {useAuth} from './src/context/auth-context';
import LoginScreen from './src/screens/auth/login-screen';
import DetailsScreen from './src/screens/dashboard/detail-screen';
import HomeScreen from './src/screens/dashboard/home-screen';
import SplashScreen from './src/screens/loading/splash-screen';

const Stack = createNativeStackNavigator();

const SignUpScreen = () => {
  return (
    <SafeAreaView>
      <Text>Sign up screen</Text>
    </SafeAreaView>
  );
};

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
  const navigation = useNavigation();
  const {isSignedIn, isLoading} = useAuth();

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
          pressAction: {
            id: 'default',
          },
        },
        data: {
          screen: remoteMessage.data?.screen || '',
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          const screenName = detail?.notification?.data?.screen;

          if (!isSignedIn) {
            navigation.navigate('SignUp');
            return;
          }

          if (isSignedIn && screenName === 'Detail') {
            navigation.navigate('Detail');
          }
          break;
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
      }
    });

    return unsubscribe;
  }, [isSignedIn]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: SignOutButton,
      }}>
      {!isSignedIn ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen 
            name="Detail" 
            component={DetailsScreen}
            options={{
              headerShown: true,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
