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

export default function SneakersAdmin() {
  const [focus, setFocus] = React.useState(null || "All");
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    data: brandSneaker = [],
    isLoading,
    refetch,
  } = brand.useGetAllQuery();

  const [createSneaker] = sneaker.useCreateSneakerMutation();
  const [removeSneaker] = sneaker.useRemoveSneakerMutation();

  useFocusEffect(() => {
    refetch();
  });

  const onFocus = (idx) => {
    if (focus === idx) {
      setFocus(false);
    } else {
      setFocus(idx);
    }
  };

  const uniqueData = brandSneaker.map((brand) => {
    return brand?.sneaker.reduce((acc, obj) => {
      const found = acc.find((item) => item.name === obj.name);
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
  });

  

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

      <View style={styles.container}>
        <View>
          {brandSneaker.map((item, idx) => {
            if (focus === idx)
              return (
                <View key={item.id} style={{ ...styles.container_item }}>
                  {item.sneaker.map((sneaker, idx) => {
                    if (sneaker.soldCount > 6000 && sneaker.rating > "4.0")
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
                                    zIndex: 20,
                                  }}
                                  name="heart"
                                  size={15}
                                  onPress={() => {
                                    handleAddToFavorites(sneaker);
                                  }}
                                />
                                <Image
                                  style={{
                                    width: 100,
                                    height: 100,
                                    zIndex: 10,
                                  }}
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
                    if (sneaker.soldCount > 6000 && sneaker.rating > "4.0")
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
        </View>
      </View>
    </View>
    // <ScrollView>
    //   <View
    //     style={{
    //       ...styles.container,
    //     }}
    //   >
    //     <>
    //       <View
    //         style={{
    //           gap: 20,
    //         }}
    //       >
    //         <Text
    //           style={{
    //             fontSize: 20,
    //             fontWeight: "bold",
    //           }}
    //         >
    //           Добавить Кроссовок
    //         </Text>

    //         <TextInput
    //           value={name}
    //           onChangeText={setName}
    //           placeholder="Название Кроссовок"
    //           style={{
    //             width: 200,
    //             height: 40,
    //             borderColor: "gray",
    //             borderWidth: 1,
    //           }}
    //         />

    //         <TextInput
    //           value={brandName}
    //           onChangeText={setBrandName}
    //           placeholder="Название Бренда"
    //           style={{
    //             width: 200,
    //             height: 40,
    //             borderColor: "gray",
    //             borderWidth: 1,
    //           }}
    //         />

    //         <TextInput
    //           value={price}
    //           onChangeText={setPrice}
    //           placeholder="Цена"
    //           style={{
    //             width: 200,
    //             height: 40,
    //             borderColor: "gray",
    //             borderWidth: 1,
    //           }}
    //         />

    //         <TextInput
    //           value={sizeNumber}
    //           onChangeText={setSizeNumber}
    //           placeholder="Размер"
    //           style={{
    //             width: 200,
    //             height: 40,
    //             borderColor: "gray",
    //             borderWidth: 1,
    //           }}
    //         />

    //         {showOffer ? (
    //           <TouchableOpacity
    //             onPress={hadleShowOffer}
    //             style={{
    //               width: 200,
    //               height: 40,
    //               backgroundColor: "blue",
    //               alignItems: "center",
    //               justifyContent: "center",
    //             }}
    //           >
    //             <Text style={{ color: "white" }}>Добавить скидку</Text>
    //           </TouchableOpacity>
    //         ) : (
    //           <View style={{ flexDirection: "row", alignItems: "center" }}>
    //             <TextInput
    //               value={offerPrice}
    //               onChangeText={setOfferPrice}
    //               placeholder="Скидка"
    //               style={{
    //                 width: 200,
    //                 height: 40,
    //                 borderColor: "gray",
    //                 borderWidth: 1,
    //               }}
    //             />
    //             <Text
    //               onPress={() => {
    //                 hadleShowOffer();
    //                 !showOffer && setOfferPrice('')
    //               }}
    //               style={{ marginLeft: 10, color: "red", fontSize: 20 }}
    //             >
    //               X
    //             </Text>
    //           </View>
    //         )}

    //         <Button title="Выбрать изображение" onPress={handleImageUpload} />

    //         <View>
    //           {image && (
    //             <Image
    //               source={{ uri: image }}
    //               style={{ width: 200, height: 200 }}
    //             />
    //           )}
    //         </View>

    //         <Button title="Submit" onPress={handleCreateSneaker} />
    //       </View>
    //     </>

    //     <View>
    //       {uniqueData.map((brandSneaker) =>
    //         brandSneaker.map((sneaker) => (
    //           <View
    //             key={sneaker.id}
    //             style={{
    //               flexDirection: "row",
    //               alignItems: "center",
    //               paddingBottom: 20,
    //               paddingTop: 20,
    //               paddingLeft: 20,
    //               paddingRight: 20,
    //             }}
    //           >
    //             <Text>{sneaker.name}</Text>
    //             <Image
    //               source={{ uri: sneaker.image }}
    //               style={{ width: 100, height: 100 }}
    //             />
    //             <Text
    //               onPress={() => handleRemoveSneaker(sneaker.id)}
    //               style={{
    //                 marginLeft: 20,
    //                 color: "red",
    //                 fontSize: 20,
    //               }}
    //             >
    //               X
    //             </Text>
    //           </View>
    //         ))
    //       )}
    //     </View>
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
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
