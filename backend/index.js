const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("post-data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data",
  ),
);

app.use(express.static("dist"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
];

function generateId() {
  return String(Math.floor(Math.random() * 10000000000));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (body.content?.trim()) {
    const content = body.content.trim();
    const important = !!body.important;
    const targetNote = notes.find((note) => note.content === content);
    if (targetNote) {
      console.log("content must be unique");
      return res
        .status(400)
        .json({ error: "couldn't add this info! the content must be unique" });
    }
    const id = generateId();
    const newNote = {
      id,
      content,
      important,
    };

    notes.push(newNote);
    console.log(`${newNote.content} info added successfully`);
    res.json(newNote);
  } else {
    console.log(`unvalid note info`);
    res.status(400).end("unvalid note info");
  }
});
app.get(`/api/notes/:id`, (req, res) => {
  const id = req.params.id;
  const note = notes.find((notes) => notes.id === id);
  if (!note) {
    return res.status(404).json({ error: "note not found" });
  }

  res.json(note);
});
app.delete(`/api/notes/:id`, (req, res) => {
  const id = req.params.id;
  const note = notes.find((notes) => notes.id === id);
  if (!note) {
    return res.status(404).json({ error: "note not found" });
  }

  notes = notes.filter((note) => note.id !== id);
  console.log(`${note.content} record was deleted`);
  res.json(note);
});

app.get("/info", (req, res) => {
  const entries = notes.length;
  const time = new Date();

  res.send(`<p>phonebook has info for ${entries} people</p><p>${time}</p>`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});
