import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Title({ text }) {
  return (
    <View style={styles.titleView}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    height: "30%",
    paddingHorizontal: "5%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingVertical: "2%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
