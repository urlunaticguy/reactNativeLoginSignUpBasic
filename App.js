import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Navigator from "./routes/HomeStack";

export default function App() {
  return <Navigator />;
}

const styles = StyleSheet.create({});
