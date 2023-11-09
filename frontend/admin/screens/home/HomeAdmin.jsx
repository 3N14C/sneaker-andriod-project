import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { goodsApi } from "../../../redux/goodsApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeAdmin({ navigation }) {
  const [search, setSearch] = React.useState("");

  const { data = [], refetch } = goodsApi.useGetUsersQuery();
  const {data: getUserByUsername, isLoading, isError} = goodsApi.useGetByUsernameQuery(search)

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const handleLogout = () => {
    AsyncStorage.removeItem("user", (err) => {
      if (err) {
        console.log(err);
      }
    }).then(() => {
      navigation.navigate("Login");
    });
  };

  const handleSearch = () => {
    if (search === getUserByUsername?.username) {
      setSearch(search);
    } else if (search !== getUserByUsername?.username) {
      setSearch('')
    } else if (search === "") {
      setSearch('');
    }
  }

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <TextInput
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        placeholder="Найти пользователя по имени"
        style={{
          ...styles.search,
        }}
      />

      <View style={{ ...styles.userContainer }}>
        {search !== getUserByUsername?.username ? (
          <>
            {data.map(
              (user) =>
                user.role === "USER" && (
                  <TouchableOpacity key={user?.id}>
                    <View style={{ ...styles.user }}>
                      <Image
                        style={{ width: 35, height: 35, borderRadius: 50 }}
                        source={{
                          uri: user?.avatar
                            ? user?.avatar
                            : "https://i.pravatar.cc",
                        }}
                      />

                      <View>
                        <Text>{user?.username}</Text>
                        <Text>{user?.email}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            )}
          </>
        ) : (
          <>
            {isLoading && <Text>Загрузка...</Text>}
            {/* {isError && <Text>Пользователь не найден</Text>} */}
            {getUserByUsername && (
              <TouchableOpacity>
                <View style={{ ...styles.user }}>
                  <Image
                    style={{ width: 35, height: 35, borderRadius: 50 }}
                    source={{
                      uri: getUserByUsername?.avatar
                        ? getUserByUsername?.avatar
                        : "https://i.pravatar.cc",
                    }}
                  />

                  <View>
                    <Text>{getUserByUsername?.username}</Text>
                    <Text>{getUserByUsername?.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          ...styles.logout,
        }}
      >
        <Text
          style={{
            ...styles.logoutText,
          }}
        >
          Выйти
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },

  search: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderColor: "#f5f5f5",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 20,
  },

  userContainer: {
    gap: 20,
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },

  logout: {
    position: "absolute",
    bottom: 40,
    width: "50%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
