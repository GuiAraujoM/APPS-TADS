import { Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { TokenContext } from "../contexts/TokenContext";
import { useState, useContext } from "react";
import axios from "axios";

export default function LoginScreen(props) {

  const { token, setToken } = useContext(TokenContext);
  const [username, onChangeUsername] = useState();
  const [password, onChangePassword] = useState();

  const handleClickEvent = async () => {
    const response = await axios.post(
      'http://localhost:3000/auth', {
        username: username,
        password: password
      },{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

    const { access_token } = response.data;
    setToken(access_token);
  };

  return (
    <View>
      <Text> Login </Text>
      <Text> { token } </Text>

      <View
        style={{
          borderColor: '#000000',
          borderWidth: 1,
        }}
      >
        <TextInput
          onChangeText={onChangeUsername}
          value={username}
          name='Username'
        />
      </View>

      <View
        style={{
          borderColor: '#000000',
          borderWidth: 1,
        }}
      >
        <TextInput        
          onChangeText={onChangePassword}
          value={password}
          name='Password'
        />
      </View>

      <Button
        onPress={handleClickEvent}
        title='Clique para logar'
      />
      
      <Button
        title="Ir para tela pública"
        onPress={() => props.navigate('PUBLIC')}
      />
      <Button
        title="Ir para tela privada"
        onPress={() => props.navigate('PRIVATE')}
      />      
      
    </View>
  )
}