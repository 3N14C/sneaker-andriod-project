import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/home/Home";
import Cart from "../../screens/cart/Cart";
import Order from "../../screens/order/Order";
import Profile from "../../screens/profile/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../hooks/useSelector";

export default function UserRouter({ params }) {
  const cartSneaker = useSelector(selectCartItems);
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarStyle: { height: 50, borderTopWidth: 0 },
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "black",
          tabBarHideOnKeyboard: true,
          freezeOnBlur: true
        }}
      >
        <Tab.Screen
          options={{
            lazy: true,

            tabBarIcon: ({ focused }) => {
              return (
                <Icon
                  name="home"
                  size={20}
                  color={focused ? "black" : "lightgray"}
                />
              );
            },
          }}
          name="Главная"
          component={Home}
          initialParams={params}
        />

        <Tab.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f8f8f8" },
            lazy: true,
            headerTitle: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    solid
                    size={20}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Корзина
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <View>
                    <Icon
                      name="shopping-bag"
                      solid
                      size={20}
                      color={focused ? "black" : "lightgray"}
                    />
                    {cartSneaker.items.length > 0 && (
                      <Text
                        style={{
                          position: "absolute",
                          backgroundColor: focused ? "black" : "lightgray",
                          borderRadius: 50,
                          paddingVertical: 3,
                          paddingHorizontal: 7,
                          right: -18,
                          top: 0,
                          color: focused ? "lightgray" : "white",
                          fontSize: 10,
                        }}
                      >
                        {cartSneaker.items.length}
                      </Text>
                    )}
                  </View>
                </>
              );
            },
          }}
          name="Корзина"
          component={Cart}
          initialParams={params}
        />
        <Tab.Screen
          options={{
            lazy: true,
            headerShown: true,
            headerShadowVisible: false,

            headerTitle: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="list-alt"
                    solid
                    size={20}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Заказы
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name="list-alt"
                size={20}
                color={focused ? "black" : "lightgray"}
              />
            ),
          }}
          name="Заказы"
          component={Order}
          initialParams={params}
        />
        <Tab.Screen
          options={{
            lazy: true,
            headerShown: true,
            headerShadowVisible: false,

            headerTitle: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="user"
                    solid
                    size={20}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Профиль
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name="user"
                size={20}
                color={focused ? "black" : "lightgray"}
              />
            ),
          }}
          name="Профиль"
          component={Profile}
          initialParams={params}
        />
      </Tab.Navigator>
    </>
  );
}
