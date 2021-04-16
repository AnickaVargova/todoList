export const normalizeDate = (date) => {
  if (date) {
    return new Intl.DateTimeFormat("en-UK").format(new Date(date));
  }
};

export const dateParser = (date, direction) => {
  if (direction === "fromServer") {
    return `${date.slice(-2)}/${date.slice(-5, -3)}/${date.slice(0, 4)}`;
  } else if (direction === "toServer") {
    return `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
  }
};

export const transformData = (data) => {
  return data
    .filter((item) => !item.completed)
    .map((item) => ({
      name: item.title,
      date: dateParser(item.date, "fromServer"),
    }));
};

export const validateName = (input, todos) => {
  return todos.find((todo) => todo.name === input);
};
