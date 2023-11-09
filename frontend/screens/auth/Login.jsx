import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { goodsApi } from "../../redux/goodsApi";
import InputLoginFields from "./components/InputLoginFields";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { favoritesSlice } from "../../redux/favourite/favourite.slice";

export default function Login({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginUser, { isLoading }] = goodsApi.useLoginUserMutation(
    email,
    password
  );
  const { data } = goodsApi.useGetUserByEmailQuery(email);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    AsyncStorage.getItem("user").then((value) => {
      if (value !== null) {
        navigation.navigate("Home", {
          data: JSON.parse(value),
        });
      } else {
        navigation.navigate("Login");
      }
    });
  };

  const handleLoginUser = async () => {
    if (data.email === email && data.password === password) {
      await loginUser({ email, password })
        .then(async () => {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(data)
          );
        })
        .then(() => {
          navigation.navigate("Home", {
            data
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Text style={styles.title}>Login to Your Account</Text>
      </Animated.View>

      <View>
        <InputLoginFields
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
        />

        <TouchableHighlight
          style={styles.touch_button}
          underlayColor={"#393939"}
          onPress={handleLoginUser}
        >
          {isLoading ? (
            <Text style={styles.touch_button_title}>Loading...</Text>
          ) : (
            <Text style={styles.touch_button_title}>Login</Text>
          )}
        </TouchableHighlight>

        <View style={styles.another_block}>
          <Text style={styles.text_reset_password}>Forgot your password?</Text>

          <View style={styles.register_block}>
            <Text style={styles.register_title}>Don't have an account?</Text>
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.register_button}
            >
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 200,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },

  touch_button: {
    marginTop: 140,
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
  },

  touch_button_title: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },

  text_reset_password: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    alignItems: "center",
  },

  another_block: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  register_block: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  register_title: {
    color: "#9e9e9e",
    fontWeight: "400",
    fontSize: 15,
  },

  register_button: {
    marginLeft: 10,
    color: "black",
    fontWeight: "600",
  },
});
