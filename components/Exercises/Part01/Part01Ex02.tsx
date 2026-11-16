import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Spacer } from "../../Spacer";
import { CommonStyles, SubHeading } from "../Common";

export function Part01Ex02() {
  const [buttonVisible, setButtonVisible] = useState(true);

  return (
    <View style={CommonStyles.borderedView}>
      <SubHeading text="Exercise 2: Toggle Visibility" />
      <Spacer />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.ex2showButton}>
          <Pressable
            onPress={() => {
              setButtonVisible((ex2buttonVisible) => !ex2buttonVisible);
              console.log(`Exerise 2 : ${buttonText(!buttonVisible)}`);
            }}
          >
            <Text>{buttonText(buttonVisible)}</Text>
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
          {buttonVisible && (
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Secret message!
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

function buttonText(state: boolean): string {
  return state ? "Hide" : "Show";
}

export const styles = StyleSheet.create({
  ex2showButton: {
    alignSelf: "flex-start",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
});
