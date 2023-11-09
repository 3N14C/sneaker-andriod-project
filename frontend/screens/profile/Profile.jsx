import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileSettings from "./components/ProfileSettings";
import * as ImagePicker from "expo-image-picker";
import { goodsApi } from "../../redux/goodsApi";

export default function Profile({ route, navigation }) {
  const [avatar, setAvatar] = React.useState(null);

  const { data } = route?.params;
  const [editUserById] = goodsApi.useUpdateUserByIdMutation();

  React.useEffect(() => {
    setAvatar(data?.avatar);
  }, [data?.avatar]);

  const handleLogout = () => {
    AsyncStorage.removeItem("user", (err) => {
      if (err) {
        console.log(err);
      }
    }).then(() => {
      navigation.navigate("Login");
    });
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleEditAvatar = () => {
    const formData = new FormData();
    formData.append("avatar", {
      uri: avatar,
      name: "avatar.png",
      type: "image/png",
    });

    try {
      editUserById({ id: data.id, avatar: formData }).unwrap();
      setAvatar(data.avatar);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.containerInner,
        }}
      >
        <View>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: avatar !== null ? avatar : data.avatar }}
          />
          <TouchableOpacity onPress={handleImageUpload}>
            <Icon
              name="edit"
              size={20}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>{data.username}</Text>
      </View>

      <View style={{ ...styles.line }} />

      <ProfileSettings
        route={data}
        editProfile={() => navigation.navigate("EditProfile")}
        editPayment={() => navigation.navigate("SettingsPayment", { route: data })}
        logout={handleLogout}
      />

      <TouchableHighlight
        onPress={handleEditAvatar}
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
          Сохранить
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  containerInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    fontWeight: "bold",
    fontSize: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
});
