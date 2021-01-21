const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const connection = require("./config");

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.send("Bienvenue sur mon API");
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
