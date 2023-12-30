import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Barcode from "react-native-barcode-svg";
import useCurrentPrice from "../../../../hooks/useCurrentPrice";
import Icon from "react-native-vector-icons/FontAwesome5";
import Clipboard from "@react-native-clipboard/clipboard";

const Receipt = ({ route }) => {
  const [copy, setCopy] = React.useState(false);

  const { sneaker, order } = route?.params;
  const currentPrice = useCurrentPrice();

  const originalPrice = +sneaker?.price * currentPrice;
  const discountPrice =
    (+sneaker?.price * currentPrice * +sneaker?.offerPrice) / 100;
  const discount = originalPrice - discountPrice;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 30,
      }}
    >
      <Barcode
        value={order.id.slice(0, 10)}
        format="CODE128"
        maxWidth={300}
        singleBarWidth={3}
        key={order.id}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // gap: 50,
          justifyContent: "space-around",
          width: "100%",
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#000",
            letterSpacing: 1,
          }}
        >
          {sneaker.id.slice(0, 6)}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#000",
            letterSpacing: 1,
          }}
        >
          {sneaker.id.slice(10, 15)}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#000",
            letterSpacing: 1,
          }}
        >
          {sneaker.id.slice(20, 25)}
        </Text>
      </View>

      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              backgroundColor: "#f4f4f4",
            }}
            source={{ uri: sneaker?.image[0].path }}
          />

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {sneaker?.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#a2a2a2",
              }}
            >
              {order?.address}
            </Text>
          </View>
        </View>

        <Text style={{ ...styles.sneakerSize }}>{sneaker.sizeNumber}</Text>
      </View>

      <View style={{ marginTop: 40, gap: 20, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#606060", fontWeight: "bold", fontSize: 18 }}>
            Стоимость
          </Text>

          {!sneaker?.offerPrice ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#414141", fontWeight: "bold", fontSize: 18 }}
              >
                {parseFloat(
                  (+sneaker?.price * currentPrice * +sneaker?.offerPrice) / 100
                ).toLocaleString("ru-Ru", {
                  style: "currency",
                  currency: "RUB",
                })}
              </Text>
            </View>
          ) : (
            <Text
              style={{ color: "#414141", fontWeight: "bold", fontSize: 18 }}
            >
              {parseFloat(+sneaker?.price * currentPrice).toLocaleString(
                "ru-RU",
                {
                  style: "currency",
                  currency: "RUB",
                }
              )}
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Скидка
          </Text>

          <Text
            style={{
              ...styles.sneakerPrice,
              fontSize: 18,
              color: "#0c0c0c",
              fontWeight: "bold",
            }}
          >
            -
            {sneaker.offerPrice ? (
              <>
                {parseFloat(discount).toLocaleString("ru-Ru", {
                  style: "currency",
                  currency: "RUB",
                })}
              </>
            ) : (
              <>
                {parseFloat(0).toLocaleString("ru-Ru", {
                  style: "currency",
                  currency: "RUB",
                })}
              </>
            )}
          </Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#ededed",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Итого
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#0c0c0c",
              fontWeight: "bold",
            }}
          >
            {parseFloat(
              (+sneaker?.price * currentPrice * +sneaker?.offerPrice) / 100
            ).toLocaleString("ru-Ru", {
              style: "currency",
              currency: "RUB",
            })}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 60,
          alignItems: "center",
          width: "100%",
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Способ оплаты
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#414141",
              letterSpacing: 1,
            }}
          >
            MasterCard
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Дата
          </Text>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",

                color: "#414141",
                letterSpacing: 1,
              }}
            >
              {new Date(order?.orderDate).toLocaleString("default", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            ID
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#414141",
                  letterSpacing: 1,
                }}
              >
                {order.id.slice(4, 6)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#414141",
                  letterSpacing: 1,
                }}
              >
                {order.id.slice(10, 15)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#414141",
                  letterSpacing: 1,
                }}
              >
                {order.id.slice(20, 30)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#606060",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Статус
          </Text>

          <Text
            style={{
              backgroundColor: "#181818",
              borderRadius: 5,
              paddingVertical: 7,
              paddingHorizontal: 5,
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Оплачено
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 7,
    textAlign: "center",
    backgroundColor: "#fff",
    color: "#000",
  },
});
