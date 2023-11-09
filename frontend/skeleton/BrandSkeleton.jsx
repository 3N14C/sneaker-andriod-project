import { StyleSheet, View } from 'react-native'
import React from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

export default function BrandSkeleton() {
  return (
    <View style={{}}>
      <ContentLoader
        speed={1}
        width={60}
        height={90}
        // viewBox="0 0 100 130"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Circle cx="35" cy="50" r="20" />
        <Rect x="15" y="80" rx="4" ry="4" width="40" height="10" />
      </ContentLoader>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})