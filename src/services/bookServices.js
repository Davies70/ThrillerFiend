import books from '../../../api/books';

const getBooks = () => {
  return books;
};

// const getBooks = async () => {

// };


// use New York Times API to get books for hotbooks

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

export default { getBooks, getBookById };
