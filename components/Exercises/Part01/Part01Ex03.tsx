import { useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { Spacer } from "../../Spacer";
import { SubHeading } from "../Common";
import { BorderedView } from "../../BorderedView";

export function Part01Ex03() {
  const [ex3value, ex3onChangeText] = useState("Useless Multiline Placeholder");
  const [ex3textColour, ex3setColour] = useState("black");

  return (
    <BorderedView>
      <SubHeading text="Exercise 3: Character Counter" />
      <Spacer />
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={200}
        onChangeText={(text) => {
          ex3setColour(getTextColour(text.length));
          ex3onChangeText(text);
        }}
        value={ex3value}
        style={styles.ex3textInput}
      />
      <Spacer />
      <Text style={{ color: ex3textColour }}>
        {ex3value.length}/100 characters
      </Text>
    </BorderedView>
  );
}

function getTextColour(textLength: number): string {
  return textLength > 30 ? "red" : "black";
}
export const styles = StyleSheet.create({
  ex2showButton: {
    alignSelf: "flex-start",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  ex3textInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
});
