import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer } from "../components/Spacer";
import { ShopStackParamList } from "../types/navigation";
import { avengersData } from "../data/products";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ShopStackParamList>>();

  const handleBuy = ({
    id,
    name,
    price,
  }: {
    id: string;
    name: string;
    price: number;
  }) => {
    dispatch(addItem({ id, name, price }));
  };

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <Spacer />
      <View>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <View style={styles.clearCartButton}>
            <Text style={styles.clearCartText}>Checkout</Text>
          </View>
        </Pressable>
      </View>
      <FlatList
        data={avengersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            description={item.productDescription}
            price={item.price}
            onAddToCart={() =>
              handleBuy({
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearCartButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    backgroundColor: "red",
    marginHorizontal: 16,
  },
  clearCartText: {
    color: "white",
    fontWeight: "bold",
  },
});
