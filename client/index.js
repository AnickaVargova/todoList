import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form.js";
import ListOfTodos from "./ListOfTodos.js";
import "./fake-hmr";
import styled from "styled-components";
import { transformData, dateParser, validateName } from "./utils";

const H1 = styled.h1`
  color: purple;
  text-align: center;
`;

export const useValues = () => {
  useEffect(getData, []);
  const [todos, setTodos] = useState([]);

  function getData() {
    fetch("/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(transformData(data));
      });
  }

  function onComplete(inputTodo) {
    const todosBeforeComplete = [...todos];

    //?? nově na frontendu není u todos vlastnost completed, je jen na backendu.
    //předchozí stav:
    // todo.completed = true;
    // setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));

    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.name !== inputTodo.name)
    );
    fetch("/todos/onComplete", {
      method: "POST",
      body: JSON.stringify({
        title: inputTodo.name,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => {
        setTodos(todosBeforeComplete);
        alert("Sorry, there was a problem while posting data.");
        throw new Error("There was a problem posting data.");
      });
  }

  function handleSubmit({ name, date }) {
    if (!validateName(name, todos)) return;
    setTodos((prevTodos) => [...prevTodos, { name, date }]);
    fetch("/todos", {
      method: "POST",
      body: JSON.stringify({
        title: name,
        date: dateParser(date, "toServer"),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => {
        setTodos((prevtodos) => prevtodos.filter((todo) => todo.name !== name));
        alert("Sorry, there was a problem while posting data.");
        throw new Error("There was a problem posting data.");
      });
  }

  return { todos, onComplete, handleSubmit };
};

const ExampleComponent = () => {
  const { todos, onComplete, handleSubmit } = useValues();

  return (
    <div>
      <H1>Todo List</H1>
      <Form todos={todos} handleSubmit={handleSubmit} />
      <ListOfTodos todos={todos} onComplete={onComplete} />
    </div>
  );
};

render(<ExampleComponent />, document.getElementById("app"));
