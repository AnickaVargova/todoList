import React, { useEffect } from "react";
import { render } from "react-dom";
import Form from "./Form.js";
import ListOfTodos from "./ListOfTodos.js";
import "./fake-hmr";
import styled from "styled-components";
import { Provider, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, fetchData } from "./reducer.js";

const store = createStore(reducer, applyMiddleware(thunk));

const H1 = styled.h1`
  color: purple;
  text-align: center;
`;

const ExampleComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
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
