import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import CartScreen from '../screens/CartScreen.jsx';
import HomeScreen from "../screens/Home";
import CategoriaProduto from "../screens/CategoriaProduto";

const Stack = createNativeStackNavigator();
export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "CapsLock",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                <Text style={{ color: "#fff", marginRight: 12 }}>Carrinho</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Carrinho" component={CartScreen} />
        <Stack.Screen
          name="Categoria"
          component={CategoriaProduto}
          options={({ route }) => ({
            title: route.params.categoria.toUpperCase()
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}