import './App.css';
import React, { isValidElement, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 

function App() {

  const [questions,setQuestions] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetchQuestions = async()=>{
      try {
        const questionId = Math.floor(Math.random() * 10);

        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId='+questionId);
        if(response.ok){
          const data = await response.json()  
          data.map((datum)=>{
            userId=datum.userId,
            id= datum.id,
            title = datum.title,
            AOption = datum.body
          })
          setQuestions(...data,);
        }        
        
        setLoading(false)
      } catch (error) {
        
      }
    }
    fetchQuestions()
  },[])

  if(loading){
    return (
      <div className="loader-container">
        <ClipLoader color={'#123abc'} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {questions.map((question)=>(
          <li>
            <strong>{question.title}</strong>
            <p>{question.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
