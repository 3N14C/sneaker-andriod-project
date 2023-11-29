import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { specialOffer } from "../../../../../redux/specialOffer";
import OfferSkeleton from "../../../../../skeleton/OfferSkeleton";

export default function TodayOffer({}) {
  const navigation = useNavigation();

  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();

  const {
    isLoading,
    refetch,
    data = [],
  } = specialOffer.useGetAllSpecialOfferQuery();

  React.useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const flatArrayOffer = React.useMemo(
    () =>
      Array.prototype.concat.apply(
        [],
        data.map((item) => item)
      ),
    [data]
  );
  const lengthOffer = flatArrayOffer.length;
  const randomIdxOffer = Math.floor(Math.random() * lengthOffer);

  return (
    <View style={{ marginTop: 30 }}>
      {isLoading ? (
        <OfferSkeleton />
      ) : (
        <View
          style={{
            shadowOffset: {
              width: 20,
              height: 20,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 20,
          }}
        >
          {data.map((item, idx) => (
            <View key={item.id}>
              {idx === randomIdxOffer && (
                <TouchableOpacity
                  disabled={
                    idx === 1 && (dayOfWeek === 6 || dayOfWeek === 0)
                      ? true
                      : false
                  }
                  style={{
                    ...styles.special_offer,
                    backgroundColor:
                      idx === 0
                        ? "#ce081e"
                        : idx === 1
                        ? "#7a5548"
                        : idx === 2
                        ? "#607d8a"
                        : "#3f51b2",
                    shadowColor:
                      idx === 0
                        ? "#ce081e"
                        : idx === 1
                        ? "#7a5548"
                        : idx === 2
                        ? "#607d8a"
                        : "#3f51b2",
                  }}
                  onPress={() => {
                    navigation.navigate("OfferList", { data: item });
                  }}
                >
                  {idx === 1 && (dayOfWeek === 6 || dayOfWeek === 0) ? (
                    <View
                      style={{
                        position: "absolute",
                        borderWidth: 1,
                        zIndex: 20,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        width: "113.5%",
                        height: "130%",
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 25,
                          fontWeight: "bold",
                          textAlign: "center",
                          marginVertical: 60,
                          textShadowOffset: {
                            width: 2,
                            height: 2,
                          },
                          textShadowRadius: 5,
                          textShadowColor: "black",
                        }}
                      >
                        Предложение доступно только в выходные дни
                      </Text>
                    </View>
                  ) : (
                    ""
                  )}
                  <View style={{ ...styles.special_offer_item }} key={item.id}>
                    <View>
                      <Text
                        style={{
                          ...styles.offer_item_text,
                          fontSize: 25,
                          fontWeight: "bold",
                        }}
                      >
                        {item.discount}%
                      </Text>
                      <Text
                        style={{
                          ...styles.offer_item_text,
                          fontSize: 20,
                          fontWeight: "500",
                          marginTop: 10,
                        }}
                      >
                        {item.day}
                      </Text>
                      <Text
                        style={{
                          ...styles.offer_item_text,
                          fontSize: 10,
                          maxWidth: 125,
                          marginTop: 10,
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>

                    {
                      item.sneaker.map((sneaker, idx) => (
                        <View key={sneaker.id}>
                          <Image
                            style={{ width: 160, height: 100 }}
                            source={{ uri: sneaker.image[0].path }}
                          />
                        </View>
                      ))[0]
                    }
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  special_offer: {
    position: "relative",
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
