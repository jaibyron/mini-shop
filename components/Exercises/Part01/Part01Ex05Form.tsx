import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Spacer } from "../../Spacer";

export function Part01Ex05Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View>
      <Spacer />
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setFirstName(text);
        }}
        value={firstName}
      />
      <Spacer />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setLastName(text);
        }}
        value={lastName}
      />
      <Spacer />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <Pressable style={styles.submitButton}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
    height: 32,
  },
  submitButton: {
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "red",
  },
});
