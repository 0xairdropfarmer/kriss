import React from 'react';
import Navigators from './src/components/Navigator';
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return <Navigators />
}
