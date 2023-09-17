import { Text, TextInput, View, StyleSheet, CheckBox } from "react-native";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

export default function QuizScreen(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Marque pelo menos uma alterantiva.');

  const handleChange = (answerKey) => {
    if(questions[currentQuestion].multiple_correct_answers == "false"){
      setSelected([answerKey]);
    }else{
      if(selected.includes(answerKey)){
        const newArray = selected.filter(item => item != answerKey);
        setSelected(newArray);
      }else{
        setSelected([...selected, answerKey]);
      }
    }
  };

  //https://quizapi.io/
  useEffect(() => {
    let url = 'https://quizapi.io/api/v1/questions?limit=10';
    if(props.callback.category != '' && props.callback.category != 'random'){
      url+='&category='+props.callback.category;
    }
    axios.get(
      url, 
      {headers: {"X-Api-Key": 'ACSMNl1sJJvgPmaGIjdf1SlBUjJ9VV2eIhlQGf44'}}
    ).then(response => {
      console.log('Resposta da API: ', response.data);
      console.log(JSON.stringify(response));
      setQuestions(response.data);      
    }).catch(error => {
      setErrorMessage(`${JSON.stringify(error.response)}`)
      setError(true);
    })
  }, [])

  const handleClick = () => {
    if(!selected.length > 0){ 
      setError(true);     
      return ;
    }

    questions[currentQuestion].selected = selected;
    
    selected.forEach(item => {
      questions[currentQuestion].isCorrect = false;
      if(questions[currentQuestion].correct_answers[item+"_correct"] == "true"){
        questions[currentQuestion].isCorrect = true;
      }
    })

    if(currentQuestion + 1 < questions.length){
      setCurrentQuestion(currentQuestion + 1);
    }else{
      props.setCallback({...props.callback, "activeScreen": "FINAL", questions});
    }

    setSelected([]);
    setError(false);
  }

  return (
    <View style = {style.container}>
      <View>
        <Text style={style.title}>QUIZ</Text>
        <Text style={style.title}>Answer the questions, {props.callback.name.toUpperCase()}!</Text>
      </View>
      
      {questions.length > 0 ? (
        <View>
          <Text>{questions[currentQuestion].question}</Text>
          {Object.keys(questions[currentQuestion].answers).map((answerKey) => 
            questions[currentQuestion].answers[answerKey] != null && (
            <View key={answerKey} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                key={answerKey}
                value={selected.includes(answerKey)}
                onChange={() => handleChange(answerKey)}
              />
              <Text>{questions[currentQuestion].answers[answerKey]}</Text>
            </View>
          ))}
          
          <Button title="Responder" onPress={() => handleClick()}></Button>
        </View>
      ) : (
        <Text>Carregando</Text>
      )}
      {error && <View style={{color:"red"}}>{errorMessage}</View>}
    </View>  
  )
}

// const questions = [{
//     "id": 1,
//     "question": "How to delete a directory in Linux?",
//     "description": "delete folder",
//     "answers": {
//       "answer_a": "ls",
//       "answer_b": "delete",
//       "answer_c": "remove",
//       "answer_d": "rmdir",
//       "answer_e": null,
//       "answer_f": null
//     },
//     "multiple_correct_answers": "false",
//     "correct_answers": {
//       "answer_a_correct": "false",
//       "answer_b_correct": "false",
//       "answer_c_correct": "false",
//       "answer_d_correct": "true",
//       "answer_e_correct": "false",
//       "answer_f_correct": "false"
//     },
//     "explanation": "rmdir deletes an empty directory",
//     "tip": null,
//     "tags": [],
//     "category": "linux",
//     "difficulty": "Easy"
//   }, {
//     "id": 2,
//     "question": "How to delete a directory in Linux?",
//     "description": "delete folder",
//     "answers": {
//       "answer_a": "ls",
//       "answer_b": "delete",
//       "answer_c": "remove",
//       "answer_d": "rmdir",
//       "answer_e": null,
//       "answer_f": null
//     },
//     "multiple_correct_answers": "false",
//     "correct_answers": {
//       "answer_a_correct": "false",
//       "answer_b_correct": "false",
//       "answer_c_correct": "false",
//       "answer_d_correct": "true",
//       "answer_e_correct": "false",
//       "answer_f_correct": "false"
//     },
//     "explanation": "rmdir deletes an empty directory",
//     "tip": null,
//     "tags": [],
//     "category": "linux",
//     "difficulty": "Easy"
//   }];


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