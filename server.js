const express = require("express")

const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.post("/notes", (req, res) => {
  console.info(`${req.method} request received to save note`);

  const { noteTitle, noteText } = req.body;

  if (noteTitle && noteText) {
    const newNote = {
      noteTitle,
      noteText,
      review_id: uuid(),
    };

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));