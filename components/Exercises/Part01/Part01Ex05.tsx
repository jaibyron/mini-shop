import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
} from "react-native";
import { Spacer } from "../../Spacer";
import { CommonStyles, SubHeading } from "../Common";

export function Part01Ex05() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={CommonStyles.borderedView}>
      <SubHeading text="Exercise 5: Form with Multiple Fields" />

      <Spacer height={8} />
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setFirstName(text);
        }}
        value={firstName}
      />
      <Spacer height={8} />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setLastName(text);
        }}
        value={lastName}
      />
      <Spacer height={8} />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <Spacer />
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
    height: 32,
  },
  submitButton: {
    alignItems: "center",
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "red",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
