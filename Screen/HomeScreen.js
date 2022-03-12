import React,{useState,useEffect} from 'react';
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
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/Dimensions';
import { useStateValue } from '../State/StateProvider';
import axios from "../axios";


const HomeScreen = ({route, navigation }) => {
  // const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{adminState,status, tenantState, nightMode}, dispatch] = useStateValue();
  const isFocused = useIsFocused();



  // fetch('http://10.105.2.111:5000/tenant')
  // .then(response => response.json())
  // .then(result => console.log(result));
  

  const getAllTenants = async () => {
    const fetchTenants = await axios.get("/tenant").then((res)=> {
      // console.log("LoginScreen",res.data);
      dispatch({
        type: "GET_TENANT_DATA",
        item: {
          tenantState: res.data,
        },
      });
    }).catch((err)=> {
      console.log(err)
    });
  };
  
  useEffect(() => {
    getAllTenants();
    // console.log(adminState.id);
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
              tenantState: tenantState.filter((tenant) => tenant._id !== id),
            },
          });
        };
    
          // function responsible for DELETE request
      const DeleteItem = (id) => {
        console.log(id);
       const delFunction = axios.delete(`/tenant/${id}`).then((res)=> {
         console.log(res.data);
        }).catch(()=> {
         alert("Delete Unsuccessful");
       })
        // axios({
        //   method: "delete",
        //   url: `/tenant/${id}`,
        // });
        onDeleteTenant(id);
        toggleIsDeleteSnackBar();
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
        <Appbar.Action
          icon={nightMode ? "brightness-7" : "brightness-3"}
          onPress={changeDarkmode}
        />
      </Appbar.Header>
      <ScrollView>
      <Surface style={styles.containerStyle} > 
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

        <View style={styles.btnDetails}>
          <View style={styles.btnDetailsText}>
          <Text style={nightMode ? styles.textDetails1 : styles.textDetails2}>Rent Alerts</Text>
          </View>

        <View style={styles.btnDetailsBtn}>
          <Button style={styles.btnUpcoming} color="#385ed9" mode="contained" onPress={() => console.log('saved')}>
            <Text style={styles.btnText}> Upcoming </Text>
          </Button>

          <Button style={styles.btnOld} color="#385ed9" mode="contained" onPress={() => console.log('saved')}>
            <Text style={styles.btnText}>Previous </Text>
          </Button>
       </View>
        </View>

        <Divider style={{marginTop:20, marginHorizontal:10}}/>


        <View style={{marginTop:10}}>
          {tenantState.map((ten) =>(
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
          )}


            {/* Error Snack */}
    {isDeleted ? <Snackbar
        visible={isDeleted}
        duration={1000}
        onDismiss={dismissIsDeleteBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}
        style={{backgroundColor:'green'}}
        >
        Deleted Successfully!!
      </Snackbar> : <Text></Text>
    }
          


        </View>

      </SafeAreaView>
      </Surface>
      </ScrollView>
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
    // height:50,
    marginTop:4,
    marginHorizontal:140,
    // borderTopLeftRadius:20,
    // borderBottomRightRadius:20
  },
  // buttonContainer: {
  //   marginTop: 5,
  //   marginHorizontal: 80
  //   },
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
  