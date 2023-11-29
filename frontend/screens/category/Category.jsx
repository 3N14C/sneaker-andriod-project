import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../hooks/useSelector";
import Sneaker from "../../componetns/Sneaker.component";

export default function Category({ route }) {
  const { brand } = React.useMemo(() => {
    return route?.params;
  }, [route?.params]);
  const navigation = useNavigation();

  const favorites = useSelector(selectFavoriteProducts);

  useEffect(() => {
    navigation.setOptions({ title: brand.name });
  }, [brand.name]);

  const uniqueData = React.useMemo(() => {
    return brand.sneaker.reduce((acc, obj) => {
      const found = acc.find((item) => item.name === obj.name);
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
  }, [brand]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.container_item }}>
          {uniqueData.map((item, idx) => (
            <Sneaker
              key={item.id}
              imageSneaker={item.image[0].path}
              sneakerName={item.name}
              sneakerPrice={item.price}
              sneakerOfferPrice={item.offerPrice}
              sneakerSoldCount={item.soldCount}
              sneakerRating={item.rating}
              sneakerParams={item}
              favoriteSneaker={item}
              favoriteSneakerColor={
                favorites.items.map((item) => item.id).includes(item.id)
                  ? "red"
                  : "black"
              }
              createdAt={item.createdAt}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },

  scrollbar_item: {
    borderColor: "black",
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },

  rating: {
    color: "#626164",
    fontSize: 13,
    marginLeft: 5,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },

  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
