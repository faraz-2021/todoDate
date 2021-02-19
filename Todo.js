import React, { useState, useEffect } from "react";
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

export default function Todo(props) {
  useEffect(() => {
    thisDate();
  }, [thisDate]);
  const currentDateTime = Date().toLocaleString();
  const [date, setDate] = useState("");
  const [todo, setTodo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");

  const addTodos = (text) => {
    if (text.trim().length > 0) {
      setTodo((prevValue) => {
        return [
          ...prevValue,
          { title: text.trim(), id: Math.random().toString(), date: date },
        ];
      });
    } else {
      alert("List can't be empty");
    }
  };
  const thisDate = () => {
    setDate(currentDateTime);
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
          visible={props.modalVisible}
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
                <TouchableOpacity onPress={props.handleClick}>
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
        <List todo={todo} date={date} />
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
