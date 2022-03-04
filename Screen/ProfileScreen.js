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


const ProfileScreen = ({route, navigation }) => {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

        <View style={styles.headerContainer}>
          <Avatar.Image style={styles.avatar} size={140} source={require('./../assets/images/newprofile.jpg')} />
         <Text style={nightMode ? styles.text1 : styles.text2}>Edit Profile</Text>
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
          // style={styles.textInput}
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
         />
    </View>
    <Button style={styles.btn} color="#385ed9" mode="contained" onPress={() => console.log('saved')}>
       <Text style={styles.btnText}>Edit</Text>
    </Button>
    {/* <Button style={styles.btn} color="#385ed9" mode="contained" onPress={() => navigation.navigate("register")}>
       <Text style={styles.btnText}>Add Account</Text>
    </Button> */}
        <View style={styles.link}>
    <Text style={nightMode ? styles.linkText1 : styles.linkText2} onPress={() => navigation.navigate('register')}>Add new Account</Text>
    </View>
      </View>
        
      </SafeAreaView>
      </Surface>
      </ScrollView>
    </ThemeProvider>
  </Provider>
    );
  }
export default ProfileScreen;





const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 600
  },
  provider: {
    flex: 1,
  },
  headerView: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15,
    marginBottom: 15,
  },
  headerText1: {
    fontSize: 20,
    color: '#111112',
  },
  headerContainer: {
    alignItems:'center',
    marginTop: 20,
    marginBottom: 20,
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
    marginHorizontal:40,
    // borderColor: 'yellow',
    // color:'red',
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
  linkText1: {
    fontSize: 15,
    color:'#fff',
  },
  linkText2: {
    fontSize: 17,
    color:'black',
  },

});
  