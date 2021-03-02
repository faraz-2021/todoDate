import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import List from "./List";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-community/async-storage";

export default function Todo({ navigation }) {
  const [date, setDate] = useState("");
  const [todo, setTodo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [getTodoId, setGetTodoId] = useState("");

  const addTodos = (text) => {
    if (text) {
      setTodo(() => {
        return [
          ...todo,
          {
            title: text.trim(),
            id: Math.random().toString(),
            date: new Date(),
            check: false,
            subTodo: [],
          },
        ];
      });
    } else {
      alert("List can't be empty");
    }
  };
  const thisDate = () => {
    setText(null);
  };

  const setCheck = (id) => {
    const newList = todo.map((eid) => {
      if (eid.id === id) {
        const childTodo = eid.subTodo.map((e) => {
          if (eid.check == true) {
            return { ...e, check: false };
          } else {
            return { ...e, check: true };
          }
        });
        return { ...eid, check: !eid.check, subTodo: childTodo };
      } else {
        return { ...eid };
      }
    });
    setTodo(newList);
  };

  const updateTodo = (id) => {
    setUpdateModal(true);
    const arr = todo.filter((e) => e.id == id);
    setEditText(arr);
  };
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const addSubTodo = (id) => {
    const arr = todo.filter((e) => e.id == id);
    setGetTodoId(arr);
  };
  const subCheck = (id, parentId) => {
    const MainTodo = todo.map((eid, i) => {
      if (eid.id == parentId) {
        const childTodo = eid.subTodo.map((item) => {
          if (item.id == id) {
            return { ...item, check: !item.check };
          } else {
            return { ...item };
          }
        });
        const result = childTodo.map((val) => val.check == true);
        if (!result.includes(false)) {
          todo[i].check = true;
        } else {
          todo[i].check = false;
        }
        return { ...eid, subTodo: childTodo };
      } else {
        return { ...eid };
      }
    });
    setTodo(MainTodo);
  };

  return (
    <View style={styles.Main}>
      <View style={styles.Head}>
        <Text style={styles.t1}>Today </Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Icon name="pluscircleo" size={30} />
        </TouchableOpacity>
      </View>
      {modalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.innerView}>
              <Text style={styles.modalText}>Add Todo</Text>
              <TextInput
                style={styles.modalView}
                onChangeText={(text) => setText(text)}
                value={text}
              />
              <View style={styles.flex}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.Button}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    addTodos(text);
                    setModalVisible(false);
                    thisDate();
                  }}
                >
                  <Text style={styles.Button}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
      <View>
        <List
          todo={todo}
          date={date}
          setCheck={setCheck}
          setTodo={setTodo}
          text={text}
          setModalVisible={setModalVisible}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          editText={editText}
          thisDate={thisDate}
          updateTodo={updateTodo}
          addTodos={addTodos}
          setDate={setDate}
          setText={setText}
          clearAsyncStorage={clearAsyncStorage}
          getTodoId={getTodoId}
          setGetTodoId={setGetTodoId}
          addSubTodo={addSubTodo}
          subCheck={subCheck}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: "#fff",

    borderBottomColor: "#808080",
    padding: 10,
    marginTop: Constants.statusBarHeight,
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  t1: {
    fontWeight: "bold",
    fontSize: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 180,
    width: 290,
    marginLeft: 9,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Button: {
    color: "#00008B",
    fontSize: 20,
    marginTop: 10,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    width: 300,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 10,
  },
  flex: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },
  innerView: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
