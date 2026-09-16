import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Spacer } from "./Spacer";
import { useDispatch } from "react-redux";
import { deleteItem, removeItem } from "../store/cartSlice";

export interface CardCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function CartCard({ id, name, price, quantity }: CardCardProps) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Spacer height={16} />
          <Text>
            Qty:{quantity} - {`£${(price * quantity).toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => dispatch(removeItem(id))}
          >
            <Text style={styles.removeButtonText}>-</Text>
          </TouchableOpacity>

          <Spacer height={16} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => dispatch(deleteItem(id))}
          >
            <Text style={styles.deleteButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  actions: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    fontSize: 18,
    color: "black",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 18,
    color: "red",
  },
});
