import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState } from "react";
import { NavigationActions, StackActions } from "react-navigation";
import Lottie from "lottie-react-native";

export default function Welcome({ navigation }) {
  const [showLottie, setShowLottie] = useState(false);
  const name = navigation.getParam("name");
  const email = navigation.getParam("email");

  let logoutToHome = () => {
    console.log("Logging Out User.");
    setShowLottie(true);
    setTimeout(() => {
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Home",
            }),
          ],
        })
      );
    }, 2500);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F9CABF" }}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Welcome to the App !</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.normalText}>{email}</Text>
        <View style={styles.lottieContainer}>
          <Lottie
            style={styles.lottieStyle}
            source={require("../assets/lottie/wumpus-hi.json")}
            autoPlay
            loop
          />
        </View>
        <TouchableOpacity onPress={logoutToHome} style={styles.logoutButton}>
          {!showLottie && <Text style={styles.logoutBtnText}>Logout</Text>}
          {showLottie && (
            <Lottie
              style={styles.loadingLottie}
              source={require("../assets/lottie/loading.json")}
              autoPlay
              loop
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "1.5%",
    paddingVertical: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 20,
    marginTop: 25,
  },
  normalText: {
    fontSize: 16,
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "blue",
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 50,
  },
  logoutBtnText: {
    color: "white",
    fontSize: 15,
    padding: 12,
  },
  lottieContainer: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieStyle: {
    height: "100%",
  },
  loadingLottie: {
    height: 40,
  },
});
