import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Text, View, StyleSheet, Pressable } from "react-native";
import { ShopStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { CartItem } from "../store/cartSlice";

export default function ShoppingBasket() {
  const cartItems = useSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items,
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<ShopStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate("Cart")}>
      <View style={styles.background}>
        {getCartTotalItemCount(cartItems) > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {getCartTotalItemCount(cartItems)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function getCartTotalItemCount(items: CartItem[]) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total = total + items[i].quantity;
  }

  return total;
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
