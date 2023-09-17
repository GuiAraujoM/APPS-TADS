import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";

export default function CustomInput(props) {
    return (
        <View style={style.container}>
            <View style={style.label}><Text>{props.label}</Text></View>
            <TextInput style={style.input} onChangeText={props.onChangeText}></TextInput>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 12,
        padding: 10,
        height: 40
    },
    input: {
        height: 40,
        borderWidth: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})