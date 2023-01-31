import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react-native";

export default function Form({ signupPressHandler, goToWelcomeFromLogin }) {
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [btnDisableStatus, setbtnDisableStatus] = useState(false);
  const [errorText, seterrorText] = useState("");
  const [showLottie, setShowLottie] = useState(false);

  const updateMail = (newMail) => {
    seterrorText("");
    setLoginMail(newMail);
  };
  const updateLoginPass = (newLoginPass) => {
    seterrorText("");
    setLoginPassword(newLoginPass);
  };
  const checkEmail = async () => {
    setShowLottie(true);
    setbtnDisableStatus(true);
    try {
      const response = await axios.post(
        "https://nodejsbackendforloginrnrailway-production.up.railway.app/post/validateCredentials",
        {
          loginMail: loginMail,
          loginPassword: loginPassword,
        }
      );
      console.log(response.data);
      console.log("check all data call ended");
      if (response.data.boolValue == true) {
        setTimeout(() => {
          console.log("Executing login welcome page");
          goToWelcomeFromLogin(response.data.name, loginMail);
        }, 1500);
      } else {
        setTimeout(() => {
          setShowLottie(false);
          setbtnDisableStatus(false);
          if (
            response.data.message == "LOGIN FAILED. User is not registered."
          ) {
            seterrorText("Email ID is un-registered.");
          } else if (
            response.data.message == "User exists. Password incorrect."
          ) {
            seterrorText("Incorrect Password.");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.loginForm}>
      <Text style={styles.loginLabel}>Email</Text>
      <TextInput
        onChangeText={(val) => {
          updateMail(val);
        }}
        style={styles.loginInput}
        placeholder="Enter your email"
        textContentType={"emailAddress"}
      />
      <Text style={styles.loginLabel}>Password</Text>
      <TextInput
        onChangeText={(val) => {
          updateLoginPass(val);
        }}
        style={styles.loginInput}
        placeholder="Enter your password"
        maxLength={15}
        textContentType={"password"}
        secureTextEntry={true}
      />
      <Text style={styles.errors}>{errorText}</Text>
      <TouchableOpacity
        disabled={btnDisableStatus}
        onPress={checkEmail}
        style={styles.buttonLogin}
      >
        {!showLottie && <Text style={styles.buttonLoginText}>Continue</Text>}
        {showLottie && (
          <Lottie
            source={require("../assets/lottie/loading.json")}
            autoPlay
            loop
          />
        )}
      </TouchableOpacity>
      <View style={styles.loginFooterView}>
        <Text style={styles.loginFooterText}>Don't have an account?</Text>
        <TouchableOpacity
          disabled={btnDisableStatus}
          style={styles.buttonSignUp}
          onPress={signupPressHandler}
        >
          <Text style={styles.signupLinkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    height: "70%",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
  },
  loginLabel: {
    color: "white",
    paddingBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginInput: {
    height: 55,
    backgroundColor: "#e9f3ee",
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  errors: {
    marginVertical: 5,
    color: "#FF5733",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonLogin: {
    height: 55,
    backgroundColor: "#03c28f",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 7,
    flexDirection: "row",
  },
  buttonLoginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  loginFooterView: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
  },
  loginFooterText: {
    color: "white",
    marginRight: 7,
  },
  signupLinkText: {
    fontSize: 16,
    color: "#03c48d",
    fontWeight: "900",
  },
  buttonSignUp: {
    marginTop: 2,
    padding: 8,
  },
});
