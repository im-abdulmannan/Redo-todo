import React, { useState, useEffect } from "react";
import "./App.css";

// Importing Components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {
  // UseState
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Run Once when the App start
  useEffect(() => {
    getLocalTodos();
  }, []);

  // UseEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // Functions
  function filterHandler() {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  // Local Saving...
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      // let localTodo = localStorage.getItem("todos", JSON.stringify([]));
      // console.log(localTodo);

      let localTodo = JSON.parse(localStorage.getItem("todos"));
      console.log(localTodo);
      setTodos(localTodo);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Redo-todo</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        status={status}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
