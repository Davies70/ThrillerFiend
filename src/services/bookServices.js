import books from '../../../api/books';
import { getWithExpiry, fetchAndStoreData } from './cacheService';
const NYT_BASEURL = 'https://api.nytimes.com/svc/books/v3/';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  url: `${NYT_BASEURL}lists/current/hardcover-fiction.json?api-key=${
    import.meta.env.VITE_BOOK_NYT_API_KEY
  }`,
};

const getBooks = () => {
  return books;
};

async function getHotBooks() {
  let data = getWithExpiry('apiData');
  if (data === null) {
    console.log('Data not in localStorage or expired, fetching from API...');
    data = await fetchAndStoreData(options);
  } else {
    console.log('Data retrieved from localStorage');
  }

  return data.slice(0, 12);
}

// use New York Times API to get books for hotbooks

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

export default { getBooks, getBookById, getHotBooks };
