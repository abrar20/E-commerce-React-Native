import { StyleSheet, Text, View,Pressable,TextInput } from 'react-native'
import React from 'react'
import {Ionicons,AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({back}) {
    const navigation = useNavigation();
  return (
    <View
    style={styles.backHeader}
  >
      {back && <Ionicons name="arrow-back" size={24} color='black' onPress={() => navigation.navigate('Home')}></Ionicons>}
    <Pressable
      style={styles.inputContainer}
    >
      <AntDesign
        style={{ paddingLeft: 10 }}
        name="search1"
        size={22}
        color="black"
      />
      <TextInput placeholder="Search Product" />
    </Pressable>

  </View>
  )
}

const styles = StyleSheet.create({
    backHeader:{
        backgroundColor: "#00CED1",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      },
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 38,
        flex: 1,
      }
})