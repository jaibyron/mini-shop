import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacer } from "../Spacer";
import { MainHeading, SubHeading, CommonStyles } from "./Common";
import { Part01 } from "./Part01/Part01";
export default function GeneralUiScreen() {
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <Part01 />
        <MainHeading text="Part 2: useEffect Basics" />
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 7: Document Title (Web) / Console Logger" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 8: Timer / Stopwatch" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 9: Fetch Data on Mount" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 10: Countdown Timer" />
          <Spacer />
        </View>
        <MainHeading text="Part 3: useEffect Advanced Patterns" />
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 11: Debounced Search" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 12: Window Dimensions Listener" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 13: Persisted Counter with AsyncStorage" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 14: Auto-Save Form" />
          <Spacer />
        </View>
        <MainHeading text="Part 4: Combining useState and useEffect" />
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 15: Polling Data" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 16: Multi-Step Form Wizard" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 17: Infinite Scroll List" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 18: Real-Time Clock" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 19: Animation Controller" />
          <Spacer />
        </View>
        <View style={CommonStyles.borderedView}>
          <SubHeading text="Exercise 20: Data Sync Indicator" />
          <Spacer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
