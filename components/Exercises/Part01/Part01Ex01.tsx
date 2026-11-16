import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../Spacer";
import { SubHeading } from "../Common";
import { BorderedView } from "../../BorderedView";

/**
 * Exercise 1: Counter
 *
 * Demonstrates local state with useState and how state changes drive
 * re-renders.
 *
 * When this component renders:
 *  - On mount: React calls this function and useState(0) creates the state.
 *  - When setCounter() changes the value: React calls the function again,
 *    and useState returns the new value (the initial 0 is ignored).
 *  - When the parent re-renders (unless this component is wrapped in
 *    React.memo).
 *  - Not when the new value equals the current one (compared with Object.is).
 *
 * A re-render re-runs this whole function and renders every child
 * (SubHeading, Spacer, the icons...). React then diffs the result and
 * commits only what changed to the native views; here, just the Text.
 */
export function Part01Ex01() {
  const [counter, setCounter] = useState(0);

  // Use the functional updater form: setCounter(prev => prev + 1).
  //
  // `counter` is a snapshot of state from the current render. Calling
  // setCounter() doesn't change it; it queues an update and schedules a
  // re-render. So setCounter(counter + 1) means "set it to this value",
  // while setCounter(prev => prev + 1) means "increment whatever the
  // latest queued state is".
  //
  // The difference shows up when several updates are queued before the
  // next render, or when a handler runs with an old snapshot (e.g. inside
  // setTimeout or after an await):
  //
  //   setCounter(counter + 1); setCounter(counter + 1);       // 0 -> 1
  //   setCounter(prev => prev + 1); setCounter(prev => prev + 1); // 0 -> 2
  //
  // Multiple setCounter calls in one handler are batched into a single
  // re-render.
  //
  // These handlers are recreated on every render. That's fine here; it
  // only matters when passing them to a React.memo child, where a new
  // function identity would defeat the memoization (use useCallback then).
  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);

  return (
    <BorderedView>
      <SubHeading text="Exercise 1: Counter" />
      <Spacer />

      <View style={styles.row}>
        {/* Buttons, stacked vertically */}
        <View style={styles.column}>
          <Pressable style={styles.circleButton} onPress={increment}>
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
          <Pressable style={styles.circleButton} onPress={decrement}>
            <Ionicons name="remove" size={24} color="white" />
          </Pressable>
        </View>

        {/* Current value; the only part of the screen that changes on a tap */}
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{counter}</Text>
        </View>
      </View>
    </BorderedView>
  );
}

// Defined once at module level, so these style objects keep the same
// identity across renders (unlike inline style={{ ... }} objects, which
// are recreated each time).
export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  valueContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 48,
  },
});
