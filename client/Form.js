import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { submitTodo, getData } from "./reducer";
import { normalizeDate, validateName } from "./utils";

const FormElement = styled.form`
  text-align: center;
`;

const InputSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 20px;
  margin-left: 20px;
  margin-right: 5px;
  color: blue;
`;

const Input = styled.input`
  margin: 10px;
  &:hover {
    border: 2px solid black;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  background: lightblue;
  color: blue;
  border: 3px solid blue;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    border-color: black;
  }
`;

const Form = () => {
  const [inputText, setInputText] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputText || !date) {
      alert("Please complete all the fields.");
    } else {
      dispatch(submitTodo({ name: inputText, date }));
      setInputText("");
      setDate("");
    }
  };

  return (
    <FormElement onSubmit={submitHandler}>
      <InputSection>
        <div>
          <Label>New todo:</Label>
          <Input
            type="text"
            value={inputText}
            onChange={(e) => {
              //???
              validateName(e.target.value, todos);
              setInputText(e.target.value);
            }}
          />
        </div>
        <div>
          <Label>Date:</Label>
          <Input
            type="date"
            onChange={(e) => {
              setDate(normalizeDate(e.target.value));
            }}
          />
        </div>
      </InputSection>
      <Button type="submit">Submit</Button>
    </FormElement>
  );
};
export default Form;
