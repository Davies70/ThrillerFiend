import authors from '../api/authors';

const getAuthors = () => authors;

const getAuthorById = (id) => authors.find((author) => author.id === id);

export { getAuthors, getAuthorById };
