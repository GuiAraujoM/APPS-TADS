import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button(props) {
  return (
    <TouchableOpacity
      style={style.container}
      onPress={props.onPress}
    >
      <Text style={style.title}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center',
    },
    container: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 10,
      margin: 10,
    },
})