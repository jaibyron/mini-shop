import { View } from "react-native";

export interface SpacerProps {
  height?: number;
  width?: number;
}

export function Spacer({ height = 16, width }: SpacerProps) {
  return <View style={{ height, width }} />;
}
