import { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Spacer } from "../../Spacer";
import { CommonStyles, MainHeading, SubHeading } from "../Common";
import { Part01Ex05 } from "./Part01Ex05";
import { Part01Ex01 } from "./Part01Ex01";
import { Part01Ex02 } from "./Part01Ex02";
import { Part01Ex03 } from "./Part01Ex03";
import { Part01Ex04 } from "./Part01Ex04";

export function Part01() {
  return (
    <View>
      <MainHeading text="Part 1: useState Fundamentals" />
      <Part01Ex01 />
      <Part01Ex02 />
      <Part01Ex03 />
      <Part01Ex04 />
      <Part01Ex05 />
      <View style={CommonStyles.borderedView}>
        <SubHeading text="Exercise 6: Quantity Selector" />
      </View>
    </View>
  );
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
