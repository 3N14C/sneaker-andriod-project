import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { brand } from "../../../../redux/brand";
import { sizeSneaker } from "../../../../redux/size";
import { sneaker } from "../../../../redux/sneaker";

const AddSneakerAdmin = ({ openModal, closeModal }) => {
  const [focus, setFocus] = React.useState(false);
  const [showOffer, setShowOffer] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [brandName, setBrandName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [sizeNumber, setSizeNumber] = React.useState("");
  const [offerPrice, setOfferPrice] = React.useState("");

  const { data: brandData = [], refetch } = brand.useGetAllQuery();
  const {data: sizeData = []} = sizeSneaker.useGetSizesQuery()
  const [createSneaker] = sneaker.useCreateSneakerMutation();

  const onFocus = (idx) => {
    if (idx === focus) {
      setFocus(false);
    } else {
      setFocus(idx);
    }
  }

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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Добавить
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Название Кроссовка
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              width: 300,
            }}
            value={name}
            onChangeText={setName}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Brand
          </Text>
          {brandData.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              onPress={() => {
                setBrandName(brand.name);
              }}
              style={{
                marginBottom: 10,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 35, height: 35, borderRadius: 50 }}
                  source={{ uri: brand.logo }}
                />
                <Text>{brand.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Price
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={price}
            onChangeText={setPrice}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Size
          </Text>
          {sizeData.map((size, idx) => (
            <TouchableOpacity
              key={size.id}
              onPress={() => {
                onFocus(idx);
                setSizeNumber(size.name);
              }}
              style={{}}
            >
              <Text
                style={{
                  ...styles.sneakerSize,
                  backgroundColor: focus === idx ? "#000" : "#fff",
                  color: focus === idx ? "#fff" : "#000",
                }}
              >
                {size.name}
              </Text>
            </TouchableOpacity>
          ))}
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Offer
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            value={offerPrice}
            onChangeText={setOfferPrice}
          />

          <TouchableOpacity onPress={handleImageUpload}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Upload Image
            </Text>

            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 10,
                }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              handleCreateSneaker();
              closeModal();
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sneakerSize: {
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
  },
});

export default AddSneakerAdmin;
