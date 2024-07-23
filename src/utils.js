
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

