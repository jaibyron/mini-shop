import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Appearance,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../components/Spacer";
import { CommonStyles, MainHeading, SubHeading } from "./Common";

export function Part01() {
  const [ex1counter, ex1setCounter] = useState(0);
  const [ex2buttonVisible, ex2setState] = useState(true);
  const [ex3value, ex3onChangeText] = useState("Useless Multiline Placeholder");
  const [ex3textColour, ex3setColour] = useState("black");
  const [ex4isLightMode, ex4setIsLightMode] = useState(ex4getIsLightMode());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <MainHeading text="Part 1: useState Fundamentals" />
      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 1: Counter" />
        <Spacer />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Pressable
              style={styles.circleButton}
              onPress={() => {
                console.log("Exercise 1 : Increment Counter");
                ex1setCounter((ex1counter) => ex1counter + 1);
                //  With setCounter(ex1counter + 1), ex1counter is captured from the render when the handler was created.
                //  If multiple updates happen before a re-render (e.g., rapid taps, or multiple calls in the same event),
                //  they all read the same stale ex1counter value and you lose updates:
                //
                //  The functional form guarantees that you're working with the most recent state value.
                //  setCounter(prev => prev + 1);
                //  i.e. "When you process this update, take whatever the current state is and increment it."
                //
                //  The non-functional form
                //  i.e. "Set the state to this particular value."
                //  setCounter(counter + 1);
                //
                //  React state updates can be batched. The value of ex1counter in your current render
                //  is a snapshot—it doesn't immediately change after calling setCounter.
                //
                //  For example:
                //
                //  function incrementThreeTimes() {
                //    setCounter(ex1counter + 1);
                //    setCounter(ex1counter + 1);
                //    setCounter(ex1counter + 1);
                //  }
                //
                //  If ex1counter is 0, all three calls effectively say:
                //
                //  setCounter(1);
                //  setCounter(1);
                //  setCounter(1);
                //
                //  So you end up with 1, not 3.
              }}
            >
              <Ionicons name="add" size={24} color="white" />
            </Pressable>
            <Pressable
              style={styles.circleButton}
              onPress={() => {
                console.log("Exercise 1 : Decrement Counter");
                ex1setCounter((ex1counter) => ex1counter - 1);
              }}
            >
              <Ionicons name="remove" size={24} color="white" />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 48 }}>{ex1counter}</Text>
          </View>
        </View>
      </View>

      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 2: Toggle Visibility" />
        <Spacer />

        <View style={{ flexDirection: "row" }}>
          <View style={styles.ex2showButton}>
            <Pressable
              onPress={() => {
                ex2setState((ex2buttonVisible) => !ex2buttonVisible);
                console.log(`Exerise 2 : ${buttonText(!ex2buttonVisible)}`);
              }}
            >
              <Text>{buttonText(ex2buttonVisible)}</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {ex2buttonVisible && (
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Secret message!
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 3: Character Counter" />
        <Spacer />
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={200}
          onChangeText={(text) => {
            ex3setColour(ex3getTextColour(text.length));
            ex3onChangeText(text);
          }}
          value={ex3value}
          style={styles.ex3textInput}
        />
        <Spacer />
        <Text style={{ color: ex3textColour }}>
          {ex3value.length}/100 characters
        </Text>
      </View>

      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 4: Theme Switcher" />
        <Spacer />
        <Switch
          trackColor={{ false: "#767577", true: "#1dc822" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 5: Form with Multiple Fields" />
      </View>

      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 6: Quantity Selector" />
      </View>
    </View>
  );
}

function buttonText(state: boolean): string {
  return state ? "Hide" : "Show";
}

function ex3getTextColour(textLength: number): string {
  return textLength > 30 ? "red" : "black";
}

function ex4getIsLightMode(): boolean {
  return Appearance.getColorScheme() == "light";
}

function ex4getToggleText(): string {
  return Appearance.getColorScheme() == "dark" ? "Light Mode" : "Dark Mode";
}

export const styles = StyleSheet.create({
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
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
