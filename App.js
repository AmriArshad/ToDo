import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { themeColour, backgroundColour, componentColour } from "./constants";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // Keyboard.dismiss();
    if (task) setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={backgroundColour} />
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks 👌</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add a task 📝"}
          placeholderTextColor="#FFF"
          cursorColor="#FFF"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWraper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColour,
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  items: {
    marginTop: 40,
    height: "70%",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: componentColour,
    color: "#FFF",
    borderRadius: 60,
    borderColor: themeColour,
    borderWidth: 1,
    width: 270,
  },
  addWraper: {
    width: 60,
    height: 60,
    backgroundColor: componentColour,
    borderRadius: 60,
    borderColor: themeColour,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "#FFF",
  },
});
