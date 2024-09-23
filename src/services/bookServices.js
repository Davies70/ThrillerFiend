import {
  getWithExpiry,
  fetchAndStoreData,
  setWithExpiry,
} from './cacheService';
const NYT_BASEURL = 'https://api.nytimes.com/svc/books/v3/';
const NYT_API_KEY = import.meta.env.VITE_BOOK_NYT_API_KEY;
const BOOKS_BASEURL = `https://www.googleapis.com/books/v1/volumes?`;
const BOOKS_API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
import { setSome } from '../utils/utils';
import axios from 'axios';

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const nytConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  url: `${NYT_BASEURL}lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`,
};

async function fetch(config) {
  try {
    const response = await axios.request(config);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

const getNewYorkTimesBestSellers = async () => {
  let NYTBooks = getWithExpiry('nytBestSellers');
  if (NYTBooks) {
    console.log('NYT Best Sellers Data retrieved from localStorage');
    return NYTBooks;
  }
  console.log(
    'NYT Best Sellers Data not in localStorage or expired, fetching from API...'
  );
  const books = await fetch(nytConfig);
  if (books && books.results) {
    NYTBooks = books.results.books.map((book) => {
      return {
        title: book.title,
        authorName: book.author,
      };
    });
    setWithExpiry('nytBestSellers', NYTBooks, CACHE_TTL);
    return NYTBooks;
  }
  return [];
};

async function getHotBooks() {
  let data = getWithExpiry('hotBooks');

  if (data) {
    console.log('HotBooks Data retrieved from localStorage');
    return data;
  }

  console.log(
    'HotBooks Data not in localStorage or expired, fetching from API...'
  );

  const NYTbooks = await getNewYorkTimesBestSellers();
  console.log({ NYTbooks });
  const hotBooks = await Promise.all(
    NYTbooks.map(async (book) => {
      const { title, authorName } = book;
      const bookData = await getBookByAuthorAndTitle(
        `inauthor:${authorName}+intitle:${title}`
      );
      if (bookData && bookData.title) {
        return bookData;
      }
      // Return undefined when bookData doesn't exist
      return undefined;
    })
  );

  console.log({ hotBooks });

  data = hotBooks.filter((book) => book !== undefined).slice(0, 12);
  if (data.length > 0) setWithExpiry('hotBooks', data, CACHE_TTL);

  return data;
}

const isTitleUnique = (bookTitle, titles) => {
  return !setSome(titles, (title) => bookTitle.toLowerCase().includes(title));
};

const getBooksByAuthor = async (author) => {
  const { authorName, notableWorks } = author;
  let data = getWithExpiry('booksByAuthor-' + authorName);
  if (data) {
    console.log(`Books by ${authorName} data retrieved from localStorage`);
    return data;
  }

  console.log(
    `Books by ${authorName} data not in localStorage or expired, fetching from API...`
  );

  const config = buildQueryConfig(`${authorName}`, 'inauthor', 40);
  data = await fetch(config);

  if (!data.items || !Array.isArray(data.items)) return [];

  const uniqueBooks = [];
  const titles = new Set();

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
      isTitleUnique(title, titles) &&
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
    };
  });

  console.log({ uniqueBooks });

  const toLowerCaseNotableWorks = notableWorks.map((notableWork) =>
    notableWork.toLowerCase()
  );

  const books = booksByAuthor.filter((book) => {
    if (!toLowerCaseNotableWorks.includes(book.title.toLowerCase())) {
      return book;
    }
  });

  if (books.length === 0) return;

  if (books.length > 12) {
    setWithExpiry('booksByAuthor-' + authorName, books, CACHE_TTL);
    return books.slice(0, 12);
  }

  setWithExpiry('booksByAuthor-' + authorName, books, CACHE_TTL);
  return books;
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
    const book = await fetch(config);
    data = {
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
      saleInfo: book.saleInfo || {},
      pageCount: book.volumeInfo.pageCount,
      price: book.saleInfo?.listPrice?.amount,
      currencyCode: book.saleInfo?.listPrice?.currencyCode,
      language: book.volumeInfo.language,
      ratingCount: book.volumeInfo.ratingsCount,
    };
    setWithExpiry('bookByVolumeId-' + volumeId, data, CACHE_TTL);
  } else {
    console.log(
      `Book by VolumeId ${volumeId} data retrieved from localStorage`
    );
  }
  return data;
};

const getBookByAuthorAndTitle = async (authorNameAndTitle) => {
  const result = getWithExpiry(`bookByAuthorAndTitle-${authorNameAndTitle}`);
  if (result) {
    console.log(
      `Book by ${authorNameAndTitle} data retrieved from localStorage`
    );
    return result;
  }
  // const queryParam = {
  //   q: authorNameAndTitle,
  //   key: BOOKS_API_KEY,
  //   maxResults: 20,
  //   langRestrict: 'en',
  //   country: 'US',
  //   orderBy: 'relevance',
  //   printType: 'all',
  // };
  // const params = new URLSearchParams(queryParam).toString();
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'GET',
  //   url: `${BOOKS_BASEURL}${params}`,
  // };

  console.log(
    `Book by ${authorNameAndTitle} data not in localStorage or expired, fetching from API...`
  );

  const config = buildQueryConfig(authorNameAndTitle, null, 20);
  const books = await fetch(config);

  if (!books.items || !Array.isArray(books.items)) return;

  const data = books.items.find(
    (book) =>
      book.volumeInfo.imageLinks?.thumbnail &&
      book.volumeInfo.description &&
      book.volumeInfo.pageCount > 0
  );

  return {
    title: data.volumeInfo?.title,
    book_image: data.volumeInfo.imageLinks?.thumbnail,
    authors: data.volumeInfo?.authors,
    book_id: data.id,
  };
};

const getSimilarBooks = async (title) => {
  let data = getWithExpiry(`similarBooks,-${title}`);
  if (data) {
    console.log(`Similar books by ${title} data retrieved from localStorage`);
    return data;
  }
  if (data === null) {
    console.log(
      `Similar books like ${title} data not in localStorage or expired, fetching from API...`
    );
    const queryParam = {
      q: `subject:fiction -intitle:${title}`,
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
    data = await fetchAndStoreData(config, `similarBooks-${title}`);
    return data
      ? {
          title: data.volumeInfo?.title,
          book_image: data.volumeInfo.imageLinks?.thumbnail,
          authors: data.volumeInfo?.authors,
          book_id: data.id,
        }
      : [];
  }
};

const getBestSellers = async () => {
  let data = getWithExpiry('bestsellers');
  if (data === null) {
    console.log(
      'Bestsellers Data not in localStorage or expired, fetching from API...'
    );

    const queryParam = {
      q: 'subject:thriller',
      key: BOOKS_API_KEY,
      maxResults: 18,
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

          if (!response.items || !Array.isArray(response.items)) {
            throw new Error('Invalid API response: no items found');
          }
          return response.items.filter((book) => {
            return (
              book.volumeInfo.imageLinks?.thumbnail &&
              book.volumeInfo.description &&
              book.volumeInfo.pageCount > 0
            );
          });
        },
      ],
    };
    data = await fetchAndStoreData(config, 'bestsellers');
  } else {
    console.log('Bestsellers Data retrieved from localStorage');
  }
  return Array.from(
    new Set(data.map((book) => book.volumeInfo.title.toLowerCase()))
  ).map((title) => {
    const book = data.find(
      (book) => book.volumeInfo.title.toLowerCase() === title
    );
    return {
      title: book.volumeInfo.title,
      book_image: book.volumeInfo.imageLinks?.thumbnail,
      authors: book.volumeInfo.authors,
      book_id: book.id,
    };
  });
};

// ... [Previous utility functions and constants remain the same]

const getBooksSuggestions = async (searchQuery) => {
  if (!searchQuery) {
    console.warn('No search query provided');
    return [];
  }

  const cacheKey = `suggestions_${searchQuery}`;
  const cachedData = getWithExpiry(cacheKey);

  if (cachedData) {
    console.log(`Suggestions for ${searchQuery} retrieved from localStorage`);
    return cachedData;
  }

  console.log(
    `Suggestions for ${searchQuery} not in localStorage, fetching...`
  );

  try {
    const results = await fetchAndProcessQueries(searchQuery);

    if (results.length > 0) {
      setWithExpiry(cacheKey, results, CACHE_TTL);
    }

    return results;
  } catch (error) {
    console.error('Error fetching suggestions:', error.message);
    return [];
  }
};

const fetchAndProcessQueries = async (searchQuery) => {
  const titleQueries = generateTitleQueries(searchQuery);
  const authorQuery = searchQuery; // We'll use the original query for author search

  const titleConfigs = titleQueries.map((query) =>
    buildQueryConfig(query, 'intitle', 10)
  );
  const authorConfig = buildQueryConfig(authorQuery, 'inauthor', 10);

  const allConfigs = [...titleConfigs, authorConfig];

  const allResults = await Promise.all(
    allConfigs.map((config) => fetch(config))
  );

  const processedResults = allResults.flatMap(processBookResponse);
  return deduplicateAndRankResults(processedResults, searchQuery);
};

const processBookResponse = (response) => {
  if (!response.items || response.totalItems === 0) {
    return [];
  }

  return response.items.filter(isValidBook).map(formatBookData);
};

// Helper functions
const isValidBook = (book) => {
  const { volumeInfo } = book;
  return (
    volumeInfo.title &&
    volumeInfo.authors &&
    volumeInfo.authors.length > 0 &&
    volumeInfo.imageLinks?.thumbnail &&
    volumeInfo.description &&
    volumeInfo.pageCount > 0
  );
};

const formatBookData = (book) => ({
  title: book.volumeInfo.title,
  book_image: book.volumeInfo.imageLinks?.thumbnail,
  authors: book.volumeInfo.authors || [],
  book_id: book.id,
  description: book.volumeInfo.description,
  pageCount: book.volumeInfo.pageCount,
});

const generateTitleQueries = (searchQuery) => {
  const queries = [searchQuery];

  if (!searchQuery.toLowerCase().startsWith('the ')) {
    queries.push(`the ${searchQuery}`);
  }

  return queries;
};

const buildQueryConfig = (query, searchType, maxResults) => ({
  params: new URLSearchParams({
    q: searchType ? `${searchType}:${query}` : query,
    key: BOOKS_API_KEY,
    maxResults,
    langRestrict: 'en',
    country: 'US',
    printType: 'all',
    orderBy: 'relevance',
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  url: BOOKS_BASEURL,
});

const deduplicateAndRankResults = (results, originalQuery) => {
  const seen = new Set();
  return results
    .filter((book) => {
      const duplicate = seen.has(book.book_id);
      seen.add(book.book_id);
      return !duplicate;
    })
    .sort((a, b) => {
      // Prioritize exact title matches, then 'The' prefixed matches, then author matches
      const aLower = a.title.toLowerCase();
      const bLower = b.title.toLowerCase();
      const queryLower = originalQuery.toLowerCase();

      if (aLower === queryLower && bLower !== queryLower) return -1;
      if (bLower === queryLower && aLower !== queryLower) return 1;
      if (aLower === `the ${queryLower}` && bLower !== `the ${queryLower}`)
        return -1;
      if (bLower === `the ${queryLower}` && aLower !== `the ${queryLower}`)
        return 1;
      if (
        a.authors.some((author) => author.toLowerCase().includes(queryLower)) &&
        !b.authors.some((author) => author.toLowerCase().includes(queryLower))
      )
        return -1;
      if (
        b.authors.some((author) => author.toLowerCase().includes(queryLower)) &&
        !a.authors.some((author) => author.toLowerCase().includes(queryLower))
      )
        return 1;

      return 0;
    })
    .slice(0, 8);
};

export default {
  getHotBooks,
  getBooksByAuthor,
  getBookByVolumeId,
  getBooksSuggestions,
  getBookByAuthorAndTitle,
  getSimilarBooks,
  getBestSellers,
};
