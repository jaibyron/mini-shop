import { useState } from "react";
import { Text, View, Switch, Appearance } from "react-native";
import { Spacer } from "../../Spacer";
import { CommonStyles, SubHeading } from "../Common";

export function Part01Ex04() {
  const [isDark, setIsDark] = useState(false);
  const toggleSwitch = () => {
    setIsDark((previous) => !previous);
  };

  return (
    <View style={CommonStyles.borderedView}>
      <SubHeading text="Exercise 4: Theme Switcher" />
      <Spacer />
      <Switch
        trackColor={{ false: "#767577", true: "#1dc822" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => {
          console.log(`Value:${value}`);
          toggleSwitch();
        }}
        value={isDark}
      />
      <Spacer />
      <View
        style={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "black" : "white",
        }}
      >
        <Text style={{ color: isDark ? "white" : "black" }}>
          {isDark ? "DARK MODE" : "LIGHT MODE"}
        </Text>
      </View>
    </View>
  );
}
