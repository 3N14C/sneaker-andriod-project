import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome5";

export default function InputRegisterFields({
  setUsername,
  setEmail,
  setPassword,
  username,
  email,
  password,
}) {
  const [focusedUsername, setFocusedUsername] = React.useState(false);
  const [focusedEmail, setFocusedEmail] = React.useState(false);
  const [focusedPassword, setFocusedPassword] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <View style={styles.input_fileds}>
      <View
        style={{
          ...styles.input_filed_item,
          borderColor: focusedUsername ? "black" : "lightgray",
          paddingVertical: focusedUsername ? 15 : 10,
        }}
      >
        <Icon
          style={{ marginRight: 10 }}
          color={focusedUsername ? "black" : "lightgray"}
          size={20}
          solid={true}
          name="user"
        />
        <TextInput
          onFocus={() => setFocusedUsername(true)}
          onBlur={() => setFocusedUsername(false)}
          autoCapitalize="none"
          style={{
            ...styles.input,
          }}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      </View>

      <View
        style={{
          ...styles.input_filed_item,
          borderColor: focusedEmail ? "black" : "lightgray",
          paddingVertical: focusedEmail ? 15 : 10,
        }}
      >
        <Icon
          style={{ marginRight: 10 }}
          color={focusedEmail ? "black" : "lightgray"}
          size={20}
          solid={true}
          name="envelope"
        />
        <TextInput
          onFocus={() => setFocusedEmail(true)}
          onBlur={() => setFocusedEmail(false)}
          autoCapitalize="none"
          style={{
            ...styles.input,
          }}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View
        style={{
          ...styles.input_filed_item,
          borderColor: focusedPassword ? "black" : "lightgray",
          paddingVertical: focusedPassword ? 15 : 10,
        }}
      >
        <Icon
          style={{ marginRight: 10 }}
          color={focusedPassword ? "black" : "lightgray"}
          size={20}
          solid={true}
          name="lock"
        />
        <TextInput
          onFocus={() => setFocusedPassword(true)}
          onBlur={() => setFocusedPassword(false)}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
        <Icon
          color={focusedPassword ? "black" : "lightgray"}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          name={secureTextEntry ? "eye-slash" : "eye"}
          size={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input_fileds: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  input_filed_item: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "100%",
    borderColor: "lightgray",
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
});
