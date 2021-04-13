import React from "react";
import styled from "styled-components";
import { onComplete } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

const TodosDiv = styled.table`
  margin: 30px auto;
  border-collapse: collapse;
  border: 2px solid blue;
`;

const Td = styled.td`
  border: 1px solid blue;
  padding: 5px;
`;

const Thead = styled.thead`
  background: lightblue;
  font-weight: bold;
  border: 2px solid blue;
`;

const Checkbox = styled.input`
  margin: auto;
`;
const ListOfTodos = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <TodosDiv>
      {todos.length ? (
        <Thead>
          <tr>
            <Td>Task</Td>
            <Td>Date</Td>
            <Td>Completed</Td>
          </tr>
        </Thead>
      ) : null}
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.name}>
            <Td>{todo.name}</Td>
            <Td>{todo.date}</Td>
            <Td>
              <Checkbox
                checked={false}
                type="checkbox"
                onChange={() => {
                  dispatch(onComplete(todo));
                }}
              ></Checkbox>
            </Td>
          </tr>
        ))}
      </tbody>
    </TodosDiv>
  );
};

export default ListOfTodos;
