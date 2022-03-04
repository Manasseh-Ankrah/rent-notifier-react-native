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
  Snackbar 
} from "react-native-paper";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View,Text } from "react-native";
import DropDown from "react-native-paper-dropdown";
import DatePicker from 'react-native-datepicker';


// import { StyleSheet, View, Text, Image,ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AddTenantScreen = ({route, navigation }) => {
  // New states
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  
  const [tenant, setTenant] = useState("");
  const [location, setLocation] = useState("");
  const [propType, setPropType] = useState("");
  const [startDate, setStartDate] = useState(`${cDay}-${cMonth}-${cYear}`);
  const [endDate, setEndDate] = useState(`${cDay}-${cMonth}-${cYear}`);
  const [notificationDate, setNotificationDate] = useState(`${cDay}-${cMonth}-${cYear}`);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => {
    setVisible(!visible);
    // navigation.navigate('Home');
  };

  const onDismissSnackBar = () => setVisible(false);


  const propertyType = [
    {
      label: "Single Room",
      value: "single room",
    },
    {
      label: "Chamber and Hall",
      value: "chamber and hall",
    },
    {
      label: "Three Bedroom Self Contain ",
      value: "three bedroom self contain",
    },
    {
      label: "Two Bedroom Apartment ",
      value: "two bedroom apartment",
    },
  ];



  const onSubmit = () => {
    console.log('Tenant Fullname ->',tenant);
    console.log('Property Location ->',location);
    console.log('Apartment Description ->',propType);
    console.log('Start Date ->',startDate);
    console.log('End Date ->',endDate);
    console.log('Notification Date ->',notificationDate);


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
      <Appbar.Header>
        <Appbar.Content title="Elite Rentals App" />
        <Appbar.Action
          icon={nightMode ? "brightness-7" : "brightness-3"}
          onPress={() => setNightmode(!nightMode)}
        />
      </Appbar.Header>
      <ScrollView>
      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>

      <View style={styles.headerView}>
        <Text style={nightMode? styles.headerText2 : styles.headerText1}>Fill the forms for Rent Notification</Text>
      </View>

         <TextInput
            style={nightMode? styles.textInput2 : styles.textInput1}
            mode="outlined"
            label="Tenant Full Name"
            value={tenant}
            onChangeText={(val) => setTenant(val)}
          />
            <View style={styles.spacerStyle} />
         <TextInput
            style={nightMode? styles.textInput2 : styles.textInput1}
            mode="outlined"
            label="Property Location"
            value={location}
            onChangeText={(val) => setLocation(val)}
         />
            <View style={styles.spacerStyle} />
          <DropDown
            style={styles.textInput}
            label={"Apartmant Details"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={propType}
            setValue={setPropType}
            list={propertyType}
          />
          {/* <View style={styles.spacerStyle} />
          <DropDown
            label={"Colors"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={colors}
            setValue={setColors}
            list={colorList}
            multiSelect
          /> */}


          {/* Datepicker */}

          {/* End Date */}
          <View style={styles.spacerStyle} />
          <View style={styles.spacerStyle} />

       <View>
          <Text style={styles.text1}>Start Date :</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={startDate}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1990"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(startDate) => {
            setStartDate(startDate);
          }}
        />
        </View>

        {/* End Date */}
          <View style={styles.spacerStyle} />
          <View style={styles.spacerStyle} />

       <View>
          <Text style={styles.text1}>End Date :</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={endDate}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1990"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(endDate) => {
            setEndDate(endDate);
          }}
        />
        </View>

        <View style={styles.spacerStyle} />
        <View style={styles.spacerStyle} />

       {/* Notification Trigger Section */}
          <View style={styles.trigger}>
          <Text style={nightMode? styles.triggerText2 : styles.triggerText1}>When do you want to trigger Notification?</Text>
          </View>
        <View>
          <View>
          <Text style={styles.text1}>Trigger Notification :</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={notificationDate}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1990"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(notificationDate) => {
            setNotificationDate(notificationDate);
          }}
        />
        </View>
        </View>
        <View style={styles.spacerStyle} />
        <View style={styles.spacerStyle} />

         <Button style={styles.btn} color="#ee4265"  mode='contained' onPress={onToggleSnackBar}>
           <Text style={styles.btnText}>Add Tenant</Text>
         </Button>

         <Snackbar
        visible={visible}
        duration={1000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Done',
          onPress: () => {
            // Do something
          },
        }}>
        Operation was Successful.
      </Snackbar>
        </SafeAreaView>
      </Surface>
      </ScrollView>
    </ThemeProvider>
  </Provider>
  
    );
  }

  export default AddTenantScreen;

  const styles = StyleSheet.create({
    containerStyle: {
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
    headerText2: {
      fontSize: 20,
      color: 'white',
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
    datepickerContainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#A8E9CA'
    },
    datePickerStyle: {
      width: '100%',
      // marginHorizontal:20
    },
    textInput1: {
      backgroundColor:'#fff',
    },
    textInput2: {
      backgroundColor:'#131312',
    },
    text1: {
      textAlign: 'left',
      width: 230,
      fontSize: 16,
      color : "gray"
    },
    trigger: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30
    },
    triggerText1: {
      fontSize: 18,
      color: '#111112',
    },
    triggerText2: {
      fontSize: 18,
      color: 'white',
    },
    bColor: {
      color: '#fff',
    },
    btn: {
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      height:50,
      marginTop:15,
      marginBottom:20,
      marginHorizontal:40,
      borderTopLeftRadius:20,
      borderBottomRightRadius:20
    },
    btnText: {
      fontSize: 16,
    },
  });


  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     flexDirection:'column',
  //     backgroundColor:'lightgray',
  //   },
  //   headerContainer: {
  //     alignItems:'center',
  //     marginBottom: 20,
  //   },
  //   avatar: {
  //     backgroundColor:'white',
  //     marginBottom: 5,
  // },
  // text: {
  //     fontSize: 39,
  //     color:'#fff',
  //     marginTop: 25,
  //     marginBottom:20,
  // },
  // textInput: {
  //     marginHorizontal:20,
  //     marginBottom:15,
  //     backgroundColor:'#fff',
  //     borderColor:"#fff",
  //   },
  //   btn: {
  //     justifyContent:'center',
  //     alignItems:'center',
  //     textAlign:'center',
  //     height:50,
  //     marginTop:15,
  //     marginBottom:20,
  //     marginHorizontal:40,
  //     color:'red',
  //     borderTopLeftRadius:20,
  //     borderBottomRightRadius:20
  //   },
  //   btnText: {
  //     fontSize: 16,
  //   },
  //   link: {
  //     justifyContent:'center',
  //     alignItems:'center',
  //     textAlign:'center',
  //     marginTop:25,
  //   },
  //   linkText: {
  //     fontSize: 15,
  //     color:'#fff',
  //   },
  // });