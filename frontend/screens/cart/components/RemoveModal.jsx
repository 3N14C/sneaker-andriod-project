import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { removeItemFromCart } from "../../../redux/cart/cart.slice";
import useCurrentPrice from "../../../hooks/useCurrentPrice";

export default function RemoveModal({ modalVisible, closeBottomSheet }) {
  const currentPrice = useCurrentPrice();

  const route = useRoute();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();

  const { sneaker } = route.params;

  const showToast = () => {
    toast.show("Товар удален из корзины", {
      type: "custom",
      placement: "top",
      duration: 1000,
      animationType: "slide-in",
      onPress() {
        navigation.navigate("ModalSneaker");
      },
      style: {
        backgroundColor: "orange",
      },
      textStyle: {
        textAlign: "center",
        paddingHorizontal: 20,
      },
    });
  };

  return (
    <View style={{}}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          activeOpacity={1}
        >
          <View style={{ paddingVertical: 0 }}>
            <View
              style={{
                backgroundColor: "#f3f3f3",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  height: 5,
                  width: 40,
                  backgroundColor: "#e5e5e5",
                  marginTop: 10,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  paddingVertical: 30,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Remove From Cart?
              </Text>
              <View
                style={{ height: 1, width: "100%", backgroundColor: "#e5e5e5" }}
              />

              <View style={{ ...styles.sneakerContainer }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{ uri: sneaker?.image[0].path }}
                />

                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.sneakerTitle}>{sneaker?.name}</Text>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        ...styles.sneakerSize,
                        marginTop: sneaker.name.length > 15 ? 10 : 0,
                      }}
                    >
                      {sneaker.size}
                    </Text>
                  </View>

                  {sneaker?.offerPrice ? (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          ...styles.sneakerPrice,
                          fontSize: 15,
                          marginRight: 10,
                          textDecorationLine: "line-through",
                          color: "#ccc",
                        }}
                      >
                        {parseFloat(
                          +sneaker?.price * currentPrice
                        ).toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        })}
                      </Text>

                      <Text style={{ ...styles.sneakerPrice }}>
                        {parseFloat(
                          (+sneaker?.price *
                            currentPrice *
                            +sneaker?.offerPrice) /
                            100
                        ).toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        })}
                      </Text>
                    </View>
                  ) : (
                    <Text style={{ ...styles.sneakerPrice }}>
                      {parseFloat(sneaker?.price * currentPrice).toLocaleString(
                        "ru-RU",
                        {
                          style: "currency",
                          currency: "RUB",
                        }
                      )}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "#e5e5e5" }}
              />

              <View
                style={{
                  ...styles.containerButton,
                }}
              >
                <TouchableHighlight
                  underlayColor={"#c7c7c7"}
                  style={{
                    ...styles.button,
                    backgroundColor: "#e7e7e7",
                  }}
                  onPress={closeBottomSheet}
                >
                  <Text>Отмена</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={"#393939"}
                  style={{
                    ...styles.button,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    paddingHorizontal: 45,
                  }}
                  onPress={() => {
                    dispatch(removeItemFromCart(sneaker.id));
                    closeBottomSheet();
                    showToast();
                  }}
                >
                  <Text style={{ color: "#fff" }}>Да, удалить</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sneakerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
    // width: '100%',
  },

  sneakerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    // width: '90%'
  },

  containerButton: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#101010",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 60,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
});
