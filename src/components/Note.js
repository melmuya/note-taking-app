import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes().then((data) => setNotes(data));
  }, []);

  const handleCreateNote = async () => {
    const data = await createNote({ text: newNote });
    setNotes((prevNotes) => [...prevNotes, data.note]);
    setNewNote('');
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    const data = await updateNote(noteId, updatedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? data.note : note))
    );
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <input
              type="text"
              value={note.text}
              onChange={(e) => handleUpdateNote(note.id, { text: e.target.value })}
            />
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create Note</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateNote();
        }}
      >
        <input
          type="text"
          placeholder="Note Text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Notes;
