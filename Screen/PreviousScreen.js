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
  IconButton,
  Snackbar
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text,Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { windowHeight } from '../utils/Dimensions';
import { useStateValue } from '../State/StateProvider';
import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
import axios from '../axios';
// import Storage from '@react-native-async-storage/async-storage';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });


const PreviousScreen = ({route, navigation }) => {
  // const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [{adminState,status, tenantState, nightMode, notificationState, previousState, createdByState}, dispatch] = useStateValue();
  let currentDate = new Date();


  useEffect(() => {
// Get all previous notification from the database
const getAllPrevious = async () => {
  const fetchPrevious = await axios.get(`/previous/${createdByState}`).then((res)=> {
    console.log("Previous Screen",res.data);

    if (res.data === []) {
      console.log("previous returned ==",res.data);

      dispatch({
        type: "GET_PREVIOUS_DATA",
        item: {
          previousState: false,
        },
      });
        
      } else {
        dispatch({
          type: "GET_PREVIOUS_DATA",
          item: {
            previousState: res.data,
          },
        });
      }
  }).catch((err)=> {
    console.log(err)
  });
};

      getAllPrevious();
  }, [])

      //Error Snack bar 
      const [isDeleted, setIsDeleted] = useState(false);
      const toggleIsDeleteSnackBar = () => {
        setIsDeleted(!isDeleted);
      };
      const dismissIsDeleteBar = () => setIsDeleted(false);


          // Deleteing Tenants from the frontend 
          const onDeletePreviousNotification = (id) => {
            dispatch({
              type: "GET_PREVIOUS_DATA",
              item: {
                previousState: previousState?.filter((tenant) => tenant._id !== id),
              },
            });
          };
      
            // function responsible for DELETE request
        const DeleteItem = (id) => {
          console.log(id);
         const delFunction = axios.delete(`/previous/${id}`).then((res)=> {
          onDeletePreviousNotification(id);
          toggleIsDeleteSnackBar();
  
          }).catch(()=> {
           alert("Delete Unsuccessful");
         })
        };

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
        <Appbar.Action
          style={styles.icon}
          size={35}
          icon={"chevron-left"}
          onPress={() => navigation.navigate("Home")}
        />
          {/* <Appbar.Action
            icon={nightMode ? "brightness-7" : "brightness-3"}
            onPress={() => setNightmode(!nightMode)}
          /> */}
        </Appbar.Header>
        {/* <ScrollView> */}
        <Surface style={styles.containerStyle} > 
        <ScrollView>
          <SafeAreaView style={styles.safeContainerStyle}>
            <View style={styles.notificationBody}>
              <Text style={nightMode ? styles.notificationText2 : styles.notificationText1}> Previous Notifications</Text>
            </View>

            <Divider style={{marginTop:10, marginHorizontal:20, marginVertical: 5}}/>

            <View style={{marginTop:10}}>
          {previousState.map((ten) =>(
            <View key={ten._id}>
            <List.Item
              title={`${ten.tenant} -- ${ten.location}`}
              description= {`Due Date: ${ten.dueDate} -- Date: ${ten.notificationDate}`}
              // left={props => <List.Icon {...props} icon="folder" />}
              right={props => (
                <View style={{ flexDirection:'row',justifyContent:'flex-end'}}>
                    {/* <IconButton
                      icon="pen"
                      color={nightMode? 'grey' : '#e0b60e'}
                      size={26}
                      // onPress={()=> UpdateItem(ten)}
                    /> */}
                    <IconButton
                      icon="delete"
                      color={nightMode? 'grey' : '#e0b60e'}
                      size={26}
                      onPress={() => DeleteItem(ten._id)}                    />
                </View>      
              )
            }
            />
            <Divider style={{marginHorizontal:10}}/>
            </View>
          )
          )}
          


          {isDeleted ? <Snackbar
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


        </View>
      </SafeAreaView>
      </ScrollView>
      </Surface>
      {/* </ScrollView> */}
    </ThemeProvider>
  </Provider>
    );
  }

  export default PreviousScreen;

  
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
});
  




