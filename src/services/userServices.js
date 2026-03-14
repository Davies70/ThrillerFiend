import { db } from "../firebase/config";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

/**
 * ==========================================
 * USER & AUTH UTILS
 * ==========================================
 */

export const createUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, {
      id,
      haveRead: [],
      readLater: [],
      favorites: [],
      following: [],
      notes: {},
      ratings: {},
      created: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const doesUserExist = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  } catch (error) {
    return false;
  }
};

/**
 * ==========================================
 * COLLECTION LOGIC (OBJECT-BASED)
 * ==========================================
 */

/**
 * Returns the array of book objects directly.
 * No API hydration needed = Instant Load.
 */
export const getBooksByStatus = async (userId, status) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return [];

    const userData = userDoc.data();
    // Defaulting to [] prevents .map() or .length crashes
    return userData[status] ?? [];
  } catch (error) {
    console.error(`Error fetching ${status}:`, error);
    return [];
  }
};

/**
 * Adds a full book object to a collection.
 * Automatically handles the 'Move' from readLater to haveRead.
 */
export const addBookStatus = async (userId, book, status) => {
  if (!userId || !book?.book_id) return;

  // We only store essential data to keep document size small
  const essentialBookData = {
    book_id: book.book_id,
    title: book.title,
    authors: book.authors ?? ["Unknown Author"],
    book_image: book.book_image ?? "",
    categories: book.categories ?? [],
  };

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return;

    const data = userDoc.data();
    const updatePayload = {
      [status]: arrayUnion(essentialBookData),
    };

    // LOGIC: If marking as read, we must remove the PREVIOUS object from readLater
    if (status === "haveRead") {
      const existingInReadLater = data.readLater?.find(
        (b) => b.book_id === book.book_id,
      );
      if (existingInReadLater) {
        updatePayload.readLater = arrayRemove(existingInReadLater);
      }
    }

    await updateDoc(userRef, updatePayload);
  } catch (error) {
    console.error(`Error adding to ${status}:`, error);
  }
};

/**
 * Removes a specific book object from a collection.
 */
export const removeBookStatus = async (userId, book, status) => {
  if (!userId || !book?.book_id) return;

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return;

    const data = userDoc.data();
    // In Firestore, arrayRemove needs the EXACT object to work.
    const targetObject = data[status]?.find((b) => b.book_id === book.book_id);

    if (targetObject) {
      await updateDoc(userRef, {
        [status]: arrayRemove(targetObject),
      });
    }
  } catch (error) {
    console.error(`Error removing from ${status}:`, error);
  }
};

/**
 * Helper to check if a book exists in any collection for the UI.
 */
export const getBookStatus = async (userId, bookId) => {
  if (!userId || !bookId)
    return { haveRead: false, readLater: false, favorites: false };

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists())
      return { haveRead: false, readLater: false, favorites: false };

    const data = userDoc.data();
    const isIn = (list) => list?.some((b) => b.book_id === bookId) ?? false;

    return {
      haveRead: isIn(data.haveRead),
      readLater: isIn(data.readLater),
      favorites: isIn(data.favorites),
    };
  } catch (error) {
    return { haveRead: false, readLater: false, favorites: false };
  }
};

/**
 * ==========================================
 * RATINGS & NOTES
 * ==========================================
 */

export const writeRating = async (userId, bookId, rating) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      [`ratings.${bookId}`]: rating,
    });
  } catch (error) {
    console.error("Error writing rating:", error);
  }
};

export const getRating = async (userId, bookId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.ratings?.[bookId] ?? null;
  } catch (error) {
    return null;
  }
};

export const writeNote = async (userId, bookId, noteText) => {
  try {
    const notesRef = doc(db, "users", userId, "notes", bookId);
    const notesDoc = await getDoc(notesRef);
    const existingNotes = notesDoc.data()?.bookNotes ?? [];

    await setDoc(notesRef, {
      bookNotes: [...existingNotes, { noteText, created: Date.now() }],
    });
  } catch (error) {
    console.error("Error writing note:", error);
  }
};

/**
 * ==========================================
 * PRIVATE NOTES MANAGEMENT
 * ==========================================
 */

export const deleteNote = async (userId, bookId, noteId) => {
  try {
    const notesRef = doc(db, "users", userId, "notes", bookId);
    const notesDoc = await getDoc(notesRef);

    if (!notesDoc.exists()) return;

    const existingNotes = notesDoc.data()?.bookNotes ?? [];

    // Filter out the specific note by its index/ID
    const noteToDelete = existingNotes[noteId];

    if (noteToDelete) {
      await updateDoc(notesRef, {
        bookNotes: arrayRemove(noteToDelete),
      });
      console.log("Note deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const updateNote = async (userId, bookId, noteId, updatedNoteText) => {
  try {
    const notesRef = doc(db, "users", userId, "notes", bookId);
    const notesDoc = await getDoc(notesRef);

    if (!notesDoc.exists()) return;

    const existingNotes = notesDoc.data()?.bookNotes ?? [];

    if (existingNotes[noteId]) {
      // Create a clean copy of the array
      const updatedNotes = [...existingNotes];

      // Update the specific note's text while keeping the original timestamp
      updatedNotes[noteId] = {
        ...updatedNotes[noteId],
        noteText: updatedNoteText,
      };

      await setDoc(notesRef, {
        bookNotes: updatedNotes,
      });
      console.log("Note updated successfully");
    }
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

/**
 * Fetches all notes for a specific book
 */
export const getNotes = async (userId, bookId) => {
  try {
    const notesRef = doc(db, "users", userId, "notes", bookId);
    const notesDoc = await getDoc(notesRef);
    return notesDoc.exists() ? (notesDoc.data()?.bookNotes ?? []) : [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

/**
 * ==========================================
 * AUTHOR FOLLOWING LOGIC
 * ==========================================
 */

/**
 * Adds an authorId to the user's 'following' array.
 */
export const followAuthor = async (userId, authorId) => {
  if (!userId || !authorId) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      following: arrayUnion(authorId),
    });
  } catch (error) {
    console.error("Error following author:", error);
  }
};

/**
 * Removes an authorId from the user's 'following' array.
 */
export const unfollowAuthor = async (userId, authorId) => {
  if (!userId || !authorId) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      following: arrayRemove(authorId),
    });
  } catch (error) {
    console.error("Error unfollowing author:", error);
  }
};

/**
 * Checks if the user is currently following a specific author.
 */
export const checkFollowingAuthor = async (userId, authorId) => {
  if (!userId || !authorId) return false;
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    // Using optional chaining (?) in case the following array doesn't exist yet
    return userData.following?.includes(authorId) ?? false;
  } catch (error) {
    console.error("Error checking following status:", error);
    return false;
  }
};
