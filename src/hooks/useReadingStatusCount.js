import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const useReadingStatusCount = (userId) => {
  const [haveReadCount, setHaveReadCount] = useState(0);
  const [readLaterCount, setReadLaterCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setHaveReadCount(data.haveRead.length || 0);
          setReadLaterCount(data.readLater.length || 0);
        } else {
          setHaveReadCount(0);
          setReadLaterCount(0);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching reading status:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { haveReadCount, readLaterCount, loading, error };
};

export default useReadingStatusCount;
