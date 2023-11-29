import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
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
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
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
              width: "100%",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
              }}
              source={{ uri: orderItem?.image[0].path }}
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
                  maxWidth: 150,
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
                  {orderItem.sizeNumber}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.price,
                }}
              >
                {orderItem.offerPrice
                  ? parseFloat(
                      (+orderItem.price *
                        currentPrice *
                        +orderItem.offerPrice) /
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
                order.statusDelivery === "user-tie" ||
                order.statusDelivery === "box-open"
                  ? "#3f3f40"
                  : "#9f9f9f"
              }
              line={" - - - - - "}
              iconName={"user-tie"}
            />

            <OrderStatus
              color={
                order.statusDelivery === "box-open" ? "#3f3f40" : "#9f9f9f"
              }
              iconName={"box-open"}
            />
          </View>

          <View style={{}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                marginVertical: 10,
              }}
            >
              {order.statusDelivery === "box"
                ? "В процессе сборки"
                : order.statusDelivery === "truck"
                ? "В пути"
                : order.statusDelivery === "user-tie"
                ? "Передано курьеру"
                : "Доставлено"}
            </Text>
          </View>

          <View
            style={{
              ...styles.line,
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

          <View
            style={{
              ...styles.roadmapDelivery,
            }}
          >
            {order.roadmapDelivery.map((road, idx) => (
              <View style={{}} key={idx}>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View>
                    <View style={{ ...styles.containerPoint }}>
                      <View style={{ ...styles.point }} />
                    </View>
                    <Text
                      style={{
                        color: "#9f9f9f",
                        fontSize: 12,
                        flexWrap: "wrap",
                        width: 5,
                        marginLeft: 10,
                      }}
                    >
                      {idx !== 0 && "| | | | |"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: 300,
                      marginTop: -10,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: 16,
                          maxWidth: road?.status.length > 20 ? 250 : "auto",
                        }}
                      >
                        {`${road.status} - ${new Date(road.date).toLocaleString(
                          "default",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}`}
                      </Text>

                      <Text
                        style={{ color: "#aaaaaa", fontSize: 12, marginTop: 5 }}
                      >{`${road.address}`}</Text>
                    </View>

                    <Text
                      style={{
                        color: "#aaaaaa",
                        fontSize: 12,
                        marginTop: 3,
                      }}
                    >
                      {new Date(road.date).toLocaleString("default", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
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
    gap: 10,
  },

  roadmapDelivery: {
    // flex: 1,
    flexDirection: "column-reverse",
    alignItems: "flex-start",
    // justifyContent: "flex-end",
    marginVertical: 20,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "##c6c6c6",
    marginVertical: 20,
  },

  containerPoint: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 50,
    borderColor: "#101010",
  },

  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#101010",
  },
});
