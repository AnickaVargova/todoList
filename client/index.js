import React, { useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form.js";
import ListOfTodos from "./ListOfTodos.js";
import "./fake-hmr";
import styled from "styled-components";
import { Provider, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, getData } from "./reducer.js";

const store = createStore(reducer, applyMiddleware(thunk));

const H1 = styled.h1`
  color: purple;
  text-align: center;
`;

export function dateParser(date, direction) {
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
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      <H1>Todo List</H1>
      <Form />
      <ListOfTodos />
    </div>
  );
};

render(
  <Provider store={store}>
    <ExampleComponent />
  </Provider>,
  document.getElementById("app")
);
