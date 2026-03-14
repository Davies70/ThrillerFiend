import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/config";
import rawAuthorData from "../data/authors.js"; // Renamed to avoid confusion

// THE FIX: Smartly extract the array whether it was exported as an array OR an object
const authorsArray = Array.isArray(rawAuthorData)
  ? rawAuthorData
  : rawAuthorData?.authors || [];

/**
 * THE MASQUERADE MAPPER
 */
const mapAuthorToShape = (author) => {
  if (!author) return null;
  return {
    ...author,
    book_id: author.id,
    title: author.authorName,
    book_image: author.coverPhoto,
    isAuthor: true,
  };
};

/**
 * ==========================================
 * LOCAL AUTHOR DATA
 * ==========================================
 */

const getHotAuthors = async () => {
  if (!authorsArray || authorsArray.length === 0) {
    console.warn("Author array is empty or failed to import correctly.");
    return [];
  }
  // Map and return the top 12 authors
  return authorsArray.map(mapAuthorToShape);
};

const getAuthorById = async (id) => {
  const author = authorsArray.find((a) => a.id === id);
  return author ? mapAuthorToShape(author) : null;
};

const getSimilarAuthors = async (id) => {
  const otherAuthors = authorsArray.filter((author) => author.id !== id);
  const shuffled = otherAuthors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).map(mapAuthorToShape);
};

// ... keep your follow/unfollow Firebase logic here ...
/**
 * ==========================================
 * USER SPECIFIC DATA (Firestore)
 * ==========================================
 */

const followAuthor = async (authorId, userId) => {
  if (!authorId || !userId) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      following: arrayUnion(authorId),
    });
  } catch (error) {
    console.error("Error following author:", error);
  }
};

const unfollowAuthor = async (authorId, userId) => {
  if (!authorId || !userId) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      following: arrayRemove(authorId),
    });
  } catch (error) {
    console.error("Error unfollowing author:", error);
  }
};

const checkFollowing = async (authorId, userId) => {
  if (!authorId || !userId) return false;
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    return userData.following?.includes(authorId) ?? false;
  } catch (error) {
    console.error("Error checking following status:", error);
    return false;
  }
};

const getFollowedAuthors = async (userId) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return [];

    const followingIds = userDoc.data().following || [];
    if (followingIds.length === 0) return [];

    // Map the followed IDs back to our local author objects, then shape them
    const followedAuthors = followingIds
      .map((id) => data.authors.find((author) => author.id === id))
      .filter(Boolean) // Removes any if an author was deleted from the local file
      .map(mapAuthorToShape);

    return followedAuthors;
  } catch (error) {
    console.error("Error fetching followed authors:", error);
    return [];
  }
};

export default {
  getHotAuthors,
  getAuthorById,
  followAuthor,
  unfollowAuthor,
  getSimilarAuthors,
  checkFollowing,
  getFollowedAuthors,
};
