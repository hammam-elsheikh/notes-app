import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import { Notification } from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((newNote) => {
      setSuccessMsg("message added successfully");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 800);
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
  };

  const deleteNote = async (noteId) => {
    try {
      await noteService.remove(noteId);
      setSuccessMsg("message deleted successfully");
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      setTimeout(() => {
        setSuccessMsg(null);
      }, 800);
    } catch (error) {
      console.log(error);
      setErrorMsg("couldn't delete the message");
      setTimeout(() => {
        setErrorMsg(null);
      }, 800);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMsg={errorMsg} successMsg={successMsg} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button className="save-btn" type="submit">
          save
        </button>
      </form>
      <Footer />
    </div>
  );
};
export default App;
