import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import TodayOffer from "./components/TodayOffer";
import { useNavigation } from "@react-navigation/native";

export default function Offer() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableHighlight >
        <TodayOffer />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({});
