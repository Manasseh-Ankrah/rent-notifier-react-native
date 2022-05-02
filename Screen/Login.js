import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const userInfo = {username: "admin", password:"pass12345"}
//   import { useStateValue } from '../State/StateProvider';


  const [username, setUsername] = useState("");
  const [pasword, setPassword] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       toggleNotCompleteSnackBar();
//       // alert("Enter Login Credentials");
//     } else {
//         await axios
//           .post("/admin/login", { username:username, password:password })
//           .then((res) => {
//             console.log(res.data);
//             // getAllTenants();
//             setIsLoading(true);
//             dispatch({
//               type: "GET_CREATEDBY_DATA",
//               item: {
//                 createdByState: res.data.admin.id,
//               },
//             });

//             if (res.data.status === "SUCCESSFUL") {
//             //   const storeData = async () => {
//             //     let num = 1;
//             //     await AsyncStorage.setItem('isLoggedIn', num.toString())
//             //     await AsyncStorage.setItem('admin', res.data.admin)
//             // }
//             // storeData();
 
//               navigation.navigate('tabs');
//               console.log("Login Successful");
//               // console.log('Created Id = ',createdByState);
//             } else {
//               console.log("Login Failed"); 
//             }

//             dispatch({
//               type: "GET_CURRENT_ADMIN",
//               item: {
//                 adminToken: res.data.token,
//                 adminState: res.data.admin,
//                 status: res.data.status,
//               },
//             });

//           }).catch(() => {
//             toggleErrorSnackBar();
//           })
//         }          
//   };





  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#1e90ff" }}>
      <Text style={styles.welcome}>Login To My App</Text>
      <TextInput 
           placeholder='Username' 
           style={styles.input}
           onChangeText={(e)=> setUsername(e)}
      />
      <TextInput 
           placeholder='Password' 
           style={styles.input}
           onChangeText={(e)=> setPassword(e)} 
           secureTextEntry
      />
      <View style={styles.btnContiner}>
          <TouchableOpacity style={styles.userBtn} 
          onPress={()=> navigation.navigate("Home")}
          >
              <Text style={styles.btnText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userBtn} 
          onPress={()=> navigation.navigate("Profile")}
          >
              <Text style={styles.btnText}>Profile</Text>
          </TouchableOpacity>

      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
// container : {
//     // flex: 1,
//     // justifyContent:"center",
//     alignItems:"center",
//     backgroundColor:"#1e90ff"
// },
welcome : {
    fontSize: 30,
    alignItems:"center",
    margin:10,
    color:"#fff"
},
btnContiner : {
    flexDirection:"row",
    justifyContent:"space-between",
    width:"90%"

},
input : {
    width:"90%",
    backgroundColor:"#fff",
    padding:15,
    marginBottom:10,
    borderRadius:12
},
userBtn : {
    backgroundColor:"#ffd700",
    padding:15,
    width:"45%",
    borderRadius:10
},
btnText : {
    fontSize:18,
    textAlign:"center",
    color:"#fff"
}
})