import { StyleSheet, Text,Pressable } from 'react-native'
import React from 'react'

const Button = ({onPressFunc,title}) => {
  return (
    <Pressable
        onPress={onPressFunc}
          style={styles.continueBtn}
        >
          <Text>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    continueBtn:{
        backgroundColor: "#FFC72C",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    }
})