import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [])
  
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  const handleDelete = (deletedQuestion) => {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  const handlePatch = (updatedQuestion) => {
    setQuestions(questions.map(question => {
      if (question.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return question
      }
    }
  ))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions} onQuestionDelete={handleDelete} onUpdateAnswer={handlePatch}/>}
    </main>
  );
}

export default App;
