import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { sizeSneaker } from "../../../../redux/size";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../../hooks/useSelector";
import { addItemToCart } from "../../../../redux/cart/cart.slice";
import { useToast } from "react-native-toast-notifications";
import useCurrentPrice from "../../../../hooks/useCurrentPrice";
import { Carousel } from "react-native-basic-carousel";

export const ModalSneaker = ({ modalVisible, closeBottomSheet }) => {
  const [focus, setFocus] = React.useState(false);
  const currentPrice = useCurrentPrice();

  const { data: modelSize = [], refetch } = sizeSneaker.useGetSizesQuery();
  const sortedModelSize = [...modelSize].sort((a, b) => a.name - b.name);

  const cartSneaker = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { sneaker } = route?.params;
  const imagePath = sneaker?.image.map(image => image.path)
  const toast = useToast();

  const showToast = () => {
    toast.show(
      `${
        cartSneaker.items.map((item) => item).includes(sneaker)
          ? "Товар уже добавлен. Нажмите, чтобы перейти в корзину"
          : "Добавлено в корзину"
      }`,
      {
        type: `custom`,
        placement: "top",

        duration: 2000,
        animationType: "slide-in",
        onPress() {
          navigation.navigate("Корзина");
        },
        style: {
          backgroundColor: cartSneaker.items
            .map((item) => item.id)
            .includes(sneaker?.id)
            ? "orange"
            : "#2a792d",
        },
        textStyle: {
          textAlign: "center",
          paddingHorizontal: 20,
        },
      }
    );
  };

  const onFocus = (idx) => {
    if (focus === idx) setFocus(false);
    return setFocus(idx);
  };

  const validationToAdd = () => {
    try {
      if (
        modelSize[focus]?.sneaker
          .map((sneaker) => sneaker?.name)
          .includes(sneaker?.name)
      ) {
        dispatch(
          addItemToCart({
            ...sneaker,
            id: modelSize[focus].sneaker
              .map((model) => {
                if (model.name === sneaker.name) return model.id;
              })
              .filter((id) => id !== undefined)[0],
            size: modelSize[focus].name,
            offerPrice: sneaker.offerPrice,
          })
        );
        setFocus(null);
        showToast();
        closeBottomSheet();
      } else if (
        !modelSize[focus]?.sneaker
          .map((sneaker) => sneaker?.name)
          .includes(sneaker?.name)
      ) {
        toast.show("Размер на данный момент не доступен", {
          type: "danger",
          placement: "top",
          duration: 1000,
          animationType: "slide-in",
        });
      }
    } catch (error) {
      toast.show(error, {
        type: "danger",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    }
  };

  return (
    <View showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            activeOpacity={1}
          >
            <View style={{ paddingVertical: 0 }}>
              <View style={{ backgroundColor: "#f3f3f3" }}>
                <Icon
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 20,
                    zIndex: 20,
                  }}
                  onPress={closeBottomSheet}
                  name="arrow-left"
                  size={30}
                />
                <View style={{ alignItems: "center" }}>
                  <Carousel
                    data={imagePath}
                    renderItem={({ item }) => (
                      <Image
                        source={{
                          uri: item,
                        }}
                        style={{
                          width: "100%",
                          height: 300,
                          resizeMode: "cover",
                        }}
                      />
                    )}
                    itemWidth={Dimensions.get("window").width}
                    autoplay
                    pagination
                    autoplayDelay={1000}
                  />
                </View>

                <View style={{ ...styles.container }}>
                  <Text style={styles.sneakerTitle}>{sneaker?.name}</Text>

                  <View style={{ ...styles.sneakerParams }}>
                    <Text style={styles.soldCount}>
                      {sneaker?.soldCount} продано
                    </Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        style={{ color: "#101010" }}
                        solid
                        name="star"
                        size={20}
                      />
                      <Text>{sneaker?.rating}</Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#ededed",
                        marginVertical: 20,
                      }}
                    />

                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Описание
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        {sneaker?.description || "lorem"}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          Размер
                        </Text>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {modelSize.map((size, idx) => {
                            return (
                              <TouchableOpacity
                                key={size.id}
                                onPress={() => {
                                  onFocus(idx);
                                }}
                                style={{}}
                              >
                                <Text
                                  style={{
                                    ...styles.sneakerSize,
                                    color:
                                      focus === idx &&
                                      size?.sneaker
                                        .map((size) => size.name)
                                        .includes(sneaker?.name)
                                        ? "white"
                                        : "black",
                                    borderColor: size?.sneaker
                                      .map((size) => size.name)
                                      .includes(sneaker?.name)
                                      ? "black"
                                      : "#6f7071",
                                    opacity: size?.sneaker
                                      .map((size) => size.name)
                                      .includes(sneaker?.name)
                                      ? 1
                                      : 0.2,
                                    marginLeft: idx !== 0 ? 10 : 0,
                                    backgroundColor:
                                      focus === idx &&
                                      size?.sneaker
                                        .map((size) => size.name)
                                        .includes(sneaker?.name)
                                        ? "#101010"
                                        : "#fff",
                                  }}
                                >
                                  {size.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        {!modelSize[focus] ? (
                          <Text
                            style={{
                              flex: 1,
                              textAlign: "center",
                              marginTop: 20,
                              borderWidth: 1,
                              borderColor: "#ff9095",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ff9095",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            Пожалуйста, выберите размер
                          </Text>
                        ) : !modelSize[focus]?.sneaker
                            .map((sneaker) => sneaker?.name)
                            .includes(sneaker?.name) ? (
                          <Text
                            style={{
                              flex: 1,
                              textAlign: "center",
                              marginTop: 20,
                              borderWidth: 1,
                              borderColor: "#ff9095",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ff9095",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            На данный момент размера нет в наличии
                          </Text>
                        ) : (
                          modelSize[focus]?.sneaker
                            .map((sneaker) => sneaker?.name)
                            .includes(sneaker?.name) && (
                            <Text
                              style={{
                                flex: 1,
                                textAlign: "center",
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: "#1dff77",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#1dff77",
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              Размер есть в наличии
                            </Text>
                          )
                        )}
                      </View>
                    </View>

                    <View style={{ ...styles.containerItem }}>
                      <View>
                        <Text style={{ ...styles.priceTitle }}>
                          Итоговая цена
                        </Text>

                        {sneaker?.offerPrice ? (
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...styles.sneakerPrice,
                                fontSize: 14,
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
                            {parseFloat(
                              +sneaker?.price * currentPrice
                            ).toLocaleString("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                            })}
                          </Text>
                        )}
                      </View>

                      <View>
                        <TouchableHighlight
                          underlayColor={"#393939"}
                          style={{
                            ...styles.button,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 3,
                            elevation: 5,
                          }}
                          onPress={() => {
                            validationToAdd();
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              color={
                                cartSneaker.items
                                  .map((item) => item.name)
                                  .includes(sneaker?.name)
                                  ? "lightgreen"
                                  : "white"
                              }
                              solid
                              name="shopping-bag"
                              size={20}
                              style={{ marginRight: 15 }}
                            />
                            <Text
                              style={{
                                color: cartSneaker.items
                                  .map((item) => item.name)
                                  .includes(sneaker?.name)
                                  ? "lightgreen"
                                  : "white",
                                fontWeight: "bold",
                                fontSize: 15,
                              }}
                            >
                              {cartSneaker.items
                                .map((item) => item.size)
                                .includes(sneaker?.name)
                                ? "In cart"
                                : "Add to cart"}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },

  containerItem: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sneakerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  sneakerParams: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  sneakerSize: {
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 5,
  },

  priceTitle: {
    color: "#c1c1c1",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#101010",
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 50,
    textAlign: "center",
  },
});
