import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { order } from "../../redux/order";
import useCurrentPrice from "../../hooks/useCurrentPrice";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const History = ({ route }) => {
  const { userData } = route?.params;
  const { data: orderData = [], refetch } = order.useGetOrdersByUserQuery(
    userData?.route?.id
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const currentPrice = useCurrentPrice();

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      {orderData.map((order) => (
        <View key={order.id} style={{ marginBottom: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "#f4f4f4",
                }}
                source={{ uri: order?.sneaker?.image[0].path }}
              />

              <View
                style={{
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {order?.sneaker?.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    {order?.orderDate
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join(".")}
                  </Text>
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    |
                  </Text>
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    {order?.orderDate
                      .split("T")[1]
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: "flex-end",
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 5,
                }}
              >
                <Text>Оплата</Text>
                <Icon
                  size={10}
                  color="white"
                  name="arrow-up"
                  style={{
                    backgroundColor: "#f75555",
                    borderRadius: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  price: {
    color: "#101010",
    fontSize: 14,
    fontWeight: "bold",
  },
});
