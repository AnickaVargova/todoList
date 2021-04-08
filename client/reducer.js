import { transformData } from "./index.js";

const fetchDataAction = (data) => ({ type: "GET_DATA", payload: data });

export const getData = () => (dispatch, getState) => {
  fetch("/todos")
    .then((response) => response.json())
    .then((data) => dispatch(fetchDataAction(data)))
    .catch((err) => console.log(err));
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return transformData(action.payload);

    case "SUBMIT":
      return [...state, action.payload];

    case "COMPLETE":
      return state.filter((todo) => todo.name !== action.payload.name);

    default:
      return state;
  }
};
