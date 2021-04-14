const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const fakeHMR = require("./fake-hmr");

const compiler = webpack(webpackConfig);

const watching = compiler.watch(
  {
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    // Stats Object
    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
    if (stats.hasErrors()) {
      console.log("didn' t build");
      return;
    }
    console.log("built");
    fakeHMR.built();
  }
);

const app = express();
fakeHMR.config({ app });
app.use(express.static("public"));
app.use(bodyParser.json());

// require('./webpackRunner');

const todos = [{ title: "Prepare live coding", date: "2021-03-12" }];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  if (Math.random() > 0.5) {
    res.status(500).send();
    return;
  }

  todos.push(req.body);
  res.json(todos);
});

app.post("/todos/onComplete", (req, res) => {
  if (Math.random() > 0.5) {
    res.status(500).send();
    return;
  }
  for (let todo of todos) {
    if (todo.title === req.body.title) {
      todo.completed = true;
    }
  }
  res.json(todos);
});

app.get("*", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>hi</title>
  </head>
  <body>
    <div id="app"/>
    <script src="/bundle.js" type="text/javascript"></script>
  </body>
</html>`);
});

app.listen(config.PORT, function () {
  console.log(
    `App currently running; navigate to localhost:${config.PORT} in a web browser.`
  );
});
