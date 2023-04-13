const express = require("express")
const fs = require("fs")
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json")),
  );

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to save note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);

    fs.appendFile("db/db.json", `[{${JSON.stringify(res.body)}}]`, (err) =>
    err ? console.error(err) : console.log("Success!"));

    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});
app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));