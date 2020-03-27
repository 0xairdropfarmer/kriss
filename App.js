import React from 'react';
import Navigators from './src/components/Navigator';
import SplashScreen from 'react-native-splash-screen'
import { ThemeController } from './src/components/ThemeController';
import { NetworkController } from './src/components/NetworkController';
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NetworkController>
      <ThemeController>
        <Navigators />
      </ThemeController>
    </NetworkController>
  )
}
