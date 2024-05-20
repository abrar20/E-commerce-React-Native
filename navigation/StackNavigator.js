import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AntDesign,Entypo,Ionicons} from '@expo/vector-icons'
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";

import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
      return (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Entypo name="home" size={24} color="#008E97" />
                ) : (
                  <AntDesign name="home" size={24} color="black" />
                ),
            }}
          />
  
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "#008E97" },
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="person" size={24} color="#008E97" />
                ) : (
                  <Ionicons name="person-outline" size={24} color="black" />
                ),
            }}
          />
  
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarLabel: "Cart",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <AntDesign name="shoppingcart" size={24} color="#008E97" />
                ) : (
                  <AntDesign name="shoppingcart" size={24} color="black" />
                ),
            }}
          />
        </Tab.Navigator>
      );
    }
  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{
            headerShown:false
         }}>
     <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} /> 
      <Stack.Screen
          name="Main"
          component={BottomTabs}
          
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
        />
           <Stack.Screen
          name="Address"
          component={AddAddressScreen}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
        />

        <Stack.Screen
          name="Order"
          component={OrderScreen}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            headerShown:true,
            headerStyle:{backgroundColor:'#00CED1'},
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{
            headerShown:true,
            headerStyle:{backgroundColor:'#00CED1'},
          }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})