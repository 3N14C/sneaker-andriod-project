import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Layout = ({ activeOrders, completedOrders }) => {
  const [focus, setFocus] = React.useState("Активные");

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setFocus("Активные");
          }}
        >
          <Text
            style={{
              ...styles.navbarItem,
              color: focus === "Активные" ? "rgb( 69, 69, 69)" : "#c2c2c2",
            }}
          >
            Активные
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFocus("Завершенные");
          }}
        >
          <Text
            style={{
              ...styles.navbarItem,
              marginLeft: 70,
              color: focus === "Завершенные" ? "rgb( 69, 69, 69)" : "#c2c2c2",
            }}
          >
            Завершенные
          </Text>
        </TouchableOpacity>
      </View>

      <View>{focus === "Активные" ? activeOrders : completedOrders}</View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  navbarItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(69, 69, 69)",
  },
});
