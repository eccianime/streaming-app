import { Urbanist_300Light, Urbanist_400Regular, Urbanist_600SemiBold, Urbanist_700Bold, Urbanist_800ExtraBold } from '@expo-google-fonts/urbanist';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from './src/components/Loading';
import { THEME } from './src/config/theme';
import Routes from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  async function _loadAssetsAsync() {
    await Font.loadAsync({
      Urbanist_300Light, Urbanist_400Regular, Urbanist_600SemiBold, Urbanist_700Bold, Urbanist_800ExtraBold
    });
    setAppReady(true);
  }
  
  useEffect(() => {
    _loadAssetsAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      {
        isAppReady ?
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <StatusBar translucent barStyle='dark-content' />
            <Routes />
        </View>
      : <Loading />
      }
      </NativeBaseProvider>
  );
}