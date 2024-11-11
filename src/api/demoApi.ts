// import {authService} from '../services/auth-service';

// Simulate API responses
let validToken = false;
let apiCallCount = 0;

// Mock async storage
const mockStorage = {
  token: 'dummy-token',
  refreshToken: 'dummy-refresh-token',
};

// Demo API functions
export const demoApi = {
  // Simulates a protected API call
  fetchProtectedData: async () => {
    console.log('🔍 Attempting to fetch protected data...');

    apiCallCount++;

    // Simulate token expiration after 2 calls
    if (apiCallCount > 2) {
      validToken = false;
    }

    // Simulate 401 error if token is invalid
    if (!validToken) {
      console.log('❌ Token invalid, trying refresh...');

      try {
        await demoApi.refreshToken();
        console.log('✅ Token refreshed, retrying original request...');
        return {data: 'Protected data retrieved after refresh!'};
      } catch (error) {
        console.log('❌ Refresh failed, logging out...');
        // await authService.signOut();
        console.log('SIGN OUT DONE');
        throw new Error('Auth failed');
      }
    }

    return {data: 'Protected data retrieved!'};
  },

  // Simulates refresh token request
  refreshToken: async () => {
    console.log('🔄 Attempting token refresh...');

    // Simulate refresh token expiration after 3 calls
    if (apiCallCount > 3) {
      console.log('❌ Refresh token expired!');
      throw new Error('Refresh token expired');
    }

    validToken = true;
    mockStorage.token = 'new-dummy-token';
    return {newToken: 'new-dummy-token'};
  },
};
