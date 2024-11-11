import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {demoApi} from '../../api/demoApi';

const DetailsScreen = ({navigation}: any) => {
  const [fetchStatus, setFetchStatus] = useState<{
    loading: boolean;
    data?: string;
    error?: string;
  }>({
    loading: false,
  });

  const handleFetchProtectedData = async () => {
    setFetchStatus({loading: true});
    try {
      const response = await demoApi.fetchProtectedData();
      setFetchStatus({
        loading: false,
        data: response.data,
      });
    } catch (error) {
      setFetchStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Details</Text>
          <Text style={styles.content}>
            Here, we're taking a closer look at how our custom authentication
            hook works with React Navigation. By setting up this flow, we're
            able to control access to different screens based on the user's
            authentication status.
          </Text>
          <Text style={styles.content}>
            Our Native Stack Navigator allows us to manage screen transitions,
            providing a native-like feel as users navigate between screens. This
            setup can be expanded to handle multiple authentication states, like
            logging in, signing up, and password reset.
          </Text>

          {/* Protected Data Fetch Section */}
          <View style={styles.fetchSection}>
            <TouchableOpacity
              style={[styles.button, styles.fetchButton]}
              onPress={handleFetchProtectedData}
              disabled={fetchStatus.loading}>
              {fetchStatus.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Fetch Protected Data</Text>
              )}
            </TouchableOpacity>

            {fetchStatus.data && (
              <View style={styles.responseCard}>
                <Text style={styles.responseTitle}>Response:</Text>
                <Text style={styles.responseText}>{fetchStatus.data}</Text>
              </View>
            )}

            {fetchStatus.error && (
              <View style={[styles.responseCard, styles.errorCard]}>
                <Text style={styles.responseTitle}>Error:</Text>
                <Text style={[styles.responseText, styles.errorText]}>
                  {fetchStatus.error}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24, // Extra padding at bottom for better scrolling
  },
  container: {
    flex: 1,
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
  fetchSection: {
    marginVertical: 20,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  fetchButton: {
    backgroundColor: '#28a745',
  },
  backButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  responseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorCard: {
    backgroundColor: '#fff5f5',
  },
  responseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#dc3545',
  },
});

export default DetailsScreen;
