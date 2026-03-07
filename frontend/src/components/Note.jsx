const Note = ({ note, deleteNote }) => {
  return (
    <li>
      {note.content}
      <button className="delete-btn" onClick={() => deleteNote()}>
        ❌
      </button>
    </li>
  );
};

export default Note;
