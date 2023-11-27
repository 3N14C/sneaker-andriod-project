import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { specialOffer } from "../../redux/specialOffer";
import OfferItem from "./components/OfferItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import OfferSkeleton from "../../skeleton/OfferSkeleton";

export default function SpecialOffers({ navigation }) {
  const {
    data = [],
    isLoading,
    refetch,
  } = specialOffer.useGetAllSpecialOfferQuery();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Специальные предложения',
      })
      refetch();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: 'white', marginBottom: 20}}>
      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
        {data.map((item, idx) => (
          <View key={item.id}>
            {isLoading ? (
              <View key={item.id} style={{ marginBottom: 30 }}>
                <OfferSkeleton />
              </View>
            ) : (
              <TouchableHighlight
                key={item.id}
                underlayColor={"transparent"}
                onPress={() => navigation.navigate("OfferList", { data: item })}
              >
                <OfferItem
                  discount={item.discount}
                  background={
                    idx === 0
                      ? "#ce081e"
                      : idx === 1
                      ? "#7a5548"
                      : idx === 2
                      ? "#607d8a"
                      : "#3f51b2"
                  }
                  image={item.sneaker
                    .map((sneaker, index) => {
                      if (index === 0) {
                        return sneaker.image[0].path;
                      }
                    })
                    .join("")}
                  day={item.day}
                  description={item.description}
                />
              </TouchableHighlight>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
