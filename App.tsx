import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import ShoppingBasket from "./components/ShoppingBasket";
import TodoScreen from "./screens/TodoScreen";
import GeneralUiScreen from "./screens/Exercises/GeneralUiScreen";

const Tab = createBottomTabNavigator();
const ShopStack = createNativeStackNavigator();

function ShopStackScreen() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="ProductsList"
        component={ProductsScreen}
        options={{
          title: "Thanos Mini-Mart",
          headerLeft: () => <ShoppingBasket />,
        }}
      />
      <ShopStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Your Cart",
        }}
      />
    </ShopStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Shop"
            component={ShopStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Shop",
            }}
          />
          <Tab.Screen
            name="todo"
            component={TodoScreen}
            options={{
              title: "Todo List",
              tabBarLabel: "ToDo",
            }}
          />
          <Tab.Screen
            name="general"
            component={GeneralUiScreen}
            options={{
              title: "React Native State Management Exercises",
              tabBarLabel: "Exercises",
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
