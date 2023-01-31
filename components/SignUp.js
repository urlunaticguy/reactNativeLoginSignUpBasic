import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React from "react";
import Title from "./Title";
import FormSignup from "./FormSignup";
import { NavigationActions, StackActions } from "react-navigation";

export default function SignUp({ navigation }) {
  const loginPressHandler = () => {
    navigation.navigate("Home");
  };

  const goToWelcomeScreen = (name, email) => {
    // navigation.navigate("Welcome");
    // navigation.dispatch(StackActions.replace("Welcome"));
    // navigation.dispatch(resetAction(name, email));
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
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Title text="Signup" />
            <FormSignup
              loginPressHandler={loginPressHandler}
              goToWelcomeScreen={goToWelcomeScreen}
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
