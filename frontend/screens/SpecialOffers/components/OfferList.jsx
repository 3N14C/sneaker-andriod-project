import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../../hooks/useSelector";
import Sneaker from "../../../componetns/Sneaker.component";

export default function OfferList({ route }) {
  const { data } = React.useMemo(() => {
    return route?.params;
  }, [route?.params]);

  const uniqueData = React.useMemo(() => {
    return data?.sneaker.reduce((acc, obj) => {
      const found = acc.find((item) => item.name === obj.name);
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
  }, [data]);

  const navigation = useNavigation();

  const favorites = useSelector(selectFavoriteProducts);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: data.day,
    });
  }, [data]);

  return (
    <View style={styles.container}>
      {uniqueData.map((sneaker, index) => {
        return (
          <Sneaker
            key={sneaker.id}
            sneakerParams={sneaker}
            favoriteSneaker={sneaker}
            favoriteSneakerColor={
              favorites.items.map((item) => item.id).includes(sneaker.id)
                ? "red"
                : "black"
            }
            sneakerName={sneaker.name}
            imageSneaker={sneaker.image[0].path}
            sneakerOfferPrice={sneaker.offerPrice}
            sneakerPrice={sneaker.price}
            sneakerSoldCount={sneaker.soldCount}
            sneakerRating={sneaker.rating}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
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
    marginTop: 10,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});
