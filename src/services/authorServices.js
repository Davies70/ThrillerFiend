import hotAuthors from '../../../api/authors';

const getHotAuthors = () => hotAuthors.slice(0, 12);

const getAuthors = () => hotAuthors;

const getAuthorById = (id) => hotAuthors.find((author) => author.id === id);

const followAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);

  console.log(author, String(author.id));
  author.isFollowing = true;
};

const unfollowAuthor = (id) => {
  const author = hotAuthors.find((author) => String(author.id) === id);
  console.log(author);
  author.isFollowing = false;
};

export {
  getHotAuthors,
  getAuthors,
  getAuthorById,
  followAuthor,
  unfollowAuthor,
};
