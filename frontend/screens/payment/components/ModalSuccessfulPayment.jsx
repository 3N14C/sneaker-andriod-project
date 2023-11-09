import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const ModalSuccessfulPayment = ({ modalVisible, closeModal }) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View
        style={{
          ...styles.modalContainer,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 40,
            paddingHorizontal: 90,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "rgb(40, 40, 40)",
              alignItems: "center",
              padding: 60,
              borderRadius: 100,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Icon name="shopping-cart" size={50} color="white" />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Оплата прошла успешно!
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              marginTop: 20,
            }}
          >
            Вы успешно выполнили заказ
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Заказы");
            }}
            style={{
              ...styles.button,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Перейти к заказам
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closeModal}
            style={{
              ...styles.button,
              backgroundColor: "rgb(231, 231, 231)",
            }}
          >
            <Text
              style={{
                color: "rgb(81, 83, 88)",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Показать квитанцию
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSuccessfulPayment;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  button: {
    backgroundColor: "black",
    padding: 20,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
