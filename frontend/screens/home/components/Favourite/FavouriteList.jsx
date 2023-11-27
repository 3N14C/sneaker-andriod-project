import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../../../hooks/useSelector";
import Icon from "react-native-vector-icons/FontAwesome5";
import { addToFavorites } from "../../../../redux/favourite/favourite.slice";
import { ModalSneaker } from "../BottomModal/ModalSneaker";
import { useNavigation } from "@react-navigation/native";

export default function FavouriteList() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const favorites = useSelector(selectFavoriteProducts);
  console.log(favorites.items)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {modalVisible && <ModalSneaker closeBottomSheet={closeBottomSheet} />}
      <View style={{ ...styles.container_item }}>
        {favorites.items.length > 0 ? (
          favorites.items.map((sneaker) => (
            <View key={sneaker.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.setParams({ sneaker: sneaker });
                  openBottomSheet();
                }}
              >
                <View
                  style={{
                    marginBottom: 30,
                  }}
                >
                  <View style={styles.container_sneaker}>
                    {new Date() - new Date(sneaker.createdAt) < 86400000 && (
                      <Text
                        style={{
                          position: "absolute",
                          zIndex: 80,
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 12,
                          backgroundColor: "red",
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                          borderRadius: 5,
                        }}
                      >
                        New!
                      </Text>
                    )}
                    <Icon
                      solid
                      style={{
                        color: favorites.items.includes(sneaker)
                          ? "red"
                          : "black",
                        paddingHorizontal: 2,
                        paddingVertical: 10,
                        width: 40,
                        borderRadius: 50,
                        textAlign: "center",
                        position: "absolute",
                        right: 10,
                      }}
                      name="heart"
                      size={15}
                      onPress={() => {
                        dispatch(addToFavorites(sneaker));
                      }}
                    />
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: sneaker.image[0].path }}
                    />
                  </View>
                  <Text style={styles.sneakerName}>
                    {sneaker.name.length > 15
                      ? sneaker.name.slice(0, 15) + "..."
                      : sneaker.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Icon
                      style={{ color: "#101010", width: 10, height: 10 }}
                      solid
                      name="star"
                      size={14}
                    />
                    <Text style={{ ...styles.rating }}>
                      {sneaker.rating} |{" "}
                    </Text>
                    <Text style={{ ...styles.soldCount }}>
                      {sneaker.soldCount} продано
                    </Text>
                  </View>
                  <Text style={{ ...styles.sneakerPrice }}>
                    {sneaker.offerPrice
                      ? parseFloat(
                          (Number(sneaker.price) * Number(sneaker.offerPrice)) /
                            100
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : parseFloat(Number(sneaker.price)).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            Your favourite list is empty
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
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

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },

  scrollbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
});
