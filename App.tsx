import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import ShoppingBasket from "./components/ShoppingBasket";
import TodoScreen from "./screens/TodoScreen";
import GeneralUiScreen from "./screens/Exercises/GeneralUiScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="products"
            component={ProductsScreen}
            options={{
              title: "Thanos Mini-Mart",
              tabBarLabel: "Shop",
              headerLeft: () => <ShoppingBasket />,
            }}
          />
          <Screen
            name="cart"
            component={CartScreen}
            options={{
              title: "Your Cart",
              tabBarLabel: "Cart",
              headerLeft: () => <ShoppingBasket />,
            }}
          />
          <Screen
            name="todo"
            component={TodoScreen}
            options={{
              title: "Todo List",
              tabBarLabel: "ToDo",
            }}
          />
          <Screen
            name="general"
            component={GeneralUiScreen}
            options={{
              title: "React Native State Management Exercises",
              tabBarLabel: "Exercises",
            }}
          />
        </Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
