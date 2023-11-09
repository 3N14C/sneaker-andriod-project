import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";

import * as ImagePicker from "expo-image-picker";
import { brand } from "../../../redux/brand";
import { Toast } from "react-native-toast-notifications";

export default function ModalCreateBrand({ isVisible, onClose }) {
  const [name, setName] = React.useState("");
  const [logo, setLogo] = React.useState(null);

  const { data = [], refetch } = brand.useGetAllQuery();
  const [createBrand] = brand.useCreateBrandMutation();

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const handleCreateBrand = () => {
    if (data.some((brand) => brand.name === name)) {
      Toast.show(`Бренд с таким названием (${name}) уже существует`, {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
      setName("");
      setLogo(null);
      return;
    }

    if (logo === null) {
      Toast.show(`Необходимо выбрать изображение`, {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
      return;
    }

    if (name && logo) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", {
        uri: logo,
        name: "logo.png",
        type: "image/png",
      });

      try {
        createBrand(formData).unwrap();
        refetch();
        Toast.show(`Бренд создан: ${name}`, {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "zoom-in",
        });
        setName("");
        setLogo(null);
      } catch (e) {
        console.log({
          message: e.message,
        });
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Название бренда"
            style={{ ...styles.modalText }}
          />
          <TouchableHighlight underlayColor="none" onPress={handleImageUpload}>
            <View>
              <Text
                style={{
                  ...styles.modalText,
                  backgroundColor: "gray",
                  color: "white",
                }}
              >
                Выбрать изображение
              </Text>
              {logo && (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: logo }}
                    style={{ width: 200, height: 200 }}
                  />
                  {logo !== null && (
                    <>
                      <Text
                        onPress={() => {
                          setLogo(null);
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          zIndex: 20,
                          fontSize: 40,
                          color: "red",
                        }}
                      >
                        X
                      </Text>
                    </>
                  )}
                </View>
              )}
            </View>
          </TouchableHighlight>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {
              onClose();
              setName("");
              setLogo(null);
            }}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleCreateBrand();
              onClose();
            }}>
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: 200,
    height: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
