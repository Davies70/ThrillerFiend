import books from '../../../api/books';
import { getWithExpiry, fetchAndStoreData } from './cacheService';
const NYT_BASEURL = 'https://api.nytimes.com/svc/books/v3/';
const NYT_API_KEY = import.meta.env.VITE_BOOK_NYT_API_KEY;
const BOOKS_BASEURL = `https://www.googleapis.com/books/v1/volumes?`;
const BOOKS_API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
import axios from 'axios';

const nytOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  url: `${NYT_BASEURL}lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`,
};

const getBooks = () => {
  return books;
};

async function getHotBooks() {
  let data = getWithExpiry('apiData');
  if (data === null) {
    console.log('Data not in localStorage or expired, fetching from API...');
    data = await fetchAndStoreData(nytOptions);
  } else {
    console.log('Data retrieved from localStorage');
  }

  return data.slice(0, 12);
}

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

const getBooksByAuthor = async (author) => {
  try {
    const queryParam = {
      q: `inauthor:${author}`,
      key: BOOKS_API_KEY,
      maxResults: 12,
      langRestrict: 'en',
      country: 'US',
      orderBy: 'relevance',
    };
    const params = new URLSearchParams(queryParam).toString();

    const response = await axios.get(`${BOOKS_BASEURL}${params}`);

    console.log(
      response.data.items.map((book) => book.volumeInfo.industryIdentifiers)
    );

    const data = response.data.items.map((book) => {
      return {
        title: book.volumeInfo?.title,
        book_image: book.volumeInfo.imageLinks?.thumbnail,
        author: book.volumeInfo?.authors,
        book_id: book.id,
      };
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
};

export default { getBooks, getBookById, getHotBooks, getBooksByAuthor };
