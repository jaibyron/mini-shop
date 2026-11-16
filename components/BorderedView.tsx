import { View } from "react-native";
import { CommonStyles } from "./Exercises/Common";
import { ReactNode } from "react";

type BorderedViewProps = {
  children: ReactNode;
};

export function BorderedView({ children }: BorderedViewProps) {
  return <View style={CommonStyles.borderedView}>{children}</View>;
}
