import React, {createContext, useContext, useEffect, useState} from 'react';
import {authService} from '../service/auth-service';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkAuthStatus = async () => {
    try {
      // simulating a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(Math.random() < 0.5);
    } catch (error) {
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // we need to attach a listener to the auth service
    authService.setSignOutHandler(async () => {
      await signOut();
    });

    checkAuthStatus();
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    try {
      // simulate a API CALL
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(true);
    } catch (error) {
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      setIsSignedIn(false);
    } catch (error) {
      console.log('Something went wrong while signing out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{isLoading, isSignedIn, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
