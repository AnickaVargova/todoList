import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form.js";
import ListOfTodos from "./ListOfTodos.js";
import "./fake-hmr";
import styled from "styled-components";

const H1 = styled.h1`
  color: purple;
  text-align: center;
`;

const dateParser = (date, direction) => {
  if (direction === "fromServer") {
    return `${date.slice(-2)}/${date.slice(-5, -3)}/${date.slice(0, 4)}`;
  } else if (direction === "toServer") {
    return `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
  }
};

const transformData = (data) => {
  return data
    .filter((item) => !item.completed)
    .map((item) => ({
      name: item.title,
      date: dateParser(item.date, "fromServer"),
    }));
};

const useValues = () => {
  useEffect(getData, []);
  const [todos, setTodos] = useState([]);

  function getData() {
    fetch("/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(transformData(data));
      });
  }

  function onComplete(todo) {
    todo.completed = true;
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    fetch("/todos", {
      method: "POST",
      body: JSON.stringify({
        title: todo.name,
        completed: todo.completed,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => {
        setTodos((prevTodos) => [...prevTodos, todo]);
        alert("Sorry, there was a problem while posting data.");
        throw new Error("There was a problem posting data.");
      });
  }

  function handleSubmit({ name, date }) {
    for (let todo of todos) {
      if (todo.name === name) {
        alert("This name is already in use. Choose another name.");
        return;
      }
    }

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
      <Form handleSubmit={handleSubmit} />
      <ListOfTodos todos={todos} onComplete={onComplete} />
    </div>
  );
};

render(<ExampleComponent />, document.getElementById("app"));
