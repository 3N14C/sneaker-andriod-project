import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Layout = ({ children }) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

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
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              ...styles.navbarItem,
            }}
          >
            Активные
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              ...styles.navbarItem,
              marginLeft: 70,
            }}
          >
            Завершенные
          </Text>
        </TouchableOpacity>
      </View>

      <View>{children}</View>
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
