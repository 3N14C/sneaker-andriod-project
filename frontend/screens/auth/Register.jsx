import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { goodsApi } from "../../redux/goodsApi";
import InputRegisterFields from "./components/InputRegisterFields";

export default function Register({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const [createUser, { isLoading }] = goodsApi.useCreateUserMutation()

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCreateUser = async () => {
    await createUser({ username, email, password })
    .then(() => {
      navigation.navigate("Login")
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Text style={styles.title}>Create Your Account</Text>
      </Animated.View>

      <View>
        <InputRegisterFields
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          username={username}
          email={email}
          password={password}
        />

        <TouchableHighlight
          style={styles.touch_button}
          underlayColor={"#393939"}
          onPress={handleCreateUser}
        >
          {isLoading ? (
            <Text style={styles.touch_button_title}>Loading...</Text>
          ) : (
            <Text style={styles.touch_button_title}>Register</Text>
          )}
        </TouchableHighlight>

        <View style={styles.another_block}>
          <Text style={styles.text_reset_password}>Remember me</Text>

          <View style={styles.register_block}>
            <Text style={styles.register_title}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.register_button}
            >
              Sign in
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
    marginTop: 70,
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
