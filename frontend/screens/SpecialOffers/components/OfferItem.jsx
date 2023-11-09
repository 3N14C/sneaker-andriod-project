import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function OfferItem({
  discount,
  day,
  description,
  background,
  image
}) {

  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          ...styles.special_offer,
          backgroundColor: background,
        }}
      >
        <View style={styles.special_offer_item}>
          <View>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {discount}%
            </Text>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 20,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              {day}
            </Text>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 10,
                maxWidth: 125,
                marginTop: 10,
              }}
            >
              {description}
            </Text>
          </View>
          <View>
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: image }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  special_offer: {
    // marginTop: 20,
    borderRadius: 30,
    padding: 20,
  },

  special_offer_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  offer_item_text: {
    color: "white",
    maxWidth: 150,
  },
});
