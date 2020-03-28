/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React, { useEffect } from 'react';
import { name as appName } from './app.json';
 console.disableYellowBox = true;
import SplashScreen from 'react-native-splash-screen'
const Apps = () => {
    useEffect(() => {
        SplashScreen.hide();
    })
    return <App />
}
AppRegistry.registerComponent(appName, () => Apps);
