import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditProfile = ({navigation}) => {
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Редактировать профиль',
    })
  }, [])

  return (
    <View>
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})