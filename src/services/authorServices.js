import hotAuthors from '../../../api/authors';

const getHotAuthors = () => hotAuthors.slice(0, 12);

const getAuthors = () => hotAuthors;

const getAuthorById = (id) => hotAuthors.find((author) => author.id === id);

export { getHotAuthors, getAuthors, getAuthorById };
