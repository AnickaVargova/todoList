import { transformData, dateParser } from "./index.js";

const fetchDataAction = (data) => ({ type: "GET_DATA", payload: data });

const fetchData = (dispatch) => {
  fetch("/todos")
    .then((response) => {
      if (!response.ok) {
        alert("Sorry, there was a problem while posting data.");
      }
      return response.json();
    })
    .then((data) => dispatch(fetchDataAction(data)))
    .catch((err) => {
      console.log(err.message);
    });
};

export const getData = () => (dispatch) => {
  fetchData(dispatch);
};

export const sendData = ({ name, date }) => (dispatch) => {
  fetch("./todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name, date: dateParser(date, "toServer") }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Sorry, there was a problem while posting data.");
      }
      return response.json();
    })
    .then(() => fetchData(dispatch));
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return transformData(action.payload);
    default:
      return state;
  }
};
