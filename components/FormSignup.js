import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { React, useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react-native";

export default function FormSignup({ loginPressHandler, goToWelcomeScreen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [showLottie, setShowLottie] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const updateName = (newName) => {
    seterrMsg("");
    setName(newName);
  };

  const updateEmail = (newEmail) => {
    seterrMsg("");
    setEmail(newEmail);
  };

  const updatePassword = (newPass) => {
    seterrMsg("");
    setPassword(newPass);
  };

  const callAPI = async () => {
    setButtonStatus(true);
    setShowLottie(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (name.length == 0) {
      seterrMsg("Name cannot be Empty");
      setButtonStatus(false);
      setShowLottie(false);
    } else if (email.length == 0) {
      seterrMsg("Email cannot be empty");
      setButtonStatus(false);
      setShowLottie(false);
    } else if (reg.test(email) === false) {
      setButtonStatus(false);
      seterrMsg("Invalid Email Syntax");
      setShowLottie(false);
    } else if (password.length == 0) {
      setButtonStatus(false);
      seterrMsg("Password cannot be empty");
      setShowLottie(false);
    } else if (password.length > 0 && password.length < 5) {
      setButtonStatus(false);
      seterrMsg("Password should be min 5 chars");
      setShowLottie(false);
    } else {
      try {
        const response = await axios.post(
          "https://nodejsbackendforloginrnrailway-production.up.railway.app/post/userSignUp",
          {
            name: name,
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data.value == true) {
          setTimeout(() => {
            console.log("Executing signup welcome page");
            goToWelcomeScreen(name, email);
          }, 3000);
        } else {
          setButtonStatus(false);
          seterrMsg("Email is already registered");
          setShowLottie(false);
          console.log("Email is already registered with us");
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log("post api call ended");
  };
  return (
    <View style={styles.signupForm}>
      <Text style={styles.signupLabel}>Full Name</Text>
      <TextInput
        onChangeText={(val) => {
          updateName(val);
        }}
        style={styles.signupInput}
        placeholder="Enter your name"
      />
      <Text style={styles.signupLabel}>Email</Text>
      <TextInput
        onChangeText={(val) => {
          updateEmail(val);
        }}
        style={styles.signupInput}
        placeholder="Enter your email"
        textContentType={"emailAddress"}
      />
      <Text style={styles.signupLabel}>New Password (max 15 chars)</Text>
      <TextInput
        onChangeText={(val) => {
          updatePassword(val);
        }}
        style={styles.signupInput}
        placeholder="Enter a password"
        maxLength={15}
        textContentType={"password"}
        secureTextEntry={true}
      />
      <Text style={styles.errors}>{errMsg}</Text>
      <Text style={styles.disclaimerTextOne}>
        By selecting Agree and continue below,
      </Text>
      <View style={styles.disclaimerText}>
        <Text style={styles.disclaimerTextOne}>I agree to </Text>
        <Text style={styles.disclaimerTextTwo}>Terms of Service </Text>
        <Text style={styles.disclaimerTextTwo}>and </Text>
        <Text style={styles.disclaimerTextTwo}>Privacy Policy</Text>
      </View>
      <TouchableOpacity
        disabled={buttonStatus}
        onPress={callAPI}
        style={styles.buttonSignup}
      >
        {!showLottie && (
          <Text style={styles.buttonSignupText}>Agree and continue</Text>
        )}
        {showLottie && (
          <Lottie
            source={require("../assets/lottie/loading.json")}
            autoPlay
            loop
          />
        )}
      </TouchableOpacity>
      <View style={styles.signupFooterView}>
        <Text style={styles.signupFooterText}>Already have an account?</Text>
        <TouchableOpacity
          disabled={buttonStatus}
          style={styles.buttonLogin}
          onPress={loginPressHandler}
        >
          <Text style={styles.loginLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupForm: {
    height: "88%",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
  },
  signupLabel: {
    color: "white",
    paddingBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  signupInput: {
    height: 55,
    backgroundColor: "#e9f3ee",
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonSignup: {
    height: 55,
    backgroundColor: "#03c28f",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 7,
  },
  buttonSignupText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  disclaimerText: {
    flexDirection: "row",
    marginBottom: 5,
  },
  disclaimerTextOne: {
    color: "white",
  },
  disclaimerTextTwo: {
    color: "#03c28f",
  },
  signupFooterView: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
  },
  signupFooterText: {
    color: "white",
    marginRight: 7,
  },
  loginLinkText: {
    fontSize: 16,
    color: "#03c48d",
    fontWeight: "900",
  },
  buttonLogin: {
    marginTop: 2,
    padding: 8,
  },
  errors: {
    marginVertical: 5,
    color: "#FF5733",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
