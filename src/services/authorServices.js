// import hotAuthors from '../../../api/authors';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const getHotAuthors = async () => {
  const hotAuthors = await getAuthors();
  return hotAuthors.slice(0, 12);
};

const getAuthors = async () => {
  try {
    const authorsCollection = collection(db, 'authors');
    const authorsSnapshot = await getDocs(authorsCollection);
    const authors = [];
    authorsSnapshot.forEach((doc) => {
      authors.push({ id: doc.id, ...doc.data() });
    });
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
};

const getAuthorById = async (id) => {
  // const author = hotAuthors.find((author) => author.id === id);
  // const similarAuthors = getSimilarAuthors(id);
  // return { ...author, similarAuthors };
  const authorRef = doc(db, 'authors', id);
  const authorSnapshot = await getDoc(authorRef);
  if (authorSnapshot.exists()) {
    return { id: authorSnapshot.id, ...authorSnapshot.data() };
  } else {
    console.error('Author not found');
  }
};

const addSimilarAuthorsRandomly = async () => {
  try {
    const authors = await getAuthors();

    for (const author of authors) {
      const similarAuthors = getSimilarAuthors(author.id, authors);
      await updateDoc(doc(db, 'authors', author.id), {
        similarAuthors,
      });
    }
  } catch (error) {
    console.error('Error adding similar authors:', error);
  }
};

const followAuthor = (authorId, userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    updateDoc(userRef, {
      following: arrayUnion(authorId),
    });
    console.log('Author followed successfully');
  } catch (error) {
    console.error('Error following author:', error);
  }
};

const unfollowAuthor = (authorId, userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    updateDoc(userRef, {
      following: arrayRemove(authorId),
    });
    console.log('Author unfollowed successfully');
  } catch (error) {
    console.error('Error unfollowing author:', error);
  }
};

const checkFollowing = async (authorId, userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    return userData.following.includes(authorId);
  } catch (error) {
    console.error('Error checking if following author:', error);
  }
};

const getSimilarAuthors = (id, authors) => {
  const getRandomAuthors = (count) => {
    const randomAuthors = [];
    const shuffledAuthors = authors
      .filter((author) => author.id != id)
      .sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      randomAuthors.push(shuffledAuthors[i]);
    }
    return randomAuthors.map((author) => ({
      authorId: author.id,
      name: author.authorName,
      coverPhoto: author.coverPhoto,
    }));
  };

  return getRandomAuthors(3);
};

const getFollowedAuthors = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const followedAuthors = [];
    if (!userData?.following || !userData?.following.length === 0)
      return followedAuthors;

    for (const authorId of userData.following) {
      const authorRef = doc(db, 'authors', authorId);
      const authorDoc = await getDoc(authorRef);
      followedAuthors.push({ id: authorDoc.id, ...authorDoc.data() });
    }
    return followedAuthors;
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
};

export default {
  getHotAuthors,
  getAuthors,
  getAuthorById,
  followAuthor,
  unfollowAuthor,
  getSimilarAuthors,
  addSimilarAuthorsRandomly,
  checkFollowing,
  getFollowedAuthors,
};
