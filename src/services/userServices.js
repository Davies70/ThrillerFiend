import { db } from '../firebase/config';
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  arrayRemove,
} from 'firebase/firestore';

const createUser = async (id) => {
  try {
    const userRef = doc(db, 'users', id);
    await setDoc(userRef, {
      id,
      haveRead: [],
      reading: [],
      wantToRead: [],
      favorites: [],
      notes: {},
      ratings: {},
      authorsFollowed: [],
      created: serverTimestamp(),
    });
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const writeNote = async (userId, bookId, noteText) => {
  try {
    const notesRef = doc(db, 'users', userId, 'notes', bookId);
    const notesDoc = await getDoc(notesRef);
    const existingNotes = notesDoc.data()?.bookNotes || [];

    const newNote = {
      noteText,
      created: new Date().getTime(),
    };

    const updatedNotes = [...existingNotes, newNote];

    await setDoc(notesRef, {
      bookNotes: updatedNotes,
    });

    console.log('Note added successfully with timestamp');
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

const deleteNote = async (userId, bookId, noteId) => {
  try {
    const notesRef = doc(db, 'users', userId, 'notes', bookId);
    const notesDoc = await getDoc(notesRef);
    const existingNotes = notesDoc.data()?.bookNotes || [];

    const noteToDelete = existingNotes[noteId];

    await updateDoc(notesRef, {
      bookNotes: arrayRemove(noteToDelete),
    });

    console.log('Note deleted successfully');
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

const updateNote = async (userId, bookId, noteId, updatedNoteText) => {
  try {
    const notesRef = doc(db, 'users', userId, 'notes', bookId);
    const notesDoc = await getDoc(notesRef);
    const existingNotes = notesDoc.data()?.bookNotes || [];

    const noteToUpdate = existingNotes[noteId];
    noteToUpdate.noteText = updatedNoteText;

    await updateDoc(notesRef, {
      bookNotes: existingNotes,
    });

    console.log('Note updated successfully');
  } catch (error) {
    console.error('Error updating note:', error);
  }
};

const writeRating = async (userId, bookId, rating) => {
  try {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      [`ratings.${bookId}`]: rating,
    });

    console.log('Rating added successfully');
  } catch (error) {
    console.error('Error adding rating:', error);
  }
};

export { createUser, writeNote, writeRating, deleteNote, updateNote };
