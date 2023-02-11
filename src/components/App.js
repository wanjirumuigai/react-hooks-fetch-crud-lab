import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const url = "http://localhost:4000/questions";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function updateQuestions(formData) {
    console.log(formData);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: formData.correctIndex,
      }),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  }

  function deleteQuestionFromServer(id) {
    const updatedList = questions.filter((question) => question.id !== id);
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setQuestions(updatedList));
  }

  // function updateAnswerOnServer(id) {

  // }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm updateQuestions={updateQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestionFromServer}
        />
      )}
    </main>
  );
}

export default App;
