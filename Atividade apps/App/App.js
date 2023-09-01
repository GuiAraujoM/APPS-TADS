import { View } from 'react-native';
import { useState, useEffect } from 'react';
import LoginScreen from './src/screens/Login';
import PrivateScreen from "./src/screens/Private";
import PublicScreen from "./src/screens/Public";
import TokenContext, { TokenProvider } from "./src/contexts/TokenContext";

export default function App() {
  const [activeScreen, setActiveScreen] = useState('LOGIN')

  return (
    <TokenProvider>
      <View>
        {activeScreen === "LOGIN" && (
          <LoginScreen
            //goTo={(praOnde) => setActiveScreen(praOnde)} // pode ser assim tambem
            navigate={setActiveScreen}
          />
        )}

        {activeScreen === "PUBLIC" && (
          <PublicScreen
            navigate={setActiveScreen}
          />
        )}

        {activeScreen === "PRIVATE" && (
          <PrivateScreen
            navigate={setActiveScreen}
          />
        )}
      </View>
    </TokenProvider>
  );
}