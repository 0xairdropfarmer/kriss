import React, {useContext, useEffect} from 'react';
import {ThemeContext} from './ThemeController';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import CategorieScreen from '../screens/Categories';
import SettingScreen from '../screens/Setting';
import BookMarkScreen from '../screens/Bookmark';
import SinglePost from '../screens/SinglePost';
import CategorieList from '../screens/CategorieList';
import Feedback from '../screens/Feedback';
import RemoveAds from '../screens/RemoveAds';
import {IApContext} from './IApController';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}
function BookMarkStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="RemoveAds" component={RemoveAds} />
    </Stack.Navigator>
  );
}
function CategorieStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorie" component={CategorieScreen} />
      <Stack.Screen name="CategorieList" component={CategorieList} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}
export default (Navigator = () => {
  const {theme} = useContext(ThemeContext);
  let paper_theme = theme ? PaperDarkTheme : PaperDefaultTheme;
  let nav_theme = theme ? DarkTheme : DefaultTheme;
  const {initIAp, checkValidPurchase, products} = useContext(IApContext);
  useEffect(() => {
    initIAp();
    checkValidPurchase();
    console.log(products);
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <PaperProvider theme={paper_theme}>
      <NavigationContainer theme={nav_theme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Bookmark') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'apps' : 'apps-box';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-box';
              }
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Categories" component={CategorieStack} />
          <Tab.Screen name="Bookmark" component={BookMarkStack} />
          <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
});
