import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet} from "react-native";
import Constants from "expo-constants";
import Todo from "./Todo";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Todo />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
