import * as React from 'react';
import { View, Text, Button } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import HomeScreen from '../Screens/HomeScreen';
import TransScreen from '../Screens/TransScreen';
import Location from '../Screens/LocationScreen';
import Settings from '../Screens/Settings';
import CustomDrawer from '../Component/CustomDrawer';


const Drawer = createDrawerNavigator();

function AppStack() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}

      screenOptions={{
        drawerActiveBackgroundColor:"#aa18ea",
        drawerActiveTintColor:"#fff",
        drawerInactiveTintColor:"#333",
        drawerLabelStyle:{
          marginLeft:-10,
          fontFamily:"Roboto-Medium",
          fontSize:15
      }}
    }
    >
      <Drawer.Screen name="Home" component={HomeScreen} 
      options={{
        title: 'Home',
        drawerIcon: ({focused, size}) => (
           <Ionicons
              name="home-outline"
              size={size}
              color={focused ? '#fff' : '#7cc'}
           />
        ),
     }}
      
      />
      <Drawer.Screen name="Transaction" component={TransScreen} 
            options={{
              title: 'Transactions',
              drawerIcon: ({focused, size}) => (
                 <Ionicons
                    name="paper-plane-outline"
                    size={size}
                    color={focused ? '#fff' : '#7cc'}
                 />
              ),
           }}
           />
      <Drawer.Screen name="Location" component={Location}
        options={{
        title: 'Location',
        drawerIcon: ({focused, size}) => (
           <Ionicons
              name="location-outline"
              size={size}
              color={focused ? '#fff' : '#7cc'}
           />
        ),
     }}/>
      <Drawer.Screen name="Settings" component={Settings} 
       options={{
        title: 'Settings',
        drawerIcon: ({focused, size}) => (
           <Ionicons
              name="settings-outline"
              size={size}
              color={focused ? '#fff' : '#7cc'}
           />
        ),
     }}/>
    </Drawer.Navigator>
  );
}

export default AppStack;

