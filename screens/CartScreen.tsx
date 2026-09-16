import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, clearCart } from "../store/cartSlice";
import { CartCard } from "../components/CartCard";
import { FlatList } from "react-native";
import { Spacer } from "../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  //  A hook is a special function in React that lets a function component
  //  use React features like state, lifecycle behaviour, or external libraries.

  //  Before hooks were introduced, only class components could do things like
  //  remember data or respond to lifecycle events. Hooks made it possible to do all of that in regular functions.

  //  useSelector is a React Redux 'hook'
  //  It's job is to get a piece of data from the Redux store.

  //  It subscribes to the Redux store on your behalf and makes sure your component always has the latest data.

  //  React notices that state.cart.items changed and re-renders the component automatically.
  //  You don't have to manually fetch the data again or subscribe to changes yourself.
  //  automatic synchronisation is one of the main reasons useSelector is used in React Redux applications.

  const cartItems = useSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items,
  );

  const dispatch = useDispatch();

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={styles.cartSummary}>
        <Text style={{ fontSize: 26 }}>
          Cart Total : £{getCartTotal(cartItems).toFixed(2)}
        </Text>
        {cartItems.length > 0 && (
          <View>
            <Spacer />
            <Pressable
              onPress={() => {
                {
                  dispatch(clearCart());
                }
              }}
            >
              <View style={styles.clearCartButton}>
                <Text style={styles.clearCartText}>Clear Items</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartCard
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        )}
      />
      <View>
        <Pressable>
          <View style={styles.clearCartButton}>
            <Text style={styles.clearCartText}>Clear Items</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function getCartTotal(items: CartItem[]) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity;
  }

  return total;
}

function getCartTotalNew(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  cartSummary: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    margin: 16,
  },
  clearCartButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    backgroundColor: "red",
  },
  clearCartText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
