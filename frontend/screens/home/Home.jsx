import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "./components/Header";
import Brand from "./components/Brand/Brand";
import Offer from "./components/offer/Offer";
import Popular from "./components/Popular/Popular";
import HomeAdmin from "../../admin/screens/home/HomeAdmin";
import Search from "../../componetns/Search.component";
import { sneaker } from "../../redux/sneaker";
import { brand } from "../../redux/brand";

export default function Home({ route, navigation }) {
  const { data } = route?.params;
  const {data: sneakerData = []} = sneaker.useGetAllQuery()

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {data.role !== "ADMIN" ? (
          <>
            <Header
              avatar={data.avatar}
              username={data.username}
              role={data.role}
            />

            <Search getSneakerData={sneakerData} />

            <View style={styles.offer}>
              <Text style={styles.title}>Специальные предложения</Text>

              <TouchableHighlight
                underlayColor={"transparent"}
                onPress={() => navigation.navigate("Special Offers")}
              >
                <Text
                  style={{
                    ...styles.title,
                    fontSize: 15,
                    maxWidth: "100%",
                    padding: 20,
                  }}
                >
                  Посмотреть все
                </Text>
              </TouchableHighlight>
            </View>

            <Offer />

            <Brand />

            <Popular />
            <StatusBar />
          </>
        ) : (
          <>
            <HomeAdmin />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 30,
    height: "100%",
    backgroundColor: "#fff",
  },

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

  title: {
    maxWidth: "40%",
    fontSize: 20,
    fontWeight: "bold",
  },

  offer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  
});
