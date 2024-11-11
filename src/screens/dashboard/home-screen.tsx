import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.content}>
        In this app, we're building an authentication flow using custom hooks,
        React Navigation, and the Native Stack Navigator. This helps us create a
        seamless login experience for users, complete with navigation to
        protected screens.
      </Text>

      <Text style={styles.content}>
        We're also covering how to structure authentication logic with a custom
        hook, so our code remains organized and reusable.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detail')}>
        <Text style={styles.buttonText}>Go to Detail Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  button: {
    height: 48,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
