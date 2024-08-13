import hotAuthors from '../../../api/authors';

const getHotAuthors = () => hotAuthors.slice(0, 12);

const getAuthors = () => hotAuthors;

const getAuthorById = (id) => hotAuthors.find((author) => author.id === id);

const followAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  author.isFollowing = true;
};

const unfollowAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  console.log(author);
  author.isFollowing = false;
};

const getSimilarAuthors = () => {
  const getRandomAuthors = (count) => {
    const randomAuthors = [];
    const shuffledAuthors = hotAuthors.sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      randomAuthors.push(shuffledAuthors[i]);
    }
    return randomAuthors;
  };

  return getRandomAuthors(3);
};

const getAuthorGenres = (books) => {
  const categories = [];
  books.forEach((book) => {
    book.categories &&
      book.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
  });

  return categories;
};

export default {
  getHotAuthors,
  getAuthors,
  getAuthorById,
  followAuthor,
  unfollowAuthor,
  getSimilarAuthors,
  getAuthorGenres,
};
