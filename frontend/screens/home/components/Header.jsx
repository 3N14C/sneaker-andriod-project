import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export default function Header({username, avatar, role}) {
  const navigation = useNavigation()

  return (
    <View>
      <View style={styles.container_inner}>
        <View style={styles.profile}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 50 }}
            source={{ uri: avatar }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>С возвращением 👋</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        <View style={styles.toolbar}>
          <Icon style={{ marginRight: 20 }} name="bell" size={25} />
          <Icon
            onPress={() => navigation.navigate("FavouriteList")}
            name="heart"
            size={25}
          />
        </View>
      </View>

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({

  container_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "gray",
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
  },
});