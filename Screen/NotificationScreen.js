import React,{useState,useEffect,useRef} from 'react';
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
  Avatar,
  List,
  IconButton
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text,Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { windowHeight } from '../utils/Dimensions';
import { useStateValue } from '../State/StateProvider';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
// import Storage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const NotificationScreen = ({route, navigation }) => {
  // const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [{adminState,status, tenantState, nightMode, notificationState, createdByState}, dispatch] = useStateValue();
  let currentDate = new Date();

                // console.log('Created Id = ',createdByState);
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
          <Appbar.Content title="Elite Rent Notifier" />
          {/* <Appbar.Action
            icon={nightMode ? "brightness-7" : "brightness-3"}
            onPress={() => setNightmode(!nightMode)}
          /> */}
        </Appbar.Header>
        {/* <ScrollView> */}
        <Surface style={styles.containerStyle} > 
          <SafeAreaView style={styles.safeContainerStyle}>
            <View style={styles.notificationBody}>
              <Text style={nightMode ? styles.notificationText2 : styles.notificationText1}> {notificationState.length} Notification(s)</Text>
            </View>

            <Divider style={{marginTop:10, marginHorizontal:20, marginVertical: 5}}/>

            <View style={{marginTop:10}}>
          {notificationState.map((ten) =>(
            <View key={ten._id}>
            <List.Item
              title={`${ten.tenant} -- ${ten.location}`}
              description= {`Due Date: ${ten.dueDate} -- Notify: ${ten.notificationDate}`}
              // left={props => <List.Icon {...props} icon="folder" />}
              right={props => (
                <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                    <IconButton
                      icon="pen"
                      color={nightMode? 'grey' : '#e0b60e'}
                      size={26}
                      // onPress={()=> UpdateItem(ten)}
                    />
                    <IconButton
                      icon="delete"
                      color={nightMode? 'grey' : '#e0b60e'}
                      size={26}
                      // onPress={() => DeleteItem(ten._id)}
                    />
                </View>      
              )
            }
            />
            <Divider style={{marginHorizontal:10}}/>
            </View>
          )
          )}


            {/* Error Snack */}
    {/* {isDeleted ? <Snackbar
        visible={isDeleted}
        duration={1000}
        onDismiss={dismissIsDeleteBar}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}
        style={{backgroundColor:'green'}}
        >
        Deleted Successfully!!
      </Snackbar> : <Text></Text>
    }
           */}


        </View>
      </SafeAreaView>
      </Surface>
      {/* </ScrollView> */}
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
    marginTop: 20,
    marginBottom: 10
  },
  notificationText1: {
    fontSize: 18,
    color:'black',
    fontWeight:'bold'
  },
  notificationText2: {
    fontSize: 18,
    color:'#fff',
    fontWeight:'bold'
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
  





// Object {
//   "actionIdentifier": "expo.modules.notifications.actions.DEFAULT",
//   "notification": Object {
//     "date": 1647098268269,
//     "request": Object {
//       "content": Object {
//         "autoDismiss": true,
//         "badge": null,
//         "body": "Here is the notification body",
//         "data": Object {
//           "data": "goes here",
//         },
//         "sound": "default",
//         "sticky": false,
//         "subtitle": null,
//         "title": "You've got a rent alert! ????",
//       },
//       "identifier": "3c0c1d88-e9fc-4817-8aa8-97b2b1ed1bff",
//       "trigger": Object {
//         "channelId": null,
//         "repeats": false,
//         "seconds": 2,
//         "type": "timeInterval",
//       },
//     },
//   },
// }




