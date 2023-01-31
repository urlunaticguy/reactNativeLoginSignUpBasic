import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Title from "./Title";
import Form from "./Form";
import { NavigationActions, StackActions } from "react-navigation";

export default function Login({ navigation }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const signupPressHandler = () => {
    navigation.navigate("SignUp");
  };

  const goToWelcomeFromLogin = (name, email) => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Welcome",
            params: { name: name, email: email },
          }),
        ],
      })
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../assets/background_pic.jpeg")}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <Title text="Log in" />
            <Form
              signupPressHandler={signupPressHandler}
              goToWelcomeFromLogin={goToWelcomeFromLogin}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "1.5%",
    paddingVertical: "10%",
  },
});
