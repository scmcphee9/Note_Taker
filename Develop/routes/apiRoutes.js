const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const readfileasync = util.promisify(fs.readFile);
const writefileasync = util.promisify(fs.writeFile);

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
    fs.readFile("./db/db.json", "utf8", (error, data) =>
      error ? console.error(error) : res.send(data)
    );
  });

  app.post("/api/notes", (req, res) => {
    // let newNote;
    readfileasync("./db/db.json", "utf8")
      .then((currentNotes) => {
        let current = JSON.parse(currentNotes);

        const newNote = {
          title: req.body.title,
          text: req.body.text,
          id: uuidv4(),
        };

        const updatedNotes = [...current, newNote];

        console.log(updatedNotes);

        return updatedNotes;
      })
      .then((data) => {
        writefileasync("./db/db.json", JSON.stringify(data));
      });
  });

  // app.delete("/api/notes",(req, res) => {
  //   readfileasync("./db/db.json", "utf8")
  //   .then((currentNotes) => {
  //     let current = JSON.parse(currentNotes);

  //     const newNote = {
  //       title: req.body.title,
  //       text: req.body.text,
  //       id: uuidv4(),
  //     };

  //     const updatedNotes = [...current, newNote];

  //     console.log(updatedNotes);

  //     return updatedNotes;
  //   })
  //   .then((data) => {
  //     writefileasync("./db/db.json", JSON.stringify(data));
  //   });

  // })
};
