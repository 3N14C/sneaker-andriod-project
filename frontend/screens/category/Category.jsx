import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalSneaker } from "../home/components/BottomModal/ModalSneaker";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favourite/favourite.slice";
import Icon from "react-native-vector-icons/FontAwesome";
import { selectFavoriteProducts } from "../../hooks/useSelector";
import useCurrentPrice from "../../hooks/useCurrentPrice";

export default function Category({ route }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const currentPrice = useCurrentPrice()

  const { brand } = route.params;
  const navigation = useNavigation();


  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProducts);


  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({ title: brand.name });
  }, []);

  const uniqueData = brand.sneaker.reduce((acc, obj) => {
    const found = acc.find((item) => item.name === obj.name);
    if (!found) {
      acc.push(obj);
    }
    return acc;
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.container }}>
        {modalVisible && <ModalSneaker closeBottomSheet={closeBottomSheet} />}

        <View style={{ ...styles.container_item }}>
          {uniqueData.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.setParams({
                  sneaker: item,
                });

                openBottomSheet();
              }}
            >
              <View
                key={item.id}
                style={{
                  marginBottom: 30,
                }}
              >
                <View style={styles.container_sneaker}>
                  <Icon
                    solid
                    style={{
                      color: favorites.items
                        .map((item) => item.id)
                        .includes(item.id)
                        ? "red"
                        : "black",
                      paddingHorizontal: 2,
                      paddingVertical: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      textAlign: "center",
                      position: "absolute",
                      right: 10,
                    }}
                    name="heart"
                    size={15}
                    onPress={() => {
                      dispatch(addToFavorites(item));
                    }}
                  />
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: item.image }}
                  />
                </View>
                <Text style={styles.sneakerName}>
                  {item.name.length > 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Icon
                    solid
                    color={favorites.items.includes(item) ? "red" : "black"}
                    style={{ color: "#101010" }}
                    name="star"
                    size={14}
                  />
                  <Text style={{ ...styles.rating }}>{item.rating} | </Text>
                  <Text style={{ ...styles.soldCount }}>
                    {item.soldCount} продано
                  </Text>
                </View>
                <Text style={{ ...styles.sneakerPrice }}>
                  {item.offerPrice
                    ? parseFloat(
                        (+item.price * currentPrice * +item.offerPrice) / 100
                      ).toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                      })
                    : parseFloat(+item.price * currentPrice).toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                      })}
                </Text>
              </View>
            </TouchableOpacity>
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
