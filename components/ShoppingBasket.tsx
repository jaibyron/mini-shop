import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../store/cartSlice";

export default function ShoppingBasket() {
  const cartItems = useSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items,
  );

  return (
    <View style={styles.background}>
      {getCartTotalItemCount(cartItems) > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {getCartTotalItemCount(cartItems)}
          </Text>
        </View>
      )}
    </View>
  );
}

function getCartTotalItemCount(items: CartItem[]) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total = total + items[i].quantity;
  }

  return total;
}

function getCartTotalItemCountNew(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 16,
    minWidth: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
});
