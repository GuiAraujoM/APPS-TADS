import { Text, View, StyleSheet, CheckBox } from "react-native";
import { useState } from "react";

export default function FinalScreen(props) {

  const [questions, setQuestions] = useState(props.callback.questions);

  return (
    <View style = {style.container}>
      <View>
        <Text style={style.title}>QUIZ</Text>
        <Text style={style.title}>Result!</Text>
      </View>
      
      {questions.map((question) => (
        <View key={question.id}>
          {question.isCorrect ? <Text style={{color: "green"}}>Correct: {question.explanation}</Text> : <Text style={{color: "red"}}>Incorrect: {question.explanation}</Text>}
          <Text>Correct answers: {JSON.stringify(question.correct_answers)}
          </Text>
          <Text>{question.question}</Text>
          {Object.keys(question.answers).map((answerKey) =>
            question.answers[answerKey] !== null && (
              <View key={answerKey} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  key={answerKey}
                  value={question.selected.includes(answerKey)}
                />
                <Text>{question.answers[answerKey]}</Text>
              </View>
            )
          )}
          <hr />
        </View>
      ))}

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