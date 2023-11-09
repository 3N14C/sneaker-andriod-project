import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { brand } from "../../../redux/brand";

export default function ModalRemoveBrand({ isVisible, onClose }) {
  const [removeBrand] = brand.useRemoveBrandMutation();

  const route = useRoute();
  const data = route?.params?.data;

  const handleRemoveBrand = (id) => {
    try {
      Toast.show(`Бренд удален: ${data?.name}`, {
        type: "warning",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      removeBrand(id);
      refetch();
    } catch (error) {
      console.log(error.message);
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
          <Text style={styles.modalText}>
            Вы действительно хотите удалить бренд {data?.name} ?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleRemoveBrand(data?.id);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Удалить</Text>
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
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
