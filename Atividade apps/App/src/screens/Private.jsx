import { Text, View } from "react-native";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import axios from "axios";

export default function PrivateScreen(props) {
  const { token } = useContext(TokenContext);
  const [response, setResponse] = useState();

  async function makeCalloutToPrivateEndpoint() {
    try {
      const res = await axios.get(
        'http://localhost:3000/private', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': token,
        }
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse(error.response.data.message);
    }   
  }

  makeCalloutToPrivateEndpoint();

  return (
    <View>
      <Text>Tela privada</Text>
      <Text> { token } </Text>
      <Button
        title="Voltar"
        onPress={() => props.navigate('LOGIN')}
      />
      <Text> { response } </Text>
    </View>
  )
}