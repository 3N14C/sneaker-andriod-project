import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { brand } from "../../../redux/brand";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ModalCreateBrand from "../components/ModalCreateBrand";
import ModalRemoveBrand from "../components/ModalRemoveBrand";

export default function BrandAdmin() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalCreateBrandVisible, setIsModalCreateBrandVisible] = React.useState(false);

  const { data = [], refetch } = brand.useGetAllQuery();

  const navigation = useNavigation();

  useFocusEffect(() => {
    refetch();
  });

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 40,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Список существующих брендов:
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "normal",
          marginBottom: 20,
          color: "gray",
        }}
      >
        Нажмите на бренд чтобы его удалить
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 40,
        }}
      >
        <ModalRemoveBrand
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />

        {data.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            onPress={() => {
              handleOpenModal();
              navigation.setParams({
                data: brand,
              });
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
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <ModalCreateBrand
          isVisible={isModalCreateBrandVisible}
          onClose={() => setIsModalCreateBrandVisible(false)}
        />
        <TouchableHighlight
          onPress={() => {
            setIsModalCreateBrandVisible(true);
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "normal",
            }}
          >
            Добавить бренд
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
