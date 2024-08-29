import hotAuthors from '../../../api/authors';

const getHotAuthors = () => hotAuthors.slice(0, 12);

const getAuthors = () => hotAuthors;

const getAuthorById = (id) => {
  const author = hotAuthors.find((author) => author.id === id);
  const similarAuthors = getSimilarAuthors(id);
  return { ...author, similarAuthors };
};

const followAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  author.isFollowing = true;
};

const unfollowAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  console.log(author);
  author.isFollowing = false;
};

const getSimilarAuthors = (id) => {
  const getRandomAuthors = (count) => {
    const randomAuthors = [];
    const shuffledAuthors = hotAuthors
      .filter((hotAuthor) => hotAuthor.id != id)
      .sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      randomAuthors.push(shuffledAuthors[i]);
    }
    return randomAuthors;
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
};
