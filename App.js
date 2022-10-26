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
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    // Keyboard.dismiss();
    if (task) setTaskItems([...taskItems, task]);
    setTask(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={backgroundColour} />
      <View style={styles.taskWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.items}>
          <Text style={styles.sectionTitle}>To Do ✍️</Text>
          {taskItems.map((item, index) => (
            <View key={index}>
              <Task
                text={item}
                index={index}
                checked={false}
                tasks={taskItems}
                setTasks={setTaskItems}
                completed={completedTasks}
                setCompleted={setCompletedTasks}
              />
            </View>
          ))}
          <Text style={styles.sectionTitle}>Completed👌</Text>
          {completedTasks.map((item, index) => (
            <View key={index}>
              <Task
                text={item}
                index={index}
                checked={true}
                tasks={taskItems}
                setTasks={setTaskItems}
                completed={completedTasks}
                setCompleted={setCompletedTasks}
              />
            </View>
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
    paddingBottom: 20,
  },
  completedTitle: {
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
    marginLeft: 5,
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
    marginRight: 5,
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
