import React from 'react';
import Navigators from './src/components/Navigator';
import SplashScreen from 'react-native-splash-screen'
import { ThemeController } from './src/components/ThemeController';
import { NetworkController } from './src/components/NetworkController';
import { AdmobController } from './src/components/AdmobController';
import AsyncStorage from '@react-native-community/async-storage';
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
    initPoint()
  }, [])
  async function initPoint() {
    let initPoint = await AsyncStorage.getItem('yourcanreadfreepost');
    if (initPoint == null) {
      await AsyncStorage.setItem('yourcanreadfreepost', '1')
    }
  }
  return (
    <AdmobController>
      <NetworkController>
        <ThemeController>
          <Navigators />
        </ThemeController>
      </NetworkController>
    </AdmobController>
  )
}
