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
  Snackbar,
  ActivityIndicator
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text,Platform} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/Dimensions';
import { useStateValue } from '../State/StateProvider';
import axios from "../axios";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const HomeScreen = ({route, navigation }) => {
  // const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{adminState,status, tenantState, nightMode, notificationState, previousState,createdByState}, dispatch] = useStateValue();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let currentDate = new Date();



  // Fetch Tenants from the databasse
  const getAllTenants = async () => {
    // {"6228c4c53e1a11f6ba4f50b4"}
    const fetchTenants = await axios.get(`/tenant/${createdByState}`).then((res)=> {
      // console.log("LoginScreen",res.data);
      // console.log("LoginScreen",res.data);

      if (res.data === []) {
      // console.log("res.data returned ==",res.data);

      dispatch({
        type: "GET_TENANT_DATA",
        item: {
            tenantState: false,
        },
      });
        
      } else {
        dispatch({
          type: "GET_TENANT_DATA",
          item: {
            tenantState: res.data,
          },
        });
      }
    }).catch((err)=> {
      console.log(err)
    });
  };




  const onSubmit = async (newTenant) => {
        const addToPrevious = await axios.post('/previous/register',newTenant )
        .then((res)=> {
          console.log(res.data);
          const result = res.data;
        })
        .catch((err)=> {
          alert(err)
        });
  };
  
  useEffect(() => {
    getAllTenants();

    // console.log('Tenant state ==',tenantState);

    // Notification Logic
    async function getPermission() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          // await Storage.setItem('expo-push-token','')
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // await Storage.setItem('expo-push-token',token)
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
    getPermission().then(token => setExpoPushToken(token));
    console.log(expoPushToken);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });


    // Notification Trigger Logic 
    if(!tenantState) {
      return ;

    } else {
    const newTenantState = [...tenantState];

    const filterTenant = newTenantState.filter((ten) => {
      if (currentDate.getDate() !== ten.nDay || currentDate.getMonth() + 1 !== ten.nMonth || currentDate.getFullYear() !== ten.nYear ) {
        return ;
      } else {
        return ten;
      }
    })


    dispatch({
      type: "GET_NOTIFICATION_DATA",
      item: {
        notificationState: filterTenant,
      },
    });

          //  Trigger Notification 
          const MappedTenant = filterTenant.map(notifyTenant => {
            if (notifyTenant.tenant) {
              async function schedulePushNotification() {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "You've got a new rent alert! 📬",
                    body: "Tenant: " + notifyTenant.tenant + "," + " DueDate: " + notifyTenant.dueDate + "," + " Location: " + notifyTenant.location + "",
                    data: { data: 'goes here' },
                  },
                  trigger: { seconds: 1 },
                });
              }
              schedulePushNotification();
    
              onSubmit(notifyTenant)
    
              return notifyTenant;
              
            } else {
              return ;
            }
          })

  }



    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);


    //Error Snack bar 
    const [isDeleted, setIsDeleted] = useState(false);
    const toggleIsDeleteSnackBar = () => {
      setIsDeleted(!isDeleted);
    };
    const dismissIsDeleteBar = () => setIsDeleted(false);


        // Deleteing Tenants from the frontend 
        const onDeleteTenant = (id) => {
          dispatch({
            type: "GET_TENANT_DATA",
            item: {
              tenantState: tenantState?.filter((tenant) => tenant._id !== id),
            },
          });
        };
    
          // function responsible for DELETE request
      const DeleteItem = (id) => {
        console.log(id);
       const delFunction = axios.delete(`/tenant/${id}`).then((res)=> {
        onDeleteTenant(id);
        toggleIsDeleteSnackBar();

        }).catch(()=> {
         alert("Delete Unsuccessful");
       })
      };

    
    const UpdateItem = (tenants) => {
      return navigation.navigate('editRent',tenants);
    }

    const changeDarkmode = () => {
      dispatch({
        type: "GET_DARKMODE",
        item: {
          nightMode: !nightMode,
        },
      });
    }

    // console.log("tenantState-----",tenantState);

   
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
          icon={"brightness-3"}
          onPress={() => navigation.navigate("login")}
        />
        <Appbar.Content title="Elite Rent Notifier" />
        <Appbar.Action
          icon={nightMode ? "brightness-7" : "brightness-3"}
          onPress={changeDarkmode}
        />
      </Appbar.Header>
      <Surface style={styles.containerStyle} > 
      <ScrollView>
        <SafeAreaView style={styles.safeContainerStyle}>
        <View style={styles.topRow}>
          <Text  style={nightMode ? styles.rowText1 : styles.rowText2}>Welcome {adminState.username} ! </Text>
          <Avatar.Image style={styles.avatar} size={50} source={require('./../assets/images/bg1.jpg')} />
       </View>

       <View>
         <View style={styles.searchView}>
         <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          label="Enter Tenant Name"
          value={username}
          onChangeText={(val) => setUsername(val)}
          left={<TextInput.Icon name="account" />}
          />
         </View>
        <View>
        <Button style={styles.btnSearch} color="#d8b62d" mode="contained" onPress={() => console.log('saved')}>
       <Text style={styles.btnText}>Search</Text>
       </Button>
       {/* <View style={styles.buttonContainer}>
       <Button title="Click Me"
color="#385ed9"/>
</View> */}
          {/* <Feather name='search' size={20} color='red'/> */}
        <Divider style={{marginTop:10, marginHorizontal:10, marginVertical:20}}/>
        </View>
        </View>

        {/* Scrollview */}

        <View style={styles.btnDetails}>
          <View style={styles.btnDetailsText}>
          <Text style={nightMode ? styles.textDetails1 : styles.textDetails2}>Rent Alerts</Text>
          </View>

        <View style={styles.btnDetailsBtn}>
          <Button style={styles.btnUpcoming} color="#385ed9" mode="contained" onPress={() => navigation.navigate('Home')}>
            <Text style={styles.btnText}> Upcoming </Text>
          </Button>

          <Button style={styles.btnOld} color="#385ed9" mode="contained" onPress={() => navigation.navigate('previous')}>
            <Text style={styles.btnText}>Previous </Text>
          </Button>
       </View>
        </View>

        <Divider style={{marginTop:20, marginHorizontal:10}}/>

       <View style={{marginTop:10}}>
{/* <ActivityIndicator style={{marginTop:50}} animating={true} color="green" size={40} /> */}

         {tenantState
         ? 
         tenantState.map((ten) =>(
          <View key={ten._id}>
          <List.Item
            title={`${ten.tenant} -- ${ten.location}`}
            description= {`Due Date: ${ten.dueDate} -- Notify: ${ten.notificationDate}`}
            right={props => (
              <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                  <IconButton
                    icon="pen"
                    color={nightMode? 'grey' : '#e0b60e'}
                    size={26}
                    onPress={()=> UpdateItem(ten)}
                  />
                  <IconButton
                    icon="delete"
                    color={nightMode? 'grey' : '#e0b60e'}
                    size={26}
                    onPress={() => DeleteItem(ten._id)}
                  />
              </View>      
            )
          }
          />
          <Divider style={{marginHorizontal:10}}/>
          </View>
        )
        )
         : 
         <Text>No Tenant Data</Text>
         }




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
    </ThemeProvider>
  </Provider>
    );
  }
export default HomeScreen;





const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: windowHeight 
  },
  provider: {
    flex: 1,
  },
  topRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 15,
    alignItems:'center'
  },
  rowText2: {
    fontSize: 16,
    color:'black',
    fontSize:18,
    fontWeight:'bold'
    // fontFamily: 'lucida grande',
  },
  rowText1: {
    fontSize: 16,
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
    // fontFamily: 'lucida grande',
  },
  searchView: {
    // flexDirection:'row',
    borderColor:'#C6C6C6',
    borderWidth:1,
    borderRadius:5,
    // paddingHorizontal:30,
    marginHorizontal:20,
    marginVertical:8,
  },
  avatar: {
    backgroundColor:'white',
    marginBottom: 5,
  },
  text1: {
    fontSize: 27,
    color:'#fff',
  },
  text2: {
    fontSize: 27,
    color:'black',
  },
  textInput1: {
    height: 55,

  },
  textInput2: {
    height: 55,
    backgroundColor:'#fff'
  },
  textDetails1: {
    fontSize: 18,
    color:'gray',
    fontSize:18,
    fontWeight:'bold'
  },
  textDetails2: {
    fontSize: 18,
    color:'black',
    fontSize:20,
    fontWeight:'bold'
  },
  btnSearch: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginTop:4,
    marginHorizontal:70,
  },
  btnDetails: {
    flexDirection: 'column',
    alignItems:'center',
  },
  btnDetailsText: {
    marginBottom: 10
  },
  btnDetailsBtn: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent:'space-evenly',
  },
  btnUpcoming: {
    width: 160,
    marginRight:7,
    // borderTopLeftRadius:20,
    // borderBottomRightRadius:20
  },
  btnOld: {
    width: 160,
    marginLeft:7,
    // borderTopLeftRadius:20,
    // borderBottomRightRadius:20
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
  