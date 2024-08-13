// async function makeRequestWithRetry(options, maxRetries = 5) {
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       const response = await axios.request(options);
//       if (response.status === 429) {
//         const waitTime = Math.pow(2, i) * 1000;
//         await new Promise((resolve) => setTimeout(resolve, waitTime));
//       } else {
//         return response;
//       }
//     } catch (error) {
//       if (i === maxRetries - 1) throw error;
//     }
//   }
// }

export const setSome = (set, callback) => {
  for (const value of set) {
    if (callback(value)) {
      return true;
    }
  }
  return false;
};

export function timeAgo(timeStamp) {
  const now = new Date();
  const secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return `just now`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast < 172800) {
    // less than 2 days
    return `yesterday`;
  }
  if (secondsPast < 604800) {
    // less than 7 days
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
  return `${Math.floor(secondsPast / 604800)} weeks ago`;
}
