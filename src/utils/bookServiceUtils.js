const BOOKS_API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
const BOOKS_BASEURL = `https://www.googleapis.com/books/v1/volumes?`;

export const buildQueryConfig = (query, maxResults, orderBy, option) => ({
  params: new URLSearchParams({
    q: option ? `${option}:${query}` : query,
    key: BOOKS_API_KEY,
    maxResults,
    langRestrict: 'en',
    country: 'US',
    printType: 'books',
    orderBy,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  url: BOOKS_BASEURL,
});
