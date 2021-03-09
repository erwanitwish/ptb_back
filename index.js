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

app.get("/description", (req, res) => {
  connection.query("DESCRIBE lieu", (err, results) => {
    if (err) {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement de vos données",
        error: err,
      });
    } else {
      res.json(results);
    }
  });
});

app.get("/lieux", (req, res) => {
  connection.query("SELECT * FROM lieu", (err, results) => {
    if (err) {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement de vos données",
        error: err,
      });
    } else {
      res.json(results);
    }
  });
});

app.post("/lieu", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO lieu SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Erreur lors de l'ajout d'un projet",
        error: err,
      });
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
