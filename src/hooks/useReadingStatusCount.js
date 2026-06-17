import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useReadingStatusCount = (userId) => {
  const [haveReadCount, setHaveReadCount] = useState(0);
  const [readLaterCount, setReadLaterCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedBookIds, setSavedBookIds] = useState(() => new Set());

  useEffect(() => {
    if (!userId) {
      setHaveReadCount(0);
      setReadLaterCount(0);
      setSavedBookIds(new Set());
      setLoading(false);
      return;
    }

    setLoading(true);
    const userRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const haveRead = Array.isArray(data.haveRead) ? data.haveRead : [];
          const readLater = Array.isArray(data.readLater) ? data.readLater : [];

          setHaveReadCount(haveRead.length);
          setReadLaterCount(readLater.length);
          setSavedBookIds(
            new Set(
              [...haveRead, ...readLater]
                .map((book) => book?.book_id)
                .filter(Boolean),
            ),
          );
        } else {
          setHaveReadCount(0);
          setReadLaterCount(0);
          setSavedBookIds(new Set());
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching reading status:", err);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  return { haveReadCount, readLaterCount, savedBookIds, loading, error };
};

export default useReadingStatusCount;
