import React from 'react';
import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { HomeProvider } from './home';

const GlobalProvider: (props: { children: JSX.Element }) => JSX.Element = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <HomeProvider>{children}</HomeProvider>
      </AuthProvider>
    </AppProvider>
  );
};

export default GlobalProvider;
