import { Text, View } from "react-native";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import axios from "axios";

export default function PublicScreen(props) {
  const { token } = useContext(TokenContext);
  const [response, setResponse] = useState();

  async function makeCalloutToPublicEndpoint() {
    const res = await axios.get(
      'http://localhost:3000/public', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    setResponse(res.data.message);
  }
  
  makeCalloutToPublicEndpoint()

  return (
    <View>
      <Text>Tela pública</Text>
      <Text> { token } </Text>
      <Button
        title="Voltar"
        onPress={() => props.navigate('LOGIN')}
      />
      <Text> { response } </Text>
    </View>
  )
}