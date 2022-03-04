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
  Avatar,
  List
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/Dimensions';


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
        <View style={styles.topRow}>
          <Text  style={nightMode ? styles.rowText1 : styles.rowText2}>Welcome Manasseh ! </Text>
          <Avatar.Image style={styles.avatar} size={50} source={require('./../assets/images/newprofile.jpg')} />
       </View>

       <View>
         <View style={styles.searchView}>
         <TextInput
          style={nightMode ? styles.textInput1 : styles.textInput2}
          label="Enter Tenant Name"
          value={username}
          onChangeText={(val) => setUsername(val)}
          left={<TextInput.Icon name="feather" />}
          />
         </View>
        <View>
        <Button style={styles.btn} color="#ee4265" mode="contained" onPress={() => console.log('saved')}>
       <Text style={styles.btnText}>Retrieve Info</Text>
       </Button>
          {/* <Feather name='search' size={20} color='red'/> */}
        <Divider style={{marginTop:10, marginHorizontal:10, marginVertical:20}}/>
        </View>
        </View>

        <View style={styles.btnDetails}>
          <View style={styles.btnDetailsText}>
          <Text style={nightMode ? styles.textDetails1 : styles.textDetails2}>Rent Information</Text>
          </View>

        <View style={styles.btnDetailsBtn}>
          <Button style={styles.btnUpcoming} color="#385ed9" mode="contained" onPress={() => console.log('saved')}>
            <Text style={styles.btnText}> Upcoming </Text>
          </Button>

          <Button style={styles.btnOld} color="#385ed9" mode="contained" onPress={() => console.log('saved')}>
            <Text style={styles.btnText}>Old Alerts </Text>
          </Button>
       </View>
        </View>

        <View style={{marginTop:10}}>
          <View>
            <List.Item
              title="Manasseh Ankrah || Loc: Kasoa"
              description="Notification Date: 3/4/2022"
              left={props => <List.Icon {...props} icon="folder" />}
              right={props => <List.Icon {...props} icon="folder" />}
              right={props => <List.Icon {...props} color={nightMode ? 'grey' :'#ee4265'} icon="pen" />}
            />
            {/* <Divider /> */}
          </View>
          <View>
            <List.Item
              title="John Doe || Loc: Spintex"
              description="Notification Date: 3/4/2022"
              left={props => <List.Icon {...props} icon="folder" />}
              right={props => <List.Icon {...props} icon="folder" />}
              right={props => <List.Icon {...props} color={nightMode ? 'grey' :'#ee4265'} icon="pen" />}
            />
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
    // fontFamily: 'lucida grande',
  },
  rowText1: {
    fontSize: 16,
    color:'#fff',
    // fontFamily: 'lucida grande',
  },
  searchView: {
    // flexDirection:'row',
    borderColor:'#C6C6C6',
    borderWidth:1,
    borderRadius:10,
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
    color:'#fff'
  },
  textDetails2: {
    fontSize: 18,
    color:'black'
  },
  btn: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    height:50,
    marginTop:4,
    // marginBottom:1,
    marginHorizontal:70,
    // borderColor: 'yellow',
    // color:'red',
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
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
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
  },
  btnOld: {
    width: 160,
    marginLeft:7,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
  },
  btnText: {
    fontSize: 16,
  },
});
  