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
import {windowHeight} from '../utils/Dimensions';


const RegisterScreen = ({navigation}) => {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const onSubmit = () => {
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return(
    <Provider  theme={nightMode ? DarkTheme : DefaultTheme}>
    <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
      <StatusBar
        backgroundColor={
          nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
        }
        barStyle={"light-content"}
      />
      <Appbar.Header style={styles.headerSection}>
        {/* <Appbar.Content title="Elite Rentals App" /> */}
        <Appbar.Action
          style={styles.icon}
          size={35}
          icon={"chevron-left"}
          onPress={() => navigation.navigate("Profile")}
        />
        <Appbar.Action
          icon={nightMode ? "brightness-7" : "brightness-3"}
          onPress={() => setNightmode(!nightMode)}
        />
      </Appbar.Header>
      <ScrollView>
      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>
  <View style={styles.container1}>
      <View style={styles.headerContainer}>
         <Text style={nightMode ? styles.text1 : styles.text2}>Add New Account</Text>
      </View>

<View style={styles.secondContainer}>
      <View>
        <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          label="Username"
          value={username}
          onChangeText={(val) => setUsername(val)}
          right={<TextInput.Icon name="account" />}
          />
    </View>
      <View>
        <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          keyboardType="email-address"
          label="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          right={<TextInput.Icon name="email" />}
          />
    </View>
      <View>
        <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />
    </View>
      <View>
        <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />
    </View>
    <View>

    <Button style={styles.btn} color="#ee4265" mode="contained" onPress={() => navigation.navigate('home')}>
    <Text style={styles.btnText}>Add Account</Text>
  </Button>
    </View>
    </View>
</View>

</SafeAreaView>
      </Surface>
      </ScrollView>
    </ThemeProvider>
  </Provider>
)
  };
export default RegisterScreen;



const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // height: windowHeight
    // marginTop:60
  },
  // safeContainerStyle: {
  //   flex: 1,
  //   margin: 20,
  //   justifyContent: "center",
  // },
  // secondContainer: {
    // flex: 1,
    // marginTop: 0,
    // justifyContent: "center",
    // },
    container1: {
      flex: 1,
      marginTop: 20,
  },
  // fullwidth: {
  //   flex: 1,
  // },
  headerView: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15,
    marginBottom: 15,
  },
  headerContainer: {
    alignItems:'center',
  },
  headerSection: {
    justifyContent:'space-between',
  },
  // icon: {
  //   fontSize:3,
  // },
  avatar: {
    backgroundColor:'white',
    marginBottom: 5,
},
text1: {
    fontSize: 30,
    color:'#fff',
    marginTop: 27,
    marginBottom:30,
},
text2: {
    fontSize: 30,
    color:'gray',
    marginTop: 27,
    marginBottom:30,
},
textInput1: {
  marginHorizontal:20,
  marginBottom:10,
  borderTopLeftRadius:20,
  // backgroundColor:'#fff'
},
textInput2: {
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
    marginBottom:20,
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