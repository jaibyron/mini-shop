import { View } from "react-native";
import { MainHeading } from "../Common";
import { Part01Ex05 } from "./Part01Ex05";
import { Part01Ex01 } from "./Part01Ex01";
import { Part01Ex02 } from "./Part01Ex02";
import { Part01Ex03 } from "./Part01Ex03";
import { Part01Ex04 } from "./Part01Ex04";
import { Part01Ex06 } from "./Part01Ex06";

export function Part01() {
  return (
    <View>
      <MainHeading text="Part 1: useState Fundamentals" />
      <Part01Ex01 />
      <Part01Ex02 />
      <Part01Ex03 />
      <Part01Ex04 />
      <Part01Ex05 />
      <Part01Ex06 />
    </View>
  );
}
