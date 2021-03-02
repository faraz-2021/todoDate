import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Todo from "./src/component/Todo";
import Login from "./src/screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const user = "no user found";

export default function App() {
  const [localId, setLocalId] = useState();

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      id ? setLocalId(id) : setLocalId(user);
    })();
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      {localId && (
        <Stack.Navigator
          initialRouteName={localId === user ? "Login" : "Home"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Todo} />
        </Stack.Navigator>
      )}
      <StatusBar barStyle="light-content" style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
