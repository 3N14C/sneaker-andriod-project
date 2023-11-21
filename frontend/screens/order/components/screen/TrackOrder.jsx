import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import useCurrentPrice from "../../../../hooks/useCurrentPrice";
import Icon from "react-native-vector-icons/FontAwesome5";

const OrderStatus = ({ iconName, rotateDeg, line, color }) => {
  return (
    <View
      style={{
        ...styles.orderStatus,
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon
          name={iconName}
          size={25}
          color={color}
          style={{
            transform: [{ rotateY: `${rotateDeg ? rotateDeg : "0deg"}` }],
          }}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon
            name="check"
            size={15}
            color={"#fff"}
            style={{ backgroundColor: color, padding: 2, borderRadius: 50 }}
          />
        </View>
      </View>

      <Text
        style={{
          color: color,
        }}
      >
        {line}
      </Text>
    </View>
  );
};

const TrackOrder = ({ route }) => {
  const { orderItem } = route?.params;
  const { order } = route?.params;
  const currentPrice = useCurrentPrice();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "#fbfbfb",
        paddingHorizontal: 20
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 10,
            borderRadius: 20,
            width: '100%'
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
            }}
            source={{ uri: orderItem?.image }}
          />

          <View
            style={{
              marginTop: -10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                marginVertical: 10,
              }}
            >
              {orderItem?.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...styles.sneakerSize,
                }}
              >
                {orderItem.size[0].name}
              </Text>
            </View>

            <Text
              style={{
                ...styles.price,
              }}
            >
              {orderItem.offerPrice
                ? parseFloat(
                    (+orderItem.price * currentPrice * +orderItem.offerPrice) /
                      100
                  ).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })
                : parseFloat(+orderItem.price * currentPrice).toLocaleString(
                    "ru-RU",
                    {
                      style: "currency",
                      currency: "RUB",
                    }
                  )}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <OrderStatus
            color={
              order.statusDelivery === "box" ||
              order.statusDelivery === "truck" ||
              order.statusDelivery === "user-tie" ||
              order.statusDelivery === "box-open"
                ? "#3f3f40"
                : "#9f9f9f"
            }
            line={" - - - - - "}
            iconName={"box"}
          />

          <OrderStatus
            color={
              order.statusDelivery === "truck" ||
              order.statusDelivery === "user-tie" ||
              order.statusDelivery === "box-open"
                ? "#3f3f40"
                : "#9f9f9f"
            }
            line={"- - - - -  "}
            iconName={"truck"}
          />

          <OrderStatus
            color={
              order.statusDelivery === "user-tie" || order.statusDelivery === "box-open"
                ? "#3f3f40"
                : "#9f9f9f"
            }
            line={" - - - - - "}
            iconName={"user-tie"}
          />

          <OrderStatus
            color={order.statusDelivery === "box-open" ? "#3f3f40" : "#9f9f9f"}
            iconName={"box-open"}
          />
        </View>

        <View
          style={{
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
              marginVertical: 10,
            }}
          >{order.statusDeliveryDescription}</Text>
        </View>

        <View 
          style={{
            ...styles.line
          }}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000",
            marginVertical: 10,
          }}
        >
          Подробности статуса заказа
        </Text>
      </View>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
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

  orderStatus: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "##c6c6c6",
    marginVertical: 20
  }
});
