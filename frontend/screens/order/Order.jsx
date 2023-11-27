import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { order } from "../../redux/order";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Layout from "./components/Layout";
import useCurrentPrice from "../../hooks/useCurrentPrice";

export default function Order({ navigation }) {
  const route = useRoute();
  const userData = route.params?.data;
  const { data: orderData = [], refetch } = order.useGetOrdersByUserQuery(
    userData?.id
  );
  const [updateOrderRoadmap] = order.useUpdateOrderRoadmapMutation();
  const currentPrice = useCurrentPrice();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    })
  );

  return (
    <Layout
      activeOrders={
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                ...styles.container,
              }}
            >
              {orderData.length > orderData.length - 1 ? (
                <>
                  {orderData.map((order) => (
                    <View key={order.id}>
                      {order.statusDelivery !== "box-open" && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: 40,
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 10,
                              overflow: "hidden",
                              backgroundColor: "rgb(243, 243, 243)",
                            }}
                          >
                            <Image
                              style={{ width: 100, height: 100 }}
                              source={{ uri: order.sneaker.image[0].path }}
                            />
                          </View>

                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                maxWidth: 150
                              }}
                            >
                              {order.sneaker.name}
                            </Text>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                gap: 10,
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.sneakerSize,
                                }}
                              >
                                {order.sneaker.sizeNumber}
                              </Text>

                              <Text
                                style={{
                                  ...styles.inDelivery,
                                  marginTop: -10,
                                }}
                              >
                                В пути
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 5,
                                gap: 20,
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.price,
                                }}
                              >
                                {order.sneaker.offerPrice
                                  ? parseFloat(
                                      (+order.sneaker.price *
                                        currentPrice *
                                        +order.sneaker.offerPrice) /
                                        100
                                    ).toLocaleString("ru-RU", {
                                      style: "currency",
                                      currency: "RUB",
                                    })
                                  : parseFloat(
                                      +order.sneaker.price * currentPrice
                                    ).toLocaleString("ru-RU", {
                                      style: "currency",
                                      currency: "RUB",
                                    })}
                              </Text>

                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("TrackOrder", {
                                    orderItem: order.sneaker,
                                    order: order,
                                  });
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.button,
                                  }}
                                >
                                  Отслеживать
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={require("../../public/clipboard.png")}
                  />

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    Заказы отсутствуют
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      fontSize: 16,
                      color: "#9a999c",
                    }}
                  >
                    На данный момент у вас нет активных заказов
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      }
      completedOrders={
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                ...styles.container,
              }}
            >
              {orderData.length > orderData.length - 1 ? (
                <>
                  {orderData.map((order) => (
                    <View key={order.id}>
                      {order.statusDelivery === "box-open" && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: 40,
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 10,
                              overflow: "hidden",
                              backgroundColor: "rgb(243, 243, 243)",
                            }}
                          >
                            <Image
                              style={{ width: 100, height: 100 }}
                              source={{ uri: order.sneaker.image[0].path }}
                            />
                          </View>

                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              {order.sneaker.name}
                            </Text>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                gap: 10,
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.sneakerSize,
                                }}
                              >
                                {order.sneaker.size[0].name}
                              </Text>

                              <Text
                                style={{
                                  ...styles.inDelivery,
                                  marginTop: -10,
                                }}
                              >
                                Получен
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 5,
                                gap: 20,
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.price,
                                }}
                              >
                                {order.sneaker.offerPrice
                                  ? parseFloat(
                                      (+order.sneaker.price *
                                        currentPrice *
                                        +order.sneaker.offerPrice) /
                                        100
                                    ).toLocaleString("ru-RU", {
                                      style: "currency",
                                      currency: "RUB",
                                    })
                                  : parseFloat(
                                      +order.sneaker.price * currentPrice
                                    ).toLocaleString("ru-RU", {
                                      style: "currency",
                                      currency: "RUB",
                                    })}
                              </Text>

                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("TrackOrder", {
                                    orderItem: order.sneaker,
                                    order: order,
                                  });
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.button,
                                  }}
                                >
                                  Квитацния
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={require("../../public/clipboard.png")}
                  />

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    Заказы отсутствуют
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      fontSize: 16,
                      color: "#9a999c",
                    }}
                  >
                    На данный момент у вас нет заказов
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
  },

  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },

  inDelivery: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  price: {
    color: "#101010",
    fontSize: 14,
    fontWeight: "bold",
  },

  button: {
    color: "#fff",
    backgroundColor: "#101010",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    fontSize: 14,
  },
});
