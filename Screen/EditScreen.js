import React,{useState} from 'react';
import { Appbar, Avatar,TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const EditScreen = ({route, navigation }) => {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Edit Screen</Text>
      </View>
    );
  }

  export default EditScreen;