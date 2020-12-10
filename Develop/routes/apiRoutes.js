const apiRoute = require("path");
const fs = require("fs");
const id = require("unique-identity");

const notes = require("db.json");

app.get("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log(notes);
  //   fs readfile for returning
});

app.post("/api/notes", (req, res) => {});
