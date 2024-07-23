import axios from 'axios';

// Function to fetch data from API and store in localStorage
export async function fetchAndStoreData(options) {
  try {
    const response = await axios.request(options);
    const data = response.data.results.books;
    setWithExpiry('apiData', data, 24 * 60 * 60 * 1000); // Store for 24 hours
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Function to set data in localStorage with expiry
export function setWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Function to get data from localStorage, checking expiry
export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
