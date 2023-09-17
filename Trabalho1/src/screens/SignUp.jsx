import { Text, TextInput, View, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { useState } from "react";

export default function SignupScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCaregory] = useState("");

  return (
    <View style = {style.container}>
      <View>
        <Text style={style.title}>Start</Text>
      </View>

      <CustomInput label="Name" onChangeText={setName} value={name}></CustomInput>
      <CustomInput label="Email" onChangeText={setEmail} value={email}></CustomInput>
      <CustomInput label="Category (Linux, BASH, DevOps, Docker, Random)" onChangeText={setCaregory} value={category}></CustomInput>
      <Button title="Enviar" onPress={() => {
        props.setCallback({
          "name": name,
          "email": email,
          "category": category,
          "activeScreen": "QUIZ"
        })
        }}></Button>

    </View>  
  )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    title: {
      fontSize: 18,
      color: "#000",
      textAlign: "center",
      backgroundColor: "rgb(245, 245, 245)",
   }
})