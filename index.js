console.log("hi! index.js started.");

const express = require("express");
const app = express();

function handleListening() {
  console.log("Listening on : http://localhost:3000");
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, handleListening);
