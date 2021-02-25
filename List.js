import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UpdateModal from "./updateTodos";

const List = (props) => {

  const sortArray = () => {
  console.log(props.todo,'todo')
    props.todo.sort();
  };

  return (
    <SafeAreaView>
      <FlatList
        data={props.todo}
        extraData={props.todo}
        renderItem={({ item }) => {
          return (
            <View style={styles.todoContainer}>
              <View style={styles.todo}>
                <TouchableOpacity onPress={() => props.setCheck(item.id)}>
                  <Icon
                    name={
                      !item.check
                        ? "checkbox-blank-circle-outline"
                        : "checkbox-marked-circle-outline"
                    }
                    size={25}
                    color={"#DC143C"}
                  />
                </TouchableOpacity>
                <ScrollView style={{ width: 160 }}>
                  <Text
                    style={!item.check ? styles.title : styles.title1}
                    onPress={() => {
                      props.updateTodo(item.id, item.title);
                      props.setText(null);
                    }}
                  >
                    {item.title}
                  </Text>
                </ScrollView>
                <Text>{item.date}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      {props.updateModal ? (
        <UpdateModal
          updateModal={props.updateModal}
          setUpdateModal={props.setUpdateModal}
          todo={props.todo}
          date={props.date}
          addTodos={props.addTodos}
          showUpdateModal={props.showUpdateModal}
          editText={props.editText}
          thisDate={props.thisDate}
          setTodo={props.setTodo}
          setDate={props.setDate}
        />
      ) : null}
      
      <TouchableOpacity style={{width:50,height:30,borderWidth:1}} onPress={sortArray}>
        <Text>Sort</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
