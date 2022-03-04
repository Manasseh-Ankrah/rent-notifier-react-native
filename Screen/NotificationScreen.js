import React,{useState} from 'react';
// import { Appbar, Avatar,TextInput,Button } from 'react-native-paper';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  TextInput,
  Divider,
  Button,
  Avatar
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { windowHeight } from '../utils/Dimensions';


const NotificationScreen = ({route, navigation }) => {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

    return (
      <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
          }
          barStyle={"light-content"}
        />
        <Appbar.Header >
          <Appbar.Content title="Elite Rentals App" />
          <Appbar.Action
            icon={nightMode ? "brightness-7" : "brightness-3"}
            onPress={() => setNightmode(!nightMode)}
          />
        </Appbar.Header>
        <ScrollView>
        <Surface style={styles.containerStyle} > 
          <SafeAreaView style={styles.safeContainerStyle}>
            <View style={styles.notificationBody}>
              <Text style={styles.notificationText}> 0 notifications</Text>
            </View>
      

      </SafeAreaView>
      </Surface>
      </ScrollView>
    </ThemeProvider>
  </Provider>
    );
  }

  export default NotificationScreen;

  
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: windowHeight
  },
  notificationBody: {
    // flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
  },
  notificationText: {
    fontSize: 18,
    color:'#fff'
  },
  // provider: {
  //   flex: 1,
  // },
  // headerView: {
  //   justifyContent:'center',
  //   alignItems:'center',
  //   marginTop: 15,
  //   marginBottom: 15,
  // },
  // headerText1: {
  //   fontSize: 20,
  //   color: '#111112',
  // },
  // headerContainer: {
  //   alignItems:'center',
  //   marginTop: 20,
  //   marginBottom: 20,
  // },
  // avatar: {
  //   backgroundColor:'white',
  //   marginBottom: 5,
  // },
  // text: {
  //   fontSize: 27,
  //   color:'#fff',
  // },
  // textInput: {
  //   marginHorizontal:20,
  //   marginBottom:10,
  //   borderTopLeftRadius:20,
  //   backgroundColor:'#fff'
  // },
  // btn: {
  //   justifyContent:'center',
  //   alignItems:'center',
  //   textAlign:'center',
  //   height:50,
  //   marginTop:15,
  //   marginHorizontal:40,
  //   // borderColor: 'yellow',
  //   // color:'red',
  //   borderTopLeftRadius:20,
  //   borderBottomRightRadius:20
  // },
  // btnText: {
  //   fontSize: 16,
  // },
  // link: {
  //   justifyContent:'center',
  //   alignItems:'center',
  //   textAlign:'center',
  //   marginTop:25,
  // },
  // linkText1: {
  //   fontSize: 15,
  //   color:'#fff',
  // },
  // linkText2: {
  //   fontSize: 17,
  //   color:'black',
  // },

});
  