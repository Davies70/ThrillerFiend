// import hotAuthors from '../../../api/authors';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
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

const followAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  author.isFollowing = true;
};

const unfollowAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  author.isFollowing = false;
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

export default {
  getHotAuthors,
  getAuthors,
  getAuthorById,
  followAuthor,
  unfollowAuthor,
  getSimilarAuthors,
  addSimilarAuthorsRandomly,
};
