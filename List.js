import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

const List = (props) => {
  return (
    <FlatList
      data={props.todo}
      extraData={props.todo}
      renderItem={({ item }) => {
        return (
          <View style={styles.todoContainer}>
            <View style={styles.todo}>
              <Text style={styles.todoText}>{item.title}</Text>
              <Text>{item.date}</Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 18,
    marginBottom: 15,
    borderBottomWidth: 1,
    height: 80,
    alignContent: "center",
  },
  flex1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
  },
  title1: {
    fontSize: 25,
    marginLeft: 10,
    textDecorationLine: "line-through",
    opacity: 0.3,
  },
  indicator: {
    fontSize: 25,
  },
  indicator2: {
    fontSize: 25,
  },
  checkButton: {
    fontSize: 30,
  },
  todoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 16,
  },
  status: {
    width: 12,
    height: 12,
    marginHorizontal: 20,
    borderRadius: 6,
  },
  checkIcon: {
    marginHorizontal: 10,
  },
});

export default List;
