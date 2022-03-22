import React,{useState,useEffect} from 'react';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterSceen';
// import HomeScreenNew from './Screen/HomeScreenNew';
import StackScreen from './Screen/StackScreen';
import HomeScreen from './Screen/HomeScreen';
import BottomTabs from './Components/BottomTabs';
// import CreatePostScreen from './Screen/CreatePostScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet,ImageBackground,LogBox } from 'react-native';
import DatePicker from './Screen/Datepicker';
import StateProvider from "./State/StateProvider";
import reducer, { initialState } from "./State/reducer";
import { ActivityIndicator } from 'react-native-paper';
import EditRentScreen from './Screen/EditRentScreen'
import PushNotification from './Screen/push-notification'
import PreviousScreen from './Screen/PreviousScreen';

// LogBox.ignoreLogs


const Stack = createNativeStackNavigator();




const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    }, [])

  if (isLoading) {
    return(
    <View style={{flex:1}}>
      <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1,justifyContent:'center'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('./assets/images/bg2.jpg')}
        >
          <ActivityIndicator animating={true} color="#fff" size={60} />    
      </ImageBackground>
    </View>
    )
  }


  return(
    <StateProvider reducer={reducer} initialState={initialState}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="login">
      {/* <Stack.Screen options={{headerShown: false}} name="push" component={PushNotification}/> */}
      <Stack.Screen options={{headerShown: false}} name="login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown: false,headerBackVisible:false}} name="tabs" component={BottomTabs}/>
      <Stack.Screen options={{headerShown: false}} name="register" component={RegisterScreen} />
      <Stack.Screen options={{headerShown: false}} name="editRent" component={EditRentScreen} />
      <Stack.Screen options={{headerShown: false}} name="previous" component={PreviousScreen} />







      {/* Not Included */}
      {/* <Stack.Screen options={{headerShown: false}} name="picker" component={DatePicker}/> */}
      {/* <Stack.Screen name="newHome" component={HomeScreenNew}/> */}
      {/* <Stack.Screen name="create" component={CreatePostScreen}/> */}
      {/* <Stack.Screen name="stack" component={StackScreen}/> */}
      {/* <Stack.Screen options={{headerShown: false}} name="home" component={HomeScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  </StateProvider>
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



