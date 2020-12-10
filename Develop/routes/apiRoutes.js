const path = require("path");
const fs = require("fs");
const id = require("unique-identity");
// const db = require("./db/db.json");

// const notes = require("db.json"); how do we pull or connect to database file
// module exports in db file?
// do we need to use fs readfile to interpret it
// unique identity would be for posting to apply the new identity
// do we need to alter the html? it looks like it is taken care of in index.js file

module.exports = (app) => {
  //   fs.readFile("./db/db.json", "utf8", (error, data) =>
  //     error ? console.error(error) : console.log(data)
  //   );

  app.get("/api/notes", (req, res) => {
    // const newNote = req.body;
    // console.log(newNote);
    res.send(
      fs.readFile("./db/db.json", "utf8", (error, data) =>
        error ? console.error(error) : console.log(data)
      )
    );

    //   fs readfile for returning
  });

  app.post("/api/notes", (req, res) => {});
};
