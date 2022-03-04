import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";

const CreatePostScreen = () => {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState("");
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [colors, setColors] = useState("");


  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];
  const colorList = [
    {
      label: "White",
      value: "white",
    },
    {
      label: "Red",
      value: "red",
    },
    {
      label: "Blue",
      value: "blue",
    },
    {
      label: "Green",
      value: "green",
    },
    {
      label: "Orange",
      value: "orange",
    },
  ];




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
        <Appbar.Content title="React Native Paper Dropdown" />
        <Appbar.Action
          icon={nightMode ? "brightness-7" : "brightness-3"}
          onPress={() => setNightmode(!nightMode)}
        />
      </Appbar.Header>
      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>
          <DropDown
            label={"Gender"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
          />
          <View style={styles.spacerStyle} />
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
          />
        </SafeAreaView>
      </Surface>
    </ThemeProvider>
  </Provider>
  )
}

export default CreatePostScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});