import { View } from "react-native";
import { useState, useEffect } from "react";
import SignupScreen from "./src/screens/SignUp";
import QuizScreen from "./src/screens/Quiz";
import FinalScreen from "./src/screens/Final";

export default function App(props) {
  //const [activeScreen, setActiveScreen] = useState("SIGNUP");
  const [callback, setCallback] = useState({"activeScreen": "SIGNUP"});

  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: "auto"}}>
      {callback.activeScreen === "SIGNUP" && (
        <SignupScreen setCallback={setCallback} />
      )}

      {callback.activeScreen === "QUIZ" && (
        <QuizScreen setCallback={setCallback} callback={callback} />
      )}

      {callback.activeScreen === "FINAL" && (
        <FinalScreen setCallback={setCallback} callback={callback} />
      )}
    </View>
  );
}
