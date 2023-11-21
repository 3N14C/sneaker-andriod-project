import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { brand } from "../../../../../redux/brand";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  favoritesSlice,
} from "../../../../../redux/favourite/favourite.slice";
import { selectFavoriteProducts } from "../../../../../hooks/useSelector";
import { ModalSneaker } from "../../BottomModal/ModalSneaker";
import SneakerSkeleton from "../../../../../skeleton/SneakerSkeleton";
import useCurrentPrice from "../../../../../hooks/useCurrentPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scrollbar() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [focus, setFocus] = React.useState(null || "All");

  const currentPrice = useCurrentPrice();

  const navigation = useNavigation();
  const { data = [], isLoading, refetch } = brand.useGetAllQuery();
  const favorites = useSelector(selectFavoriteProducts);
  const dispatch = useDispatch();

  const handleAddToFavorites = async (sneaker) => {
    dispatch(addToFavorites(sneaker));
  };

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const onFocus = (idx) => {
    if (focus === idx) {
      setFocus(false);
    } else {
      setFocus(idx);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [ focus ])
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollbar}>
          <Text
            onPress={() => setFocus("All")}
            style={{
              color: focus === "All" ? "white" : "black",
              backgroundColor: focus === "All" ? "black" : "white",
              ...styles.scrollbar_item,
              marginRight: 15,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            All
          </Text>
          {data.map((item, idx) => (
            <TouchableHighlight
              underlayColor={"transparent"}
              key={item.id}
              onPress={() => {
                onFocus(idx);
              }}
            >
              <View
                style={{
                  ...styles.scrollbar_item,
                  marginLeft: idx !== 0 ? 15 : 0,
                  backgroundColor: focus === idx ? "black" : "white",
                }}
              >
                <Text style={{ color: focus === idx ? "white" : "black" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>

      <View style={styles.container}>
        <View>
          <ModalSneaker
            modalVisible={modalVisible}
            closeBottomSheet={closeBottomSheet}
          />

          {isLoading ? (
            <View style={{ ...styles.container_item }}>
              <SneakerSkeleton />
              <SneakerSkeleton />
              <SneakerSkeleton />
              <SneakerSkeleton />
              <SneakerSkeleton />
            </View>
          ) : (
            <>
              {data.map((item, idx) => {
                if (focus === idx)
                  return (
                    <View key={item.id} style={{ ...styles.container_item }}>
                      {item.sneaker.map((sneaker, idx) => {
                        if (
                          sneaker.soldCount > 6000 &&
                          sneaker.rating > "4.0"
                        )
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
                                        zIndex: 20
                                      }}
                                      name="heart"
                                      size={15}
                                      onPress={() => {
                                        handleAddToFavorites(sneaker);
                                      }}
                                    />
                                    <Image
                                      style={{ width: 100, height: 100, zIndex: 10 }}
                                      source={{ uri: sneaker.image }}
                                    />
                                  </View>
                                  <Text style={{ ...styles.sneakerName }}>
                                    {sneaker.name.length >= 20
                                      ? `${sneaker.name.slice(0, 20)}...`
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
                                    {sneaker.offerPrice
                                      ? parseFloat(
                                          (+sneaker.price *
                                            currentPrice *
                                            +sneaker.offerPrice) /
                                            100
                                        ).toLocaleString("ru-RU", {
                                          style: "currency",
                                          currency: "RUB",
                                        })
                                      : parseFloat(
                                          +sneaker.price * currentPrice
                                        ).toLocaleString("ru-RU", {
                                          style: "currency",
                                          currency: "RUB",
                                        })}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                      })}
                    </View>
                  );

                if (focus === "All")
                  return (
                    <View key={item.id} style={{ ...styles.container_item }}>
                      {item.sneaker.map((sneaker, idx) => {
                        if (
                          sneaker.soldCount > 6000 &&
                          sneaker.rating > "4.0"
                        )
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
                                        handleAddToFavorites(sneaker);
                                      }}
                                    />
                                    <Image
                                      style={{ width: 100, height: 100 }}
                                      source={{ uri: sneaker.image }}
                                    />
                                  </View>
                                  <Text style={styles.sneakerName}>
                                    {sneaker.name.length >= 20
                                      ? `${sneaker.name.slice(0, 20)}...`
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
                                    {sneaker.offerPrice
                                      ? parseFloat(
                                          (+sneaker.price *
                                            currentPrice *
                                            +sneaker.offerPrice) /
                                            100
                                        ).toLocaleString("ru-RU", {
                                          style: "currency",
                                          currency: "RUB",
                                        })
                                      : parseFloat(
                                          +sneaker.price * currentPrice
                                        ).toLocaleString("ru-RU", {
                                          style: "currency",
                                          currency: "RUB",
                                        })}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                      })}
                    </View>
                  );
              })}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
  },
});
