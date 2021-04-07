export function getData() {
  return function (dispatch, getState) {
    console.log("fetching");
    fetch("/todos")
      .then((response) => response.json())
      .then((data) => console.log(data));
    //   .then((data) => {
    //     //   setTodos(transformData(data));
    //     dispatch({ type: "GET_DATA", payload: data });
    //   })
    //   .catch((err) => console.log(err));
  };
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return action.payload;

    case "SUBMIT":
      return [...state, action.payload];

    case "COMPLETE":
      return state.filter((todo) => todo.name !== action.payload.name);

    default:
      return state;
  }
};
