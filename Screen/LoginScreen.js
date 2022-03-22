import React,{useState,useEffect} from 'react';
import { Appbar, Avatar,Button,TextInput,ActivityIndicator, Snackbar } from 'react-native-paper';
import { StyleSheet, View, Text, Image,ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from '../axios';
import BottomTabs from './../Components/BottomTabs';
import { useStateValue } from "../State/StateProvider";


const LoginScreen = ({route,navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{adminState, tenantState, createdByState}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //   setIsLoading(false)
    // }, [])
  
  //Error Snack bar 
  const [isError, setIsError] = React.useState(false);
  const toggleErrorSnackBar = () => {
    setIsError(!isError);
  };
  const dismissErrorBar = () => setIsError(false);

  //Error Snack bar 
  const [notComplete, setNotComplete] = React.useState(false);
  const toggleNotCompleteSnackBar = () => {
    setNotComplete(!notComplete);
  };
  const dismissNotCompleteBar = () => setNotComplete(false);


  // const getAllTenants = async () => {
  //   const fetchTenants = await axios.get("/tenant/").then((res)=> {
  //     console.log("LoginScreen",res.data);
  //     dispatch({
  //       type: "GET_TENANT_DATA",
  //       item: {
  //         tenantState: res.data,
  //       },
  //     });
  //   }).catch(()=> {
  //     alert("Error occured whiles fetching data")
  //   });
  // };



  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toggleNotCompleteSnackBar();
      // alert("Enter Login Credentials");
    } else {
        await axios
          .post("/admin/login", { username:username, password:password })
          .then((res) => {
            console.log(res.data);
            // getAllTenants();
            setIsLoading(true);
            dispatch({
              type: "GET_CREATEDBY_DATA",
              item: {
                createdByState: res.data.admin.id,
              },
            });

            if (res.data.status === "SUCCESSFUL") {
              navigation.navigate('tabs');
              console.log("Login Successful");
              // console.log('Created Id = ',createdByState);
            } else {
              console.log("Login Failed");
            }

            dispatch({
              type: "GET_CURRENT_ADMIN",
              item: {
                adminToken: res.data.token,
                adminState: res.data.admin,
                status: res.data.status,
              },
            });

          }).catch(() => {
            toggleErrorSnackBar();
          })
        }          
  };



  return(
  <View style={styles.container}>
            {/* <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1,justifyContent:'center'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('./../assets/images/bg2.jpg')}
        > */}
      <View style={styles.headerContainer}>
        <Image style={styles.img} source={require('./../assets/images/login_pic.png')}/>
         {/* <Avatar.Image style={styles.avatar} size={140} source={require('./../assets/images/bg2.jpg')} /> */}
         <Text style={styles.text}>Rent Tracker</Text>
      </View>

<View style={styles.secondContainer}>
      <View>
        <TextInput
          style={styles.textInput}
          label="Username"
          value={username}
          onChangeText={(val) => setUsername(val)}
          right={<TextInput.Icon name="account" />}
          />
    </View>
      <View>
        <TextInput
          style={styles.textInput}
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />
    </View>
    <View>
    <Button style={styles.btn} color="#d8b62d" mode="contained" onPress={submit}>
      {<Text style={{color:'#fff',fontSize:17}}>Login</Text>}
      {/* <ActivityIndicator animating={true} color="red" size={20} /> */}
    </Button>
  
  {/* Error Snack */}
    {isError ? <Snackbar
        visible={isError}
        duration={2000}
        onDismiss={dismissErrorBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}
        style={{backgroundColor:'red'}}
        >
        Account does not exist!!
      </Snackbar> : <Text></Text>
    }
    {/* notComplete Snack */}
    {notComplete ? <Snackbar
        visible={notComplete}
        duration={2000}
        onDismiss={dismissNotCompleteBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}
        style={{backgroundColor:'red'}}
        >
        Fill all fields!!
      </Snackbar> : <Text></Text>
    }
    </View>
    </View>
    {/* <View style={styles.link}>
    <Text style={styles.linkText}>Username is {username}</Text>
    <Text style={styles.linkText}>Username is {password}</Text>
    </View> */}
    {/* <View style={styles.link}>
    <Text style={styles.linkText}>Dont have an account? Register</Text>
    </View> */}

    {/* Navigation */}
    {/* <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Register')}
        /> */}
        {/* <Button title="Go to Home" onPress={() => navigation.navigate('Login')} /> */}
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        {/* </ImageBackground> */}

</View>
)
  };

export default LoginScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    flexDirection:'column',
    backgroundColor:'#03010f',
  },
  imgContainer: {
    justifyContent:'center',
    flexDirection:'column',
  },
  img: {
    width:'100%',
    height:150,
    marginBottom: 20

    // flexDirection:'column',
  },
  headerContainer: {
    alignItems:'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor:'white',
    // marginTop: 27,
    marginBottom: 5,
  },
  text: {
    fontSize: 27,
    color:'#fff',
  },
  textInput: {
    marginHorizontal:20,
    marginBottom:10,
    borderTopLeftRadius:20,
    backgroundColor:'#fff'
  },
  btn: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    height:50,
    marginTop:15,
    marginHorizontal:80,
    color:'red',
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
  },
  btnText: {
    fontSize: 16,
 
  },
  link: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginTop:25,
  },
  linkText: {
    fontSize: 15,
    color:'#fff',

  },

});