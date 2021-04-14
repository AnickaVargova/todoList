import { validateName, dateParser, transformData } from "./utils";

const getDataAction = (data) => ({ type: "GET_DATA", payload: data });
const addAction = (data) => ({ type: "ADD", payload: data });
const removeAction = (data) => ({ type: "REMOVE", payload: data });

export const fetchData = () => (dispatch) => {
  fetch("/todos")
    .then((response) => response.json())
    .then((data) => {
      dispatch(getDataAction(transformData(data)));
    })
    .catch((err) => {
      alert("Sorry, there was a problem while fetching data.");
      console.log(err.message);
    });
};

export const onComplete = (name) => (dispatch, getState) => {
  const todosBeforeComplete = getState();
  dispatch(removeAction(name));
  fetch("./todos/onComplete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name }),
  })
    .then((response) => response.json())
    .catch(() => {
      dispatch(getDataAction(todosBeforeComplete));
      alert("Sorry, there was a problem while posting data.");
      throw new Error("There was a problem posting data.");
    });
};

export const submitTodo = ({ name, date }) => (dispatch, getState) => {
  if (!validateName(name, getState())) return;
  dispatch(addAction({ name, date }));

  fetch("./todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name, date: dateParser(date, "toServer") }),
  })
    .then((response) => response.json())
    .catch(() => {
      dispatch(removeAction(name));
      alert("Sorry, there was a problem while posting data.");
      throw new Error("There was a problem posting data.");
    });
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((todo) => todo.name !== action.payload);
    default:
      return state;
  }
};
