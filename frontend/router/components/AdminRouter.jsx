import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { selectCartItems } from "../../hooks/useSelector";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import HomeAdmin from "../../admin/screens/home/HomeAdmin";
import SneakersAdmin from "../../admin/screens/sneakers/SneakersAdmin";
import OrdersAdmin from "../../admin/screens/orders/OrdersAdmin";
import BrandAdmin from "../../admin/screens/brand/BrandAdmin";

export default function AdminRouter({ params }) {
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
        }}
      >
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
                    Пользователи
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Icon
                  name="user"
                  size={20}
                  color={focused ? "black" : "lightgray"}
                />
              );
            },
          }}
          name="Пользователи"
          component={HomeAdmin}
          initialParams={params}
        />

        <Tab.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
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
                    name="shoe-prints"
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
                    Бренды
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="shoe-prints"
                    solid
                    size={20}
                    color={focused ? "black" : "lightgray"}
                  />
                </View>
              );
            },
          }}
          name="Бренды"
          component={BrandAdmin}
        />

        <Tab.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
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
                    name="shoe-prints"
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
                    Кроссовки
                  </Text>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="shoe-prints"
                    solid
                    size={20}
                    color={focused ? "black" : "lightgray"}
                  />
                </View>
              );
            },
          }}
          name="Кроссовки"
          component={SneakersAdmin}
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
          component={OrdersAdmin}
        />
      </Tab.Navigator>
    </>
  );
}
