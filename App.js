import React,{useState} from 'react';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterSceen';
// import HomeScreenNew from './Screen/HomeScreenNew';
import StackScreen from './Screen/StackScreen';
import HomeScreen from './Screen/HomeScreen';
import BottomTabs from './Components/BottomTabs';
// import CreatePostScreen from './Screen/CreatePostScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import DatePicker from './Screen/Datepicker';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="login">
      
      <Stack.Screen options={{headerShown: false}} name="login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown: false,headerBackVisible:false}} name="tabs" component={BottomTabs}/>
      <Stack.Screen options={{headerShown: false}} name="register" component={RegisterScreen} />
      {/* <Stack.Screen options={{headerShown: false}} name="picker" component={DatePicker}/> */}
      {/* <Stack.Screen name="newHome" component={HomeScreenNew}/> */}
      {/* <Stack.Screen name="create" component={CreatePostScreen}/> */}
      {/* <Stack.Screen name="stack" component={StackScreen}/> */}
      {/* <Stack.Screen options={{headerShown: false}} name="home" component={HomeScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
)
  };
  export default App





  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      flexDirection:'column',
      // backgroundColor:'#69d7d3',
    },
  })



