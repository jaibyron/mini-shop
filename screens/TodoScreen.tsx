import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { Spacer } from "../components/Spacer";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { TodoItem, addTodo, clearTodo, toggleTodo } from "../store/todoSlice";

export default function TodoScreen() {
  const todoItems = useSelector(
    (state: { todo: { items: TodoItem[] } }) => state.todo.items,
  );
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Spacer />
        <TextInput
          placeholder="Type here to add an item"
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText("");
            }
          }}
          returnKeyType="done"
          style={styles.textInput}
        />
        <Spacer />
        <Text style={styles.listTitle}>Outstanding Items</Text>
        <View style={styles.todoList}>
          <FlatList
            data={completedItems(todoItems, false)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  onPress={() => {
                    dispatch(toggleTodo(item.id));
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: item.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {item.text}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
        <Spacer />
        <Text style={styles.listTitle}>Completed Items</Text>
        <View style={styles.todoList}>
          <FlatList
            data={completedItems(todoItems, true)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  onPress={() => {
                    dispatch(toggleTodo(item.id));
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                    }}
                  >
                    {item.text}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
      <View>
        {todoItems.length > 0 && (
          <View>
            <Pressable
              onPress={() => {
                {
                  dispatch(clearTodo());
                }
              }}
            >
              <View style={styles.clearCartButton}>
                <Text style={styles.clearCartText}>Clear Todo List</Text>
              </View>
            </Pressable>
            <Spacer />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function completedItems(todoItems: TodoItem[], completed: boolean) {
  return todoItems.filter((item) => item.completed === completed);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  textInput: {
    height: 40,
    padding: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "white",
  },
  todoList: {
    padding: 16,
  },
  listTitle: {
    fontSize: 20,
    padding: 16,
    textDecorationLine: "underline",
  },
  clearCartButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    backgroundColor: "red",
    marginHorizontal: 16,
  },
  clearCartText: {
    color: "white",
    fontWeight: "bold",
  },
});
