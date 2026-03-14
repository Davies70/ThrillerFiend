import axios from "axios";
import { getWithExpiry, setWithExpiry } from "./cacheService";
import { buildQueryConfig } from "../utils/bookServiceUtils";

const BOOKS_API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
const BOOKS_BASEURL = `https://www.googleapis.com/books/v1/volumes?`;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Hours

/**
 * THE IRONCLAD SCHEMA
 * This function ensures every book in the app has the exact same keys.
 */
const mapToStandardBook = (item) => {
  if (!item) return null;
  const info = item.volumeInfo || {};
  return {
    book_id: item.id,
    title: info.title || "Unknown Title",
    authors: info.authors || ["Unknown Author"],
    book_image:
      info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || "",
    description: info.description || "",
    categories: info.categories || [],
    publishedDate: info.publishedDate || "",
    pageCount: info.pageCount || 0,
  };
};

async function fetchRequest(config) {
  try {
    const response = await axios.request(config);
    return response.data || null;
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return null;
  }
}

// ==========================================
// BEST SELLERS & HOT BOOKS
// ==========================================

const getBestSellers = async () => {
  const cacheKey = "bestsellers";
  let data = getWithExpiry(cacheKey);
  if (data) console.log("Best Sellers Cache Hit");
  if (data) return data;

  const queryParam = {
    q: "subject:thriller",
    key: BOOKS_API_KEY,
    maxResults: 20,
    orderBy: "relevance",
    printType: "books",
  };

  const params = new URLSearchParams(queryParam).toString();
  const config = { method: "GET", url: `${BOOKS_BASEURL}${params}` };
  const response = await fetchRequest(config);

  if (!response?.items) return [];

  // Map and deduplicate by title to avoid clones
  const rawBooks = response.items
    .filter((b) => b.volumeInfo?.imageLinks?.thumbnail)
    .map(mapToStandardBook);

  const uniqueBooks = Array.from(
    new Map(rawBooks.map((b) => [b.title.toLowerCase(), b])).values(),
  );

  setWithExpiry(cacheKey, uniqueBooks, CACHE_TTL);
  return uniqueBooks;
};

const getHotBooks = async () => {
  let data = getWithExpiry("hotbooks");
  if (data) console.log("Hot Books Cache Hit");
  if (data) return data;

  const config = buildQueryConfig("top mystery thriller 2024", 15, "newest");
  const response = await fetchRequest(config);

  if (!response?.items) return [];

  data = response.items
    .filter((b) => b.volumeInfo?.imageLinks?.thumbnail)
    .map(mapToStandardBook);

  setWithExpiry("hotbooks", data, CACHE_TTL);
  return data;
};

// ==========================================
// SEARCH & SPECIFIC LOOKUPS
// ==========================================

const getBookByVolumeId = async (volumeId) => {
  const cacheKey = `book-${volumeId}`;
  let data = getWithExpiry(cacheKey);
  if (data) return data;

  const config = {
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${BOOKS_API_KEY}`,
  };

  const bookData = await fetchRequest(config);
  if (!bookData) return null;

  data = mapToStandardBook(bookData);
  setWithExpiry(cacheKey, data, CACHE_TTL);
  return data;
};

const getBooksByAuthor = async (author, orderBy = "relevance") => {
  const { authorName } = author;
  const cacheKey = `author-${authorName}-${orderBy}`;
  const cached = getWithExpiry(cacheKey);
  if (cached) return cached;

  const config = buildQueryConfig(`${authorName}`, 40, orderBy);
  const data = await fetchRequest(config);

  if (!data?.items) return [];

  const books = data.items
    .filter((item) => item.volumeInfo?.imageLinks?.thumbnail)
    .map(mapToStandardBook);

  setWithExpiry(cacheKey, books, CACHE_TTL);
  return books;
};

const getBooksSuggestions = async (searchQuery) => {
  if (!searchQuery) return [];
  const config = buildQueryConfig(searchQuery, 10, "relevance");
  const data = await fetchRequest(config);
  return data?.items ? data.items.map(mapToStandardBook) : [];
};

// Add this right above getBooksSuggestions
const getBookByAuthorAndTitle = async (searchQuery) => {
  const cacheKey = `notable-${searchQuery}`;
  const cached = getWithExpiry(cacheKey);
  if (cached) return cached;

  // We only need 1 result since we know the exact title and author
  const config = buildQueryConfig(searchQuery, 1, "relevance");
  const data = await fetchRequest(config);

  if (!data?.items || data.items.length === 0) return null;

  // Grab the first result and map it to our standard Shape
  const book = mapToStandardBook(data.items[0]);

  setWithExpiry(cacheKey, book, CACHE_TTL);
  return book;
};

const getBooksByQuery = async (query, maxResults = 20) => {
  const cacheKey = `query-${query}`;
  let data = getWithExpiry(cacheKey);
  if (data) return data;

  // Build a generic query for the Google Books API
  const config = buildQueryConfig(query, maxResults, "relevance");
  const response = await fetchRequest(config);

  if (!response?.items) return [];

  // Filter out books without images and map to standard Shape object
  data = response.items
    .filter((b) => b.volumeInfo?.imageLinks?.thumbnail)
    .map(mapToStandardBook);

  setWithExpiry(cacheKey, data, CACHE_TTL);
  return data;
};

export default {
  getBestSellers,
  getHotBooks,
  getBooksByAuthor,
  getBookByVolumeId,
  getBooksSuggestions,
  getBookByAuthorAndTitle,
  getBooksByQuery,
};
