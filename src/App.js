import "./App.css";
import React, { isValidElement, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [canAnswer, setCanAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionId = Math.floor(Math.random() * 10);

        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=" + questionId
        );
        if (response.ok) {
          const data = await response.json();
          const questionsApp = [];
          data.map((datum) => {
            const abcd = datum.body.split("\n");
            let qst = {
              userId: datum.userId,
              id: datum.id,
              title: datum.title,
              OptionA: abcd[0],
              OptionB: abcd[1],
              OptionC: abcd[2],
              OptionD: abcd[3],
            };
            questionsApp.push(qst);
          });
          setQuestions(questionsApp);
        }

        setLoading(false);
      } catch (error) {}
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const interval = setInterval(() => {
        setTimer((p) => p - 1);
        if (timer === 20) {
          setCanAnswer(true);
        }
        if (timer === 0) {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimer(30);
            setCanAnswer(false);
          }
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentQuestionIndex, questions]);

  const handleAnswerClick = (answer) => {
    if (canAnswer) {
      setUserAnswers((p) => [
        ...p,
        { question: questions[currentQuestionIndex].title, answer },
      ]);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(30);
    setCanAnswer(false);
  };
  if (loading) {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ClipLoader color={"#123abc"} loading={loading} size={50} />
      </div>
    );
  }
  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Test Bitti</h1>
        <table>
          <thead>
            <tr>
              <th>Soru</th>
              <th>Cevap</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((answer, index) => (
              <tr key={index}>
                <td>{answer.question}</td>
                <td>{answer.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>{questions[currentQuestionIndex].title}</h1>
      <p>Zaman: {timer}</p>
      <ul>
        <li>
          <button
            disabled={!canAnswer}
            onClick={() =>
              handleAnswerClick(questions[currentQuestionIndex].OptionA)
            }
          >
            {questions[currentQuestionIndex].OptionA}
          </button>
        </li>
        <li>
          <button
            disabled={!canAnswer}
            onClick={() =>
              handleAnswerClick(questions[currentQuestionIndex].OptionB)
            }
          >
            {questions[currentQuestionIndex].OptionB}
          </button>
        </li>
        <li>
          <button
            disabled={!canAnswer}
            onClick={() =>
              handleAnswerClick(questions[currentQuestionIndex].OptionC)
            }
          >
            {questions[currentQuestionIndex].OptionC}
          </button>
        </li>
        <li>
          <button
            disabled={!canAnswer}
            onClick={() =>
              handleAnswerClick(questions[currentQuestionIndex].OptionD)
            }
          >
            {questions[currentQuestionIndex].OptionD}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default App;
