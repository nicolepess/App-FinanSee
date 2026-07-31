import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import NovaTransacao from "../screens/NovaTransacao";
import ConfigSaldo from "../screens/ConfigSaldo";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="NovaTransacao"
          component={NovaTransacao}
        />
        <Stack.Screen 
 name="ConfigSaldo" 
 component={ConfigSaldo}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
