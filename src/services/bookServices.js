import books from '../../../api/books';
import { getWithExpiry, fetchAndStoreData } from './cacheService';
const NYT_BASEURL = 'https://api.nytimes.com/svc/books/v3/';
const NYT_API_KEY = import.meta.env.VITE_BOOK_NYT_API_KEY;
const BOOKS_BASEURL = `https://www.googleapis.com/books/v1/volumes?`;
const BOOKS_API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
import { setSome } from '../utils';
import axios from 'axios';

const nytConfig = {
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
  let data = getWithExpiry('hotBooks');
  if (data === null) {
    console.log(
      'HotBooks Data not in localStorage or expired, fetching from API...'
    );
    data = await fetchAndStoreData(nytConfig, 'hotBooks');
  } else {
    console.log('HotBooks Data retrieved from localStorage');
  }

  const hotBooks = data.results.books.slice(0, 12).map((book) => {
    return {
      title: book.title,
      book_image: book.book_image,
      authors: book.author,
      book_id: book.id,
      volumeId: book.primary_isbn13,
    };
  });

  return hotBooks;
}

// const getBookById = (id) => {
//   return books.find((book) => book.id === id);
// };

const getBooksByAuthor = async (authorName) => {
  let data = getWithExpiry('booksByAuthor-' + authorName);
  if (data === null) {
    console.log(
      `Books by ${authorName} data not in localStorage or expired, fetching from API...`
    );
    const queryParam = {
      q: `inauthor:"${authorName}"+subject:fiction`,
      key: BOOKS_API_KEY,
      maxResults: 40,
      langRestrict: 'en',
      country: 'US',
      orderBy: 'relevance',
      printType: 'books',
    };
    const params = new URLSearchParams(queryParam).toString();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: `${BOOKS_BASEURL}${params}`,
    };
    data = await fetchAndStoreData(config, `booksByAuthor-${authorName}`);
  } else {
    console.log(`Books by ${authorName} data retrieved from localStorage`);
  }

  const uniqueBooks = [];
  const titles = new Set();
  const isTitleUnique = (bookTitle) => {
    return !setSome(titles, (title) => bookTitle.toLowerCase().includes(title));
  };

  data.items.forEach((book) => {
    const title = book.volumeInfo.title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/^the\s/i, '');

    let authorsName = '';

    authorsName = book.volumeInfo.authors?.join(' ').toLowerCase();

    if (authorsName === undefined) {
      authorsName = '';
    }

    if (
      !titles.has(title) &&
      isTitleUnique(title) &&
      !title.includes(authorsName) &&
      authorsName.includes(authorName.toLowerCase()) &&
      book.volumeInfo.language === 'en'
    ) {
      titles.add(title);
      uniqueBooks.push(book);
    }
  });
  const booksByAuthor = uniqueBooks.map((book) => {
    return {
      title: book.volumeInfo?.title,
      book_image: book.volumeInfo.imageLinks?.thumbnail,
      authors: book.volumeInfo?.authors,
      book_id: book.id,
      volumeId: book.id,
      categories: book.volumeInfo.categories,
      rating: book.volumeInfo.averageRating,
      subtitle: book.volumeInfo.subtitle,
      description: book.volumeInfo.description,
      publisher: book.volumeInfo.publisher,
      publishedDate: book.volumeInfo.publishedDate,
      isbn: book.volumeInfo.industryIdentifiers
        ?.map((isbn) => isbn.identifier)
        .join(', '),
      saleInfo: book.saleInfo,
      pageCount: book.volumeInfo.pageCount,
      price: book.saleInfo?.listPrice?.amount,
      currencyCode: book.saleInfo?.listPrice?.currencyCode,
      language: book.volumeInfo.language,
    };
  });

  return booksByAuthor.length > 12 ? booksByAuthor.slice(0, 12) : booksByAuthor;
};

const getLatestBook = async (author) => {
  let data = getWithExpiry('latestBookByAuthor-' + author);
  if (data === null) {
    console.log(
      `Latest book by ${author} data not in localStorage or expired, fetching from API...`
    );
    const queryParam = {
      q: `inauthor:"${author}"+subject:fiction`,
      orderBy: 'newest',
      key: BOOKS_API_KEY,
      maxResults: 40,
      langRestrict: 'en',
      country: 'US',
      printType: 'books',
    };
    const params = new URLSearchParams(queryParam).toString();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: `${BOOKS_BASEURL}${params}`,
    };
    data = await fetchAndStoreData(config, `latestBookByAuthor-${author}`);
  } else {
    console.log(`Latest book by ${author} data retrieved from localStorage`);
  }
  // data.items.forEach((book) => {
  //   console.log('book', book.volumeInfo.authors);
  // });

  // return {
  //   title: 'No books found',
  //   book_image: '',
  //   author: 'not found',
  // };
  // const latestBookFromList = data.items.((book) =>
  //   book.volumeInfo.authors?.includes(author)
  // );

  // if (!latestBookFromList) {
  //   return {
  //     title: 'No books found',
  //     book_image: '',
  //     author: 'not found',
  //   };
  // }

  // const latestBook = {
  //   title: latestBookFromList.volumeInfo.title,
  //   book_image: latestBookFromList.volumeInfo.imageLinks.thumbnail,
  //   author: latestBookFromList.volumeInfo.authors,
  // };
  // return latestBook;
  const authorBooks = data.items.filter(
    (book) =>
      book.volumeInfo.authors &&
      book.volumeInfo.authors.some(
        (bookAuthor) => bookAuthor.toLowerCase() === author.toLowerCase()
      )
  );
  console.log('authorbooks', authorBooks);

  if (authorBooks.length === 0) {
    return {
      title: 'No books found',
      book_image: '',
      author: 'not found',
    };
  }

  // Sort the filtered books by publication date (newest first)
  authorBooks.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || 0);
    const dateB = new Date(b.volumeInfo.publishedDate || 0);
    return dateB - dateA;
  });

  const latestBook = authorBooks[0];

  return {
    title: latestBook.volumeInfo.title,
    book_image: latestBook.volumeInfo.imageLinks?.thumbnail || '',
    author: latestBook.volumeInfo.authors[0],
  };
};

const getBookByVolumeId = async (volumeId) => {
  let data = getWithExpiry('bookByVolumeId-' + volumeId);
  if (data === null) {
    console.log(
      `Book by VolumeId ${volumeId} data not in localStorage or expired, fetching from API...`
    );
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: `https://www.googleapis.com/books/v1/volumes/${volumeId}`,
      key: BOOKS_API_KEY,
    };
    data = await fetchAndStoreData(config, `bookByVolumeId-${volumeId}`);
  } else {
    console.log(
      `Book by VolumeId ${volumeId} data retrieved from localStorage`
    );
  }
  return data;
};

const getBooksSuggestions = async (searchQuery, signal) => {
  const queryParam = {
    q: searchQuery,
    key: BOOKS_API_KEY,
    maxResults: 5,
    langRestrict: 'en',
    country: 'US',
    printType: 'books',
  };
  const params = new URLSearchParams(queryParam).toString();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    url: `${BOOKS_BASEURL}${params}`,
  };
  try {
    const response = await axios.request(config, { signal });
    console.log('response', response);
    return response.data.items;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
    } else {
      console.error('Fetch error:', error);
    }
  }
};

const getBookByAuthorAndTitle = async (authorNameAndTitle) => {
  let data = getWithExpiry(`booksByAuthorAndTitle-${authorNameAndTitle}`);
  if (data === null) {
    console.log(
      `Books by ${authorNameAndTitle} data not in localStorage or expired, fetching from API...`
    );
    const queryParam = {
      q: authorNameAndTitle,
      key: BOOKS_API_KEY,
      maxResults: 20,
      langRestrict: 'en',
      country: 'US',
      orderBy: 'relevance',
      printType: 'all',
    };
    const params = new URLSearchParams(queryParam).toString();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: `${BOOKS_BASEURL}${params}`,
      transformResponse: [
        ...axios.defaults.transformResponse,
        (response) => {
          // Explicitly parse the response
          console.log('data', response);
          if (!response.items || !Array.isArray(response.items)) {
            throw new Error('Invalid API response: no items found');
          }
          return response.items.find((book) => {
            return (
              book.volumeInfo.imageLinks?.thumbnail &&
              book.volumeInfo.description &&
              book.volumeInfo.pageCount > 0
            );
          });
        },
      ],
    };
    data = await fetchAndStoreData(
      config,
      `booksByAuthorAndTitle-${authorNameAndTitle}`
    );
  } else {
    console.log(
      `Books by ${authorNameAndTitle} data retrieved from localStorage`
    );
  }

  return data
    ? {
        title: data.volumeInfo?.title,
        book_image: data.volumeInfo.imageLinks?.thumbnail,
        authors: data.volumeInfo?.authors,
        book_id: data.id,
        volumeId: data.id,
        categories: data.volumeInfo.categories,
        rating: data.volumeInfo.averageRating,
        subtitle: data.volumeInfo.subtitle,
        description: data.volumeInfo.description,
        publisher: data.volumeInfo.publisher,
        publishedDate: data.volumeInfo.publishedDate,
        isbn: data.volumeInfo.industryIdentifiers
          ?.map((isbn) => isbn.identifier)
          .join(', '),
        saleInfo: data.saleInfo?.saleability,
        pageCount: data.volumeInfo.pageCount,
        price: data.saleInfo?.listPrice?.amount,
        currencyCode: data.saleInfo?.listPrice?.currencyCode,
        language: data.volumeInfo.language,
      }
    : {};
};

export default {
  getBooks,
  getHotBooks,
  getBooksByAuthor,
  getLatestBook,
  getBookByVolumeId,
  getBooksSuggestions,
  getBookByAuthorAndTitle,
};
