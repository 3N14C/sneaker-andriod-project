import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileSettings = ({ editProfile, editPayment, logout, route }) => {
  return (
    <View
      style={{
        ...styles.profileSettings,
      }}
    >
      <TouchableOpacity onPress={editProfile}>
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon
              name="user"
              size={20}
              style={{
                color: "rgb(69, 69, 69)",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(69, 69, 69)",
              }}
            >
              Редактировать
            </Text>
          </View>

          <Icon
            name="chevron-right"
            style={{
              color: "rgb(69, 69, 69)",
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={editPayment}>
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon
              name="credit-card"
              size={20}
              style={{
                color: "rgb(69, 69, 69)",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(69, 69, 69)",
              }}
            >
              Оплата
            </Text>
          </View>

          <Icon
            name="chevron-right"
            style={{
              color: "rgb(69, 69, 69)",
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon
              name="sign-out"
              size={20}
              style={{
                color: "rgb(249, 130, 130)",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(249, 130, 130)",
              }}
            >
              Выйти
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  profileSettings: {
    flexDirection: "column",
    gap: 20,
  },
  profileSettingsItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
