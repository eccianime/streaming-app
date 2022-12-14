import React from 'react';
import { AppProvider } from './app';
import { AuthProvider } from './auth';
import { HomeProvider } from './home';
import { MyListProvider } from './myList';

const GlobalProvider: (props: { children: JSX.Element }) => JSX.Element = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <MyListProvider>
          <HomeProvider>{children}</HomeProvider>
        </MyListProvider>
      </AuthProvider>
    </AppProvider>
  );
};

export default GlobalProvider;
