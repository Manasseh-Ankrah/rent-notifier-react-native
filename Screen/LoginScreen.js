import React,{useState} from 'react';
import { Appbar, Avatar,Button,TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './../Components/BottomTabs';

const LoginScreen = ({route,navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.warn(route.params.initialParams);

  return(
  <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Image source={require('./assets/images/elite.png')}/> */}
         <Avatar.Image style={styles.avatar} size={140} source={require('./../assets/images/newprofile.jpg')} />
         <Text style={styles.text}>Login Form</Text>
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
    <Button style={styles.btn} color="#385ed9" mode="contained" onPress={() => navigation.navigate('tabs',{BottomTabs})}>
    <Text style={styles.btnText}>Login</Text>
  </Button>
    {/* <Button style={styles.btn} color="#ee4265" mode="contained" onPress={() => navigation.push('register')}>
    <Text style={styles.btnText}>Register</Text>
  </Button> */}
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

</View>
)
  };

export default LoginScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    flexDirection:'column',
    backgroundColor:'#69d7d3',
  },
  // secondContainer: {
  //   backgroundColor:'#69d7d3',
  //   // marginBottom: 20,
  // },
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
    marginHorizontal:40,
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