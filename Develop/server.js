const express = require("express");
const path = require("path");

const app = express();
// const apiRoutes = path.basename("./routes/apiRoutes.js");
// const htmlRoutes = path.basename("./routes/htmlRoutes.js");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
