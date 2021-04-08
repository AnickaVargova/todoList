import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form.js";
import ListOfTodos from "./ListOfTodos.js";
import "./fake-hmr";
import styled from "styled-components";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, getData } from "./reducer.js";

const store = createStore(reducer, applyMiddleware(thunk));

const H1 = styled.h1`
  color: purple;
  text-align: center;
`;

function dateParser(date, direction) {
  if (direction === "fromServer") {
    return `${date.slice(-2)}/${date.slice(-5, -3)}/${date.slice(0, 4)}`;
  } else if (direction === "toServer") {
    return `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
  }
}

export function transformData(data) {
  return data
    .filter((item) => !item.completed)
    .map((item) => ({
      name: item.title,
      date: dateParser(item.date, "fromServer"),
    }));
}

const ExampleComponent = () => {
  const dispatch = useDispatch();
  useEffect(dispatch(getData), []);

  // useEffect(getData(), []);

  // function getData() {
  //   fetch("/todos")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTodos(transformData(data));
  //     });
  // }

  // const [todos, setTodos] = useState([]);

  function complete(todo) {
    dispatch({ type: "COMPLETE", payload: todo });
    // todo.completed = true;
    // setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    // fetch("/todos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: todo.name,
    //     completed: todo.completed,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .catch((err) => {
    //     alert("Sorry, there was a problem while posting data.");
    //     throw new Error("There was a problem posting data.");
    //   });
  }

  function handleSubmit({ name, date }) {
    dispatch({ type: "SUBMIT", payload: { name, date } });
    // for (let todo of todos) {
    //   if (todo.name === name) {
    //     alert("This name is already in use. Choose another name.");
    //     return;
    //   }
    // }
    // setTodos((prevTodos) => [...prevTodos, { name, date }]);
    // fetch("/todos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: name,
    //     date: dateParser(date, "toServer"),
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .catch((err) => {
    //     setTodos((prevtodos) => prevtodos.filter((todo) => todo.name !== name));
    //     alert("Sorry, there was a problem while posting data.");
    //     throw new Error("There was a problem posting data.");
    //   });
  }

  return (
    <div>
      <H1>Todo List</H1>
      <Form handleSubmit={handleSubmit} />
      <ListOfTodos todos={useSelector((state) => state)} complete={complete} />
    </div>
  );
};

render(
  <Provider store={store}>
    <ExampleComponent />
  </Provider>,
  document.getElementById("app")
);
