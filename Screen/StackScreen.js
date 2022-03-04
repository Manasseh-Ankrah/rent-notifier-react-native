import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, Image,Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./../assets/images/newprofile.jpg')}
      />
    );
  }


  function StackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="blue"
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }


  export default StackScreen;
