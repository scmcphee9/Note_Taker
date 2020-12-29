const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const readfileasync = util.promisify(fs.readFile);
const writefileasync = util.promisify(fs.writeFile);

module.exports = (app) => {
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
        res.end();
      });
  });

  // this deletes all notes, need to make it delete just one note.  on postman it was working when it was just api/notes not with the id
  app.delete("/api/notes/:id", (req, res) => {
    const chosenID = req.params.id;
    // console.log(chosenID);

    readfileasync("./db/db.json", "utf8")
      .then((currentNotes) => {
        // console.log(currentNotes);
        let allNotes = JSON.parse(currentNotes);
        console.log("all notes: " + allNotes);

        // const newNote = {
        //   title: req.body.title,
        //   text: req.body.text,
        //   id: uuidv4(),
        // };

        // const updatedNotes = [...allNotes];

        // const noteID = req.body;

        // const updatedNotes = [...allNotes];

        // console.log(noteID);
        // console.log(allNotes);
        // const removeNote = allNotes.find(
        //   (specialID) => specialID.id === chosenID
        // );
        let removeNote = allNotes
          .map((specialID) => specialID.id)
          .indexOf(chosenID);

        let newNoteArr = allNotes.splice(removeNote, 1);
        console.log("remove note: " + removeNote);
        console.log(newNoteArr);

        return newNoteArr;
        // res.send(newNotes);
      })
      .then((data) => {
        writefileasync("./db/db.json", JSON.stringify(data));
        res.end();
      });
  });
};
