import React from "react";
import styled from "styled-components";

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
const ListOfTodos = ({ todos, complete }) => {
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
                type="checkbox"
                onChange={() => complete(todo)}
              ></Checkbox>
            </Td>
          </tr>
        ))}
      </tbody>
    </TodosDiv>
  );
};

export default ListOfTodos;
