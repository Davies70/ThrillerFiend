import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config'; // Adjust this import based on your file structure
import { useState, useEffect } from 'react';

const useBookNotes = (userId, bookId) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !bookId) {
      setLoading(false);
      return;
    }

    const notesRef = doc(db, 'users', userId, 'notes', bookId);

    const unsubscribe = onSnapshot(
      notesRef,
      (doc) => {
        if (doc.exists()) {
          setNotes(doc.data().bookNotes || []);
        } else {
          setNotes([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching notes: ', err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [userId, bookId]);

  return { notes, loading, error };
};

export default useBookNotes;
