import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Spacer } from "../../Spacer";
import { SubHeading } from "../Common";
import { BorderedView } from "../../BorderedView";

export function Part01Ex05() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <BorderedView>
      <SubHeading text="Exercise 5: Form with Multiple Fields" />

      <Spacer height={8} />
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
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
      <Pressable
        style={[
          styles.submitButton,
          isFormValid(name, email)
            ? styles.submitButtonBackGroundEnabled
            : styles.submitButtonBackGroundDisabled,
        ]}
        disabled={!isFormValid(name, email)}
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </BorderedView>
  );
}

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
};

function isFormValid(name: string, email: string) {
  const isValid =
    name.trim() !== "" && email.trim() !== "" && validateEmail(email);
  return isValid;
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
    // backgroundColor: "red",
  },
  submitButtonBackGroundEnabled: {
    backgroundColor: "red",
  },
  submitButtonBackGroundDisabled: {
    backgroundColor: "grey",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
