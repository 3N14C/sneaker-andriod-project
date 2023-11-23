import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { addToFavorites } from "../../../redux/favourite/favourite.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../../hooks/useSelector";
import { ModalSneaker } from "../../home/components/BottomModal/ModalSneaker";
import useCurrentPrice from "../../../hooks/useCurrentPrice";

export default function OfferList({ route }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const currentPrice = useCurrentPrice();

  const { data } = route.params;
  const navigation = useNavigation();

  const favorites = useSelector(selectFavoriteProducts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: data.day,
    });
  }, []);

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
        {data.sneaker.map((sneaker, index) => {
          return (
            <View key={sneaker.id}>
              <TouchableOpacity
                key={sneaker.id}
                onPress={() => {
                  navigation.setParams({
                    sneaker: sneaker,
                  });
                  openBottomSheet();
                }}
              >
                <View
                  style={{
                    marginBottom: 30,
                  }}
                >
                  <View style={styles.container_sneaker}>
                    <ModalSneaker
                      modalVisible={modalVisible}
                      closeBottomSheet={closeBottomSheet}
                    />
                    <Icon
                      solid
                      style={{
                        color: favorites.items
                          .map((sneaker) => sneaker.name)
                          .includes(sneaker.name)
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
                      source={{ uri: sneaker.image }}
                    />
                  </View>
                  <Text style={styles.sneakerName}>
                    {sneaker.name.length >= 20
                      ? `${sneaker.name.slice(0, 15)}...`
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
                      style={{ color: "#101010" }}
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
                    {sneaker?.offerPrice ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            ...styles.sneakerPrice,
                            fontSize: 12,
                            marginRight: 10,
                            textDecorationLine: "line-through",
                            color: "#ccc",
                          }}
                        >
                          {parseFloat(+sneaker?.price * currentPrice).toLocaleString("ru-RU", {
                            style: "currency",
                            currency: "RUB",
                          })}
                        </Text>

                        <Text style={{ ...styles.sneakerPrice }}>
                          {parseFloat(
                            (+sneaker?.price * currentPrice * +sneaker?.offerPrice) / 100
                          ).toLocaleString("ru-RU", {
                            style: "currency",
                            currency: "RUB",
                          })}
                        </Text>
                      </View>
                    ) : (
                      <Text style={{ ...styles.sneakerPrice }}>
                        {parseFloat(+sneaker?.price * currentPrice).toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        })}
                      </Text>
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
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
    marginTop: 5,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});
