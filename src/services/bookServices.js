import books from '../api/books';

const getbooks = () => {
  return books;
};

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

export default { getbooks, getBookById };
