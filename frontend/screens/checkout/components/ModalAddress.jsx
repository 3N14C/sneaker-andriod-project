import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../../redux/address/address.slice";
import { selectAddressItem } from "../../../hooks/useSelector";

export default function ModalAddress({ modalVisible, closeModal }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  const addressItem = useSelector(selectAddressItem);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && street && city && zipCode) {
      dispatch(
        addAddress({
          name: name,
          city: city,
          street: street,
          zipCode: zipCode,
        })
      );
      closeModal();
      setStreet("");
      setCity("");
      setZipCode("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
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
              backgroundColor: "#fff",
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 20,
              borderRadius: 10,
            }}
          >
            <Icon onPress={closeModal} name="close" size={20} />

            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text>Адрес доставки</Text>

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Название Категории"
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  width: "100%",
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              />

              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder={`Город`}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  width: "100%",
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              />

              <TextInput
                value={street}
                onChangeText={setStreet}
                placeholder="Улица, дом, квартира"
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  width: "100%",
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              />

              <TextInput
                value={zipCode}
                onChangeText={setZipCode}
                placeholder={`Индекс`}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  width: "100%",
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              />

              <DropDownPicker
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
                open={open}
                value={name}
                setOpen={() => setOpen(!open)}
                items={addressItem.address.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
                onSelectItem={(item) => {
                  setName(item.value);
                  setCity(addressItem.address[0].city);
                  setZipCode(addressItem.address[0].zipCode);
                  setStreet(addressItem.address.map((item) => item));
                }}
                dropDownDirection="BOTTOM"
                dropDownContainerStyle={{
                  width: "100%",
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: "#000",
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 5,
                  marginVertical: 40,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Сохранить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
