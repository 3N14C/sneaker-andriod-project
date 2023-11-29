import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import useCurrentPrice from "../hooks/useCurrentPrice";
import { useNavigation } from "@react-navigation/native";
import { ModalSneaker } from "../screens/home/components/BottomModal/ModalSneaker";
import React from "react";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../redux/favourite/favourite.slice";

const Sneaker = ({
  sneakerParams,
  favoriteSneaker,
  favoriteSneakerColor,
  imageSneaker,
  sneakerName,
  sneakerSoldCount,
  sneakerPrice,
  sneakerOfferPrice,
  sneakerRating,
  createdAt,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();
  const currentPrice = useCurrentPrice();
  const dispatch = useDispatch();

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ModalSneaker
        modalVisible={modalVisible}
        closeBottomSheet={() => setModalVisible(false)}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.setParams({
            sneaker: sneakerParams,
          });
          openBottomSheet();
        }}
      >
        <View
          style={{
            marginBottom: 30,
          }}
        >
          {new Date() - new Date(createdAt) < 86400000 && (
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
          <View style={styles.container_sneaker}>
            <Icon
              solid
              style={{
                color: favoriteSneakerColor,
                paddingHorizontal: 2,
                paddingVertical: 10,
                width: 40,
                borderRadius: 50,
                textAlign: "center",
                position: "absolute",
                right: 10,
                zIndex: 20,
              }}
              name="heart"
              size={15}
              onPress={() => {
                dispatch(addToFavorites(favoriteSneaker));
              }}
            />
            <Image
              style={{
                width: 100,
                height: 100,
                zIndex: 10,
              }}
              source={{ uri: imageSneaker }}
            />
          </View>
          <Text style={{ ...styles.sneakerName }}>
            {sneakerName?.length >= 15
              ? `${sneakerName.slice(0, 15)}...`
              : sneakerName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Icon style={{ color: "#101010" }} solid name="star" size={14} />
            <Text style={{ ...styles.rating }}>{sneakerRating} | </Text>
            <Text style={{ ...styles.soldCount }}>
              {sneakerSoldCount} продано
            </Text>
          </View>
          <Text style={{ ...styles.sneakerPriceOffer }}>
            {sneakerOfferPrice ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    ...styles.sneakerPrice,
                    fontSize: 12,
                    marginRight: 10,
                    textDecorationLine: "line-through",
                    color: "#ccc",
                    position: "absolute",
                    top: -15,
                  }}
                >
                  {parseFloat(+sneakerPrice * currentPrice).toLocaleString(
                    "ru-RU",
                    {
                      style: "currency",
                      currency: "RUB",
                    }
                  )}
                </Text>

                <Text style={{ ...styles.sneakerPrice }}>
                  {parseFloat(
                    (+sneakerPrice * currentPrice * +sneakerOfferPrice) / 100
                  ).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                </Text>
              </View>
            ) : (
              <Text style={{ ...styles.sneakerPrice }}>
                {parseFloat(+sneakerPrice * currentPrice).toLocaleString(
                  "ru-RU",
                  {
                    style: "currency",
                    currency: "RUB",
                  }
                )}
              </Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Sneaker;

const styles = StyleSheet.create({
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

  sneakerPriceOffer: {
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

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },
});
