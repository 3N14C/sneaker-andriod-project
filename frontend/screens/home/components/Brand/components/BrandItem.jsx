import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { brand } from "../../../../../redux/brand";
import { useNavigation } from "@react-navigation/native";
import BrandSkeleton from "../../../../../skeleton/BrandSkeleton";

export default function BrandItem() {
  const { data = [], isLoading } = brand.useGetAllQuery();

  const navigation = useNavigation();

  

  return (
    <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
      {isLoading ? (
        <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
        </View>
      ) : (
        <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
          {data.map((item, idx) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Category", { brand: item });
                }}
              >
                <View>
                  <View style={styles.logo}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{ uri: item.logo }}
                    />
                  </View>
                  <Text style={{ textAlign: "center" }}>
                    {item.name.length > 6
                      ? `${item.name.slice(0, 6)}...`
                      : item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
    backgroundColor: "#ececec",
    padding: 10,
    alignItems: "center",
  },

  brand_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
