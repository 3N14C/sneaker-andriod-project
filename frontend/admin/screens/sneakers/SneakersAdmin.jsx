import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { brand } from "../../../redux/brand";
import { Toast } from "react-native-toast-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { sneaker } from "../../../redux/sneaker";
import AddSneakerAdmin from "./components/AddSneakerAdmin";
import Icon from 'react-native-vector-icons/FontAwesome5'
import useCurrentPrice from "../../../hooks/useCurrentPrice";
import SneakerSkeleton from "../../../skeleton/SneakerSkeleton";
import { ModalSneaker } from "../../../screens/home/components/BottomModal/ModalSneaker";

export default function SneakersAdmin() {
  const [focus, setFocus] = React.useState(null || "Все");
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    data: brandSneaker = [],
    isLoading,
    refetch,
  } = brand.useGetAllQuery();

  const currentPrice = useCurrentPrice()

  const [createSneaker] = sneaker.useCreateSneakerMutation();
  const [removeSneaker] = sneaker.useRemoveSneakerMutation();

  useFocusEffect(() => {
    refetch()
  });

  const onFocus = (idx) => {
    if (focus === idx) {
      setFocus(false);
    } else {
      setFocus(idx);
    }
  };

  // const uniqueData = brandSneaker.map((brand) => {
  //   return brand?.sneaker.reduce((acc, obj) => {
  //     const found = acc.find((item) => item.name === obj.name);
  //     if (!found) {
  //       acc.push(obj);
  //     }
  //     return acc;
  //   }, []);
  // });
  

  const handleRemoveSneaker = (id) => {
    try {
      Toast.show(`Кроссовок с ID: ${id} удален`, {
        type: "warning",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
      removeSneaker(id);
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AddSneakerAdmin
        openModal={modalVisible}
        closeModal={() => setModalVisible(false)}
      />

      <TouchableHighlight
        underlayColor={"#000"}
        onPress={() => setModalVisible(true)}
        style={{
          ...styles.add_sneaker,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>Добавить кроссовок</Text>
      </TouchableHighlight>
      <ScrollView
        style={{ marginTop: 20, marginBottom: 20 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollbar}>
          <Text
            onPress={() => setFocus("Все")}
            style={{
              color: focus === "Все" ? "white" : "black",
              backgroundColor: focus === "Все" ? "black" : "white",
              ...styles.scrollbar_item,
              marginRight: 15,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            Все
          </Text>
          {brandSneaker.map((item, idx) => (
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View >
          {/* <ModalSneaker
            modalVisible={ modalVisible }
            closeBottomSheet={ () => setModalVisible(false) }
          /> */}

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
              {brandSneaker.map((item, idx) => {
                if (focus === idx)
                  return (
                    <View key={item.id} style={{ ...styles.container_item }}>
                      {item.sneaker.map((sneaker, idx) => {
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
                                  <Image
                                    style={{
                                      width: 100,
                                      height: 100,
                                      zIndex: 10,
                                    }}
                                    source={{ uri: sneaker.image[0].path }}
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

                if (focus === "Все")
                  return (
                    <View key={item.id} style={{ ...styles.container_item }}>
                      {item?.sneaker.map((sneaker, idx) => {
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
                                  <Image
                                    style={{ width: 100, height: 100 }}
                                    source={{ uri: sneaker.image[0].path }}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerList: { 
    marginTop: 140
  },

  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },

  scrollbar: {
    flex: 1,
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
