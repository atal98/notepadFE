import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        {/* title with notes symbol */}
        <h2 className="notes-title">&#9782; Notes</h2>
        {/* count of list */}
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          // list display
          <ListItems key={index} note={note} />
        ))}
      </div>

      <AddButton />
    </div>
  );
};

export default NotesListPage;
