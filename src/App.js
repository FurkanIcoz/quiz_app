import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
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
        if (timer === 29) {
          setCanAnswer(true);
        }
        if (timer === 0) {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const answer = "Cevap Verilmedi";
            setUserAnswers((p) => [
              ...p,
              { question: questions[currentQuestionIndex]?.title, answer },
            ]);
            setTimer(30);
            setCanAnswer(false);
            setSelectedOption("");
          } else {
            const answer = "Cevap Verilmedi";
            setUserAnswers((p) => [
              ...p,
              { question: questions[currentQuestionIndex]?.title, answer },
            ]);
            setShowResult(true);
          }
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentQuestionIndex, questions]);

  const handleAnswerClick = (answer) => {
    if (canAnswer) {
      if (answer === null) {
        answer = "Cevap Verilmedi";
      }
      setUserAnswers((p) => [
        ...p,
        { question: questions[currentQuestionIndex]?.title, answer },
      ]);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setCanAnswer(false);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setTimer(30);
    setShowResult(false);
    setSelectedOption("");
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
  if (showResult) {
    return <ResultPage userAnswers={userAnswers} onRestart={handleRestart} />;
  }

  //button, floatingActionButton, Divider, Icons, MaterialIcons, table
  //typography, alert, circularProgress, Card, Container

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2196F3, #64B5F6)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "700px",
          height: "500px",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "40px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#1976D2", marginBottom: "20px" }}
        >
          Quiz App
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#BBDEFB",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Kalan Süre: {timer} saniye
        </Typography>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1976D2" }}
          >
            {currentQuestionIndex + 1}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#BBDEFB", marginLeft: 1, fontWeight: "bold" }}
          >
            / 10
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ color: "#333", marginBottom: "30px" }}>
          {questions[currentQuestionIndex]?.title}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Button
            fullWidth
            onClick={() =>
              handleOptionSelect(questions[currentQuestionIndex]?.OptionA)
            }
            sx={{
              backgroundColor:
                selectedOption === questions[currentQuestionIndex]?.OptionA
                  ? "#90CAF9"
                  : "#E3F2FD",
              color: "#333",
              marginBottom: "15px",
              ":hover": { backgroundColor: "#BBDEFB" },
            }}
          >
            {questions[currentQuestionIndex]?.OptionA}
          </Button>
          <Button
            fullWidth
            onClick={() =>
              handleOptionSelect(questions[currentQuestionIndex]?.OptionB)
            }
            sx={{
              backgroundColor:
                selectedOption === questions[currentQuestionIndex]?.OptionB
                  ? "#90CAF9"
                  : "#E3F2FD",
              color: "#333",
              marginBottom: "15px",
              ":hover": { backgroundColor: "#BBDEFB" },
            }}
          >
            {questions[currentQuestionIndex]?.OptionB}
          </Button>
          <Button
            fullWidth
            onClick={() =>
              handleOptionSelect(questions[currentQuestionIndex]?.OptionC)
            }
            sx={{
              backgroundColor:
                selectedOption === questions[currentQuestionIndex]?.OptionC
                  ? "#90CAF9"
                  : "#E3F2FD",
              color: "#333",
              marginBottom: "15px",
              ":hover": { backgroundColor: "#BBDEFB" },
            }}
          >
            {questions[currentQuestionIndex]?.OptionC}
          </Button>
          <Button
            fullWidth
            onClick={() =>
              handleOptionSelect(questions[currentQuestionIndex]?.OptionD)
            }
            sx={{
              backgroundColor:
                selectedOption === questions[currentQuestionIndex]?.OptionD
                  ? "#90CAF9"
                  : "#E3F2FD",
              color: "#333",
              marginBottom: "30px",
              ":hover": { backgroundColor: "#BBDEFB" },
            }}
          >
            {questions[currentQuestionIndex]?.OptionD}
          </Button>
        </Box>
        {canAnswer && (
          <Button
            variant="contained"
            onClick={() => handleAnswerClick(selectedOption)}
            sx={{
              width: "200px",
              backgroundColor: "#1976D2",
              color: "#fff",
              ":hover": { backgroundColor: "#115293" },
            }}
          >
            Cevabı Onayla
          </Button>
        )}
        {!canAnswer && (
          <Button
            disabled="false"
            variant="contained"
            onClick={() => handleAnswerClick(selectedOption)}
            sx={{
              width: "200px",
              backgroundColor: "#1976D2",
              color: "#fff",
              ":hover": { backgroundColor: "#115293" },
            }}
          >
            Cevabı Onayla
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default App;

const ResultPage = ({ userAnswers, onRestart }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2196F3, #64B5F6)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "700px",
          height: "500px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "40px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#1976D2", marginBottom: "20px" }}
        >
          Test Bitti
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxHeight: "350px" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#E3F2FD" }}
                >
                  Soru
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#E3F2FD" }}
                >
                  Cevap
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userAnswers.map((answer, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell>{answer.question}</TableCell>
                  <TableCell>
                    {answer.answer ? answer.answer : "Cevap Verilmedi"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={onRestart}
          sx={{
            marginTop: "20px",
            backgroundColor: "#1976D2",
            color: "#fff",
            ":hover": { backgroundColor: "#115293" },
          }}
        >
          Tekrar Test Yap
        </Button>
      </Box>
    </Container>
  );
};
