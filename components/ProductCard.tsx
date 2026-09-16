import { View, StyleSheet, Text, Button, Pressable, Modal } from "react-native";
import { Spacer } from "./Spacer";
import { useState } from "react";

export interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}

export function ProductCard({
  name,
  description,
  price,
  onAddToCart,
}: ProductCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Spacer height={16} />
      <Text style={styles.price}>{`£${price.toFixed(2)}`}</Text>
      <Spacer />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Pressable
          onPress={onAddToCart}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Product Info</Text>
        </Pressable>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>{name}</Text>
              <Text style={{ marginTop: 8 }}>{description}</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Pressable
                  onPress={() => {
                    onAddToCart();
                    setModalVisible(false);
                  }}
                  style={{ marginTop: 16, alignSelf: "flex-end" }}
                >
                  <Text style={{ color: "red", fontSize: 16 }}>
                    Add to Cart
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 16, alignSelf: "flex-end" }}
                >
                  <Text style={{ color: "blue", fontSize: 16 }}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    alignItems: "center",
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  name: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "red",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
