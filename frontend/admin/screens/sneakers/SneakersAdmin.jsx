import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { brand } from "../../../redux/brand";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { sneaker } from "../../../redux/sneaker";

export default function SneakersAdmin() {
  const [showOffer, setShowOffer] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [brandName, setBrandName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [sizeNumber, setSizeNumber] = React.useState("");
  const [offerPrice, setOfferPrice] = React.useState("");

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

  const uniqueData = brandSneaker.map((brand) => {
    return brand?.sneaker.reduce((acc, obj) => {
      const found = acc.find((item) => item.name === obj.name);
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
  });

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateSneaker = () => {
    if (name && brandName && price && sizeNumber && image) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brandName", brandName);
      formData.append("price", price);
      formData.append("sizeNumber", sizeNumber);
      offerPrice.length > 0 ? formData.append("offerPrice", offerPrice) : null;
      formData.append("image", {
        uri: image,
        name: "image.png",
        type: "image/png",
      });

      try {
        createSneaker(formData).unwrap();
        refetch();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleRemoveSneaker = (id) => {
    try {
      Toast.show(
        `Кроссовок с ID: ${id} удален`,
        {
          type: "warning",
          placement: "top",
          duration: 3000,
          animationType: "zoom-in",
        }
      )
      removeSneaker(id);
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hadleShowOffer = () => {
    setShowOffer(!showOffer);
  };

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
        }}
      >
        <>
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Добавить Кроссовок
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Название Кроссовок"
              style={{
                width: 200,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />

            <TextInput
              value={brandName}
              onChangeText={setBrandName}
              placeholder="Название Бренда"
              style={{
                width: 200,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Цена"
              style={{
                width: 200,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />

            <TextInput
              value={sizeNumber}
              onChangeText={setSizeNumber}
              placeholder="Размер"
              style={{
                width: 200,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />

            {showOffer ? (
              <TouchableOpacity
                onPress={hadleShowOffer}
                style={{
                  width: 200,
                  height: 40,
                  backgroundColor: "blue",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>Добавить скидку</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  value={offerPrice}
                  onChangeText={setOfferPrice}
                  placeholder="Скидка"
                  style={{
                    width: 200,
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                />
                <Text
                  onPress={() => {
                    hadleShowOffer();
                    !showOffer && setOfferPrice('')
                  }}
                  style={{ marginLeft: 10, color: "red", fontSize: 20 }}
                >
                  X
                </Text>
              </View>
            )}

            <Button title="Выбрать изображение" onPress={handleImageUpload} />

            <View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>

            <Button title="Submit" onPress={handleCreateSneaker} />
          </View>
        </>

        <View>
          {uniqueData.map((data) =>
            data.map((sneaker) => (
              <View
                key={sneaker.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 20,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Text>{sneaker.name}</Text>
                <Image
                  source={{ uri: sneaker.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Text
                  onPress={() => handleRemoveSneaker(sneaker.id)}
                  style={{
                    marginLeft: 20,
                    color: "red",
                    fontSize: 20,
                  }}
                >
                  X
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
});
