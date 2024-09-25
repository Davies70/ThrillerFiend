import { db } from '../firebase/config';
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';

const createUser = async (id) => {
  try {
    const userRef = doc(db, 'users', id);
    await setDoc(userRef, {
      id,
      haveRead: [],
      readLater: [],
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

const getRating = async (userId, bookId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const ratings = userDoc.data()?.ratings || {};

    return ratings[bookId] || null;
  } catch (error) {
    console.error('Error getting rating:', error);
  }
};

const getBookStatus = async (userId, bookId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('User document does not exist');
      return { haveRead: false, readLater: false, favorites: false };
    }

    const userDocData = userDoc.data();

    const haveRead = userDocData.haveRead || [];
    const readLater = userDocData.readLater || [];
    const favorites = userDocData.favorites || [];

    return {
      haveRead: haveRead.includes(bookId),
      readLater: readLater.includes(bookId),
      favorites: favorites.includes(bookId),
    };
  } catch (error) {
    console.error('Error fetching book status:', error);
    return { haveRead: false, readLater: false, favorites: false };
  }
};

const addBookStatus = async (userId, bookId, status) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const readLater = userDoc.data().readLater;

    switch (status) {
      case 'haveRead':
        await updateDoc(userRef, {
          haveRead: arrayUnion(bookId),
        });

        if (readLater.includes(bookId)) {
          await updateDoc(userRef, {
            readLater: arrayRemove(bookId),
          });
        }

        break;
      case 'readLater':
        await updateDoc(userRef, {
          readLater: arrayUnion(bookId),
        });

        break;
      case 'favorites':
        await updateDoc(userRef, {
          favorites: arrayUnion(bookId),
        });
        break;
      default:
        console.error('Invalid status:', status);
    }

    console.log('Book status added successfully');
  } catch (error) {
    console.error('Error adding book status:', error);
  }
};

const removeBookStatus = async (userId, bookId, status) => {
  try {
    const userRef = doc(db, 'users', userId);

    switch (status) {
      case 'haveRead':
        await updateDoc(userRef, {
          haveRead: arrayRemove(bookId),
        });
        break;
      case 'readLater':
        await updateDoc(userRef, {
          readLater: arrayRemove(bookId),
        });
        break;
      case 'favorites':
        await updateDoc(userRef, {
          favorites: arrayRemove(bookId),
        });
        break;
      default:
        console.error('Invalid status:', status);
    }

    console.log('Book status removed successfully');
  } catch (error) {
    console.error('Error removing book status:', error);
  }
};

const getReadLaterAndHaveReadCount = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userDocData = userDoc.data();

    const haveReadCount = userDocData.haveRead.length;
    const readLaterCount = userDocData.readLater.length;

    return { haveReadCount, readLaterCount };
  } catch (error) {
    console.error('Error fetching read later and have read count:', error);
    return { haveReadCount: 0, readLaterCount: 0 };
  }
};

export {
  createUser,
  writeNote,
  writeRating,
  deleteNote,
  updateNote,
  getRating,
  getBookStatus,
  addBookStatus,
  removeBookStatus,
  getReadLaterAndHaveReadCount,
};
