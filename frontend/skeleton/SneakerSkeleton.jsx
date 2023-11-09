import { StyleSheet, View } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function SneakerSkeleton() {
  return (
    <View style={{ marginBottom: 30 }}>
      <ContentLoader
        speed={1}
        width={150}
        height={100}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y="0" rx="8" ry="8" width="150" height="100" />
      </ContentLoader>
    </View>
  );
}

const styles = StyleSheet.create({});
