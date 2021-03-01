import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";

export default function UpdateModal(props) {


  let temp = "";
  if (props.editText.length > 0) {
    const { title, date } = props.editText[0];
    temp = title;
  }
  const [text, setText] = useState(temp);
  const todoText = (val) => {
    setText(val);
  };

  const updateTodos = () => {
    if (text.length > 0) {
      if (props.editText.length > 0) {
        let result = props.editText[0];
        result.title = text.trim();
        props.todo.forEach((a, i) => {
          if (a.id == result.id) {
            props.todo[i] = result;
          }
        });
        const a = props.todo.sort((a, b) => a.date - b.date);
        console.log(a, "djhkdk");
        props.setTodo(a);
      }
    } else {
      alert("Fill all the field");
    }

    props.setUpdateModal(false);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.updateModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.innerView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              style={styles.modalView}
              onChangeText={todoText}
              value={text}
            />
            <View style={styles.flex}>
              <TouchableOpacity onPress={() => props.setUpdateModal(false)}>
                <Text style={styles.Button}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateTodos();
                  props.thisDate();
                }}
              >
                <Text style={styles.Button}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
