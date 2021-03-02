import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UpdateModal from "./updateTodos";
import SubTodoModal from "./SubTodoModal";
import SubList from "./SubTodo";

const List = (props) => {
  console.log(props.todo, "jjkk");
  const [subModalval, setSubModalval] = useState(false);

  const showSubModal = () => {
    setSubModalval(!subModalval);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={props.todo}
        extraData={props.todo}
        renderItem={({ item }) => {
          return (
            <View>
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
                  <TouchableOpacity
                    onPress={() => {
                      setSubModalval(true);
                      props.addSubTodo(item.id);
                    }}
                  >
                    <Text>{item.date.toLocaleString()}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
              {item.subTodo ? (
                <FlatList
                  data={item.subTodo}
                  renderItem={({ item }) => (
                    <SubList
                      item={item}
                      subCheck={props.subCheck}
                    />
                  )}
                />
              ) : null}
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
      {subModalval ? (
        <SubTodoModal
          subModalval={subModalval}
          setSubModalval={setSubModalval}
          showSubModal={showSubModal}
          setGetTodoId={props.setGetTodoId}
          getTodoId={props.getTodoId}
          todo={props.todo}
          setTodo={props.setTodo}
        />
      ) : null}

      <TouchableOpacity onPress={props.clearAsyncStorage} style={styles.button}>
        <Text>sign Out</Text>
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
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default List;
