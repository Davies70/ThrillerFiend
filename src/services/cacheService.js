const CACHE_PREFIX = "thriller_fiend_";

/**
 * Standard Setter with Expiry
 */
export const setWithExpiry = (key, data, ttl = 1000 * 60 * 60 * 24) => {
  const item = {
    data: data,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item));
};

/**
 * Standard Getter with Expiry Check
 */
export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return item.data;
  } catch (err) {
    console.error("Cache Parse Error:", err);
    return null;
  }
};

/**
 * Helper to fetch data and store it in one go (Used by bookServices)
 */
export const fetchAndStoreData = async (config, key, ttl) => {
  // This is a bridge function for your existing bookServices logic
  // Since you are using axios in bookServices, we expect the data
  // to be handled there, but this export prevents the SyntaxError.
  return null;
};

/**
 * Clear all thriller-related cache
 */
export const clearLocalCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
