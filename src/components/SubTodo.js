import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "./Colors";

export default function SubList(props) {
  return (
    <View style={styles.View1} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.View2}>
        <TouchableOpacity
          onPress={() => props.subCheck(props.item.id, props.item.parentId)}
        >
          <Icon
            name={
              props.item.check
                ? "checkbox-marked-circle-outline"
                : "checkbox-blank-circle-outline"
            }
            size={30}
            color={props.item.check ? Colors.green : Colors.green}
          />
        </TouchableOpacity>
        <View style={styles.View}>
          <Text
            style={
              props.item.check ? styles.Text1 : styles.Text
            }
          >
            {props.item.text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  View1: {
    flexDirection: "row",
    paddingLeft: 20,
    height:50
  },

  View2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgray,
  },

  Text: {
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0.5,
    fontSize: 25,
    borderBottomColor: Colors.lightgray,
  },
  Text1: {
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0.5,
    fontSize: 25,
    textDecorationLine: "line-through",
    opacity: 0.5,
  },

  View: {
  },
});
