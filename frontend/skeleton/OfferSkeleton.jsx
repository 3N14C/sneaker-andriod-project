import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Rect } from 'react-native-svg'
import ContentLoader from 'react-content-loader/native'

export default function OfferSkeleton() {
  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width={335}
        height={100}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y="0" rx="8" ry="8" width="335" height="100" />
        <Rect x="20" y="20" rx="4" ry="4" width="100" height="10" />
        <Rect x="20" y="40" rx="4" ry="4" width="150" height="10" />
      </ContentLoader>
    </View>
  );
}

const styles = StyleSheet.create({})