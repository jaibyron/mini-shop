import { StyleSheet, Text } from "react-native";

export const MainHeading = ({ text }: { text: string }) => {
  return <Text style={CommonStyles.mainHeading}>{text}</Text>;
};

export const SubHeading = ({ text }: { text: string }) => {
  return <Text style={CommonStyles.subHeading}>{text}</Text>;
};

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "300",
    textDecorationLine: "underline",
  },
  borderedView: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#565454f2",
    padding: 16,
    backgroundColor: "#e1d4d4",
    marginVertical: 16,
  },
});
